/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                custom: ['Wendy One', 'sans-serif'],
            },
        },
    },
    plugins: [
        function ({addUtilities}) {
            const newUtilities = {
                '.placeholder-custom': {
                    '&::placeholder': {
                        fontFamily: 'Wendy One',
                        textTransform: 'uppercase',
                    }
                }
            }
            addUtilities(newUtilities, ['responsive', 'hover'])
        }
    ],
}
