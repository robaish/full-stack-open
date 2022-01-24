// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg1: 'hsl(210, 8%, 10%)',
        bg2: 'hsl(210, 5%, 8%)',
        gr1: 'hsla(170, 1%, 94%, 1)',
        gr2: 'hsla(170, 2%, 80%, 1)',
        gr3: 'hsla(170, 3%, 55%, 1)',
        gr4: 'hsla(170, 6%, 16%, 1)',
        bordercolor: 'hsl(200, 0%, 16%)',
        accent1: 'hsl(349, 95%, 62%)',
        accent1b: 'hsl(349, 100%, 66%)',
        tooltip: 'hsl(210, 4%, 16%)',
        error: 'hsl(360, 90%, 60%)',
        success: 'hsl(130, 40%, 48%)'
      },
    },
  },
  plugins: [],
}