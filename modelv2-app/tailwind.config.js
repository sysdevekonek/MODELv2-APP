/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
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
			main1: 'hsl(var(--main-1))',
			inputField1: 'hsl(var(--input-field-1))', //Input bg
			inputField2: 'hsl(var(--input-field-2))', //Input field border
			button1: 'hsl(var(--button-1))', //main button
			button2: 'hsl(var(--button-2))', //sub-button
			buttonBorder: 'hsl(var(--button-border))', //border (for dark)
			layouthover: 'hsl(var(--layout-hover))', //sidebar item hover
			layout1: 'hsl(var(--layout-1))', //bg for sidebar and header
			layout2: 'hsl(var(--layout-2))', //sidebar&header element1
			layout3: 'hsl(var(--layout-3))', //sidebar&header element2
			layoutText1: 'hsl(var(--layout-text-1))', //sidebar active tab
			layoutText2: 'hsl(var(--layout-text-2))', //sidebar non active tab
			bg: 'hsl(var(--bg))', //bg of the page
			bgContainer: 'hsl(var(--bg-container))', //bg of the container
			titlebodytext1: 'hsl(var(--title-body-text-1))', //titles & sub titles
			bodytext2: 'hsl(var(--body-text-2))', //body, general
			subtext: 'hsl(var(--subtext))', //placeholders
			themebutton1: 'hsl(var(--theme-button-1))', //themebutton (rarely used)
			themebutton2: 'hsl(var(--theme-button-2))', //themebutton
		
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
    
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			bodyFont: [
  				'Roboto',
  				'sans-serif'
  			],
  			titleFont: [
  				'Montserrat',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}