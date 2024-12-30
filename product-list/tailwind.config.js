/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: 'var(--primary-main)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          main: 'var(--secondary-main)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
        },
        success: {
          main: 'var(--success-main)',
          light: 'var(--success-light)',
          dark: 'var(--success-dark)',
        },
        warning: {
          main: 'var(--warning-main)',
          light: 'var(--warning-light)',
          dark: 'var(--warning-dark)',
        },
        error: {
          main: 'var(--error-main)',
          light: 'var(--error-light)',
          dark: 'var(--error-dark)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          disabled: 'var(--text-disabled)',
        },
        background: {
          default: 'var(--background-default)',
          paper: 'var(--background-paper)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}; 