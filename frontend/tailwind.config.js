/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '52': '52deg',
        '-52': '-52deg'
      },
      width: {
        '72': '72%',
        '16/2': '80%',
        '26/3':'79%',
      },
      screens: {
        'cp':'150px',
        'cpm':'300px',
        'esm':'400px',
        'vsm': '480px',
        'sm': '640px',
        'ms': '740px',
        'md': '768px',
        'emd':'855px',
        'mmd':'950px',
        'lg': '1024px', // Define 'lg' breakpoint
        'xl': '1280px',
        '2xl': '1536px',
        
      },
      
      theme: {
        colors: {
          film: '#150435ed',
        }
    },
    animation: {
      pop: 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    keyframes: {
      pop: {
        '0%': { opacity: '0', transform: 'scale(0)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
}

}