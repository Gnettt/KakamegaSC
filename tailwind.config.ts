import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ksc': {
          primary: '#865807',
          light: '#a67c52',
          dark: '#6b4605',
        }
      }
    },
  },
  plugins: [],
}
export default config
