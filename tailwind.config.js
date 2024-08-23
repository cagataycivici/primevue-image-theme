/** @type {import('tailwindcss').Config} */
import primeui from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="app-dark"]'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [primeui]
};
