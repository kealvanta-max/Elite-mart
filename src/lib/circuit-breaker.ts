// ============================================
// ELITE MART — Circuit Breaker
// Prevents cascading failures for external services
// ============================================

type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitBreakerConfig {
  failureThreshold: number;    // Failures before opening circuit
  resetTimeout: number;        // Time before trying half-open (ms)
  monitoringPeriod: number;    // Time window for counting failures (ms)
}

interface CircuitBreakerState {
  state: CircuitState;
  failureCount: number;
  lastFailureTime: number;
  lastSuccessTime: number;
  lastStateChange: number;
}

const circuits = new Map<string, CircuitBreakerState>();

const defaultConfig: CircuitBreakerConfig = {
  failureThreshold: 5,
  resetTimeout: 30_000,    // 30 seconds
  monitoringPeriod: 60_000, // 1 minute
};

function getCircuit(name: string): CircuitBreakerState {
  if (!circuits.has(name)) {
    circuits.set(name, {
      state: 'CLOSED',
      failureCount: 0,
      lastFailureTime: 0,
      lastSuccessTime: Date.now(),
      lastStateChange: Date.now(),
    });
  }
  return circuits.get(name)!;
}

export function isCircuitOpen(name: string): boolean {
  const circuit = getCircuit(name);
  const config = defaultConfig;

  if (circuit.state === 'CLOSED') return false;

  if (circuit.state === 'OPEN') {
    const timeSinceFailure = Date.now() - circuit.lastFailureTime;
    if (timeSinceFailure >= config.resetTimeout) {
      circuit.state = 'HALF_OPEN';
      circuit.lastStateChange = Date.now();
      console.log(`[CircuitBreaker] ${name}: OPEN → HALF_OPEN`);
      return false;
    }
    return true;
  }

  // HALF_OPEN - allow one attempt
  return false;
}

export function recordSuccess(name: string): void {
  const circuit = getCircuit(name);
  circuit.lastSuccessTime = Date.now();
  if (circuit.state === 'HALF_OPEN') {
    circuit.state = 'CLOSED';
    circuit.failureCount = 0;
    circuit.lastStateChange = Date.now();
    console.log(`[CircuitBreaker] ${name}: HALF_OPEN → CLOSED`);
  }
}

export function recordFailure(name: string): void {
  const circuit = getCircuit(name);
  const config = defaultConfig;

  circuit.failureCount++;
  circuit.lastFailureTime = Date.now();

  if (circuit.state === 'HALF_OPEN') {
    circuit.state = 'OPEN';
    circuit.lastStateChange = Date.now();
    console.warn(`[CircuitBreaker] ${name}: HALF_OPEN → OPEN (failure during test)`);
    return;
  }

  if (circuit.failureCount >= config.failureThreshold) {
    const timeWindow = Date.now() - circuit.lastStateChange;
    if (timeWindow <= config.monitoringPeriod) {
      circuit.state = 'OPEN';
      circuit.lastStateChange = Date.now();
      console.warn(`[CircuitBreaker] ${name}: CLOSED → OPEN (${circuit.failureCount} failures)`);
    } else {
      // Reset the window
      circuit.failureCount = 1;
    }
  }
}

export async function withCircuitBreaker<T>(
  name: string,
  fn: () => Promise<T>,
  fallback?: () => T
): Promise<T> {
  if (isCircuitOpen(name)) {
    console.warn(`[CircuitBreaker] ${name}: Circuit is OPEN, using fallback`);
    if (fallback) return fallback();
    throw new Error(`Service "${name}" is temporarily unavailable. Please try again later.`);
  }

  try {
    const result = await fn();
    recordSuccess(name);
    return result;
  } catch (error) {
    recordFailure(name);
    if (fallback) return fallback();
    throw error;
  }
}

export function getCircuitStatus(name: string): CircuitBreakerState & { config: CircuitBreakerConfig } {
  return { ...getCircuit(name), config: defaultConfig };
}

// Pre-configured circuits for external services
export const Circuits = {
  PAYSTACK: 'paystack',
  FLUTTERWAVE: 'flutterwave',
  RESEND: 'resend',
  CLOUDINARY: 'cloudinary',
  FIREBASE: 'firebase',
} as const;
