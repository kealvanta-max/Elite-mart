'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1500;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.015) * 0.1;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#0066FF"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.3 + i * 2) * 0.6;
      child.position.x = Math.cos(t * 0.2 + i * 1.5) * 0.4;
    });
  });

  return (
    <group ref={group}>
      {[
        { pos: [-3, 0, -2] as [number, number, number], color: '#0066FF', size: 0.18 },
        { pos: [2, 0, -3] as [number, number, number], color: '#6B00FF', size: 0.14 },
        { pos: [0, 0, -4] as [number, number, number], color: '#00D4FF', size: 0.1 },
        { pos: [-1.5, 0, -1] as [number, number, number], color: '#FFB800', size: 0.12 },
        { pos: [3, 0, -2] as [number, number, number], color: '#FF3366', size: 0.08 },
      ].map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 24, 24]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#0066FF" />
        <pointLight position={[-5, -3, -5]} intensity={0.2} color="#6B00FF" />
        <ParticleField />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
