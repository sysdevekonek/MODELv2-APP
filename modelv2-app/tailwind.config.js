/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainDef1': '#D9DDED', //Default Main Colors
        'mainDef2': '#8289A4',
        'mainDef3': '#1E212F',
        'subDef': '#131622',
        'bgDef': '#F5F5F5', //Default Background Colors
        'bgDefcont': '#FFFFFF',
        'mainTextDef1': '#000000', //Default Text Color
        'mainTextDef2': '#1E212F',
        'mainTextDef3': '#FFFFFF',
        'mainSubtextDef': '#C2C2C2',

        
      },
    },
  },
  plugins: [],
}