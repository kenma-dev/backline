import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102532',
        cream: '#f7f2e8',
        ember: '#ff7a45',
        tide: '#5bc0be',
        pine: '#1f5c4a',
        sun: '#ffd166',
      },
      boxShadow: {
        soft: '0 16px 50px rgba(16, 37, 50, 0.12)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(255, 122, 69, 0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(91, 192, 190, 0.22), transparent 30%), linear-gradient(135deg, #fff8ef, #edf8f7)'
      },
    },
  },
  plugins: [],
} satisfies Config;
