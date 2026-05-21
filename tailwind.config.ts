import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT:'#0066FF', bright:'#00D4FF', dark:'#0044CC' },
        accent: { gold:'#FFB800', orange:'#FF6B00', purple:'#6B00FF', green:'#00FF88', red:'#FF3366', cyan:'#00D4FF' },
        surface: { DEFAULT:'#111128', '2':'#1a1a3e', dark:'#0a0a1a' },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: { '4xl':'2rem' },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'gradient': 'gradient-shift 4s ease infinite',
      },
      keyframes: {
        float: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-20px)' } },
        morph: { '0%,100%':{ borderRadius:'60% 40% 30% 70%/60% 30% 70% 40%' }, '50%':{ borderRadius:'30% 60% 70% 40%/50% 60% 30% 60%' } },
        shimmer: { '0%':{ backgroundPosition:'-200% 0' }, '100%':{ backgroundPosition:'200% 0' } },
        'gradient-shift': { '0%':{ backgroundPosition:'0% 50%' }, '50%':{ backgroundPosition:'100% 50%' }, '100%':{ backgroundPosition:'0% 50%' } },
      },
    },
  },
  plugins: [],
};

export default config;
