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
			inputField1: 'hsl(var(--input-field-1))',		//input field bg
			inputField2: 'hsl(var(--input-field-2))',		//input field border
			button1: 'hsl(var(--button-1))', 				//main button (generate, submit, etc)
			button2: 'hsl(var(--button-2))', 				//sub button (next, back, clear, (not active), etc)
			buttonBorder: 'hsl(var(--button-border))', 		//button border (use if necessary)
			buttonHover: 'hsl(var(--button-hover))',		//button hover effect (when use, use hover:text-white)
			deleteButton: 'hsl(var(--delete-button))', 		//delete button (trash icon, etc)
			deleteButtonHover: 'hsl(var(--delete-button-hover))', //delete button hover effect
			layouthover: 'hsl(var(--layout-hover))', 		//layout hover/active color
			layout1: 'hsl(var(--layout-1))', 				//layout (header, sidebar) bg
			layout2: 'hsl(var(--layout-2))', 				//layout elements 1
			layout3: 'hsl(var(--layout-3))', 				//layout elements 2
			layoutText1: 'hsl(var(--layout-text-1))', 		//active tab in layout text
			layoutText2: 'hsl(var(--layout-text-2))', 		//inactive tab in layout text
			bg: 'hsl(var(--bg))', 							//main bg color
			bgContainer: 'hsl(var(--bg-container))', 		//container bg color
			titlebodytext1: 'hsl(var(--title-body-text-1))',//title text color
			bodytext2: 'hsl(var(--body-text-2))', 			//body text color
			subtext: 'hsl(var(--subtext))', 				//subtext/inactive elements color
			themebutton1: 'hsl(var(--theme-button-1))', 	//theme button 1 color (active) [rarely used]
			themebutton2: 'hsl(var(--theme-button-2))', 	//theme button 2 color (inactive) [rarely used]
		
			//Login Colors
			'mainDef1': '#D9DDED', 
			'mainDef2': '#8289A4',
			'mainDef3': '#1E212F',
			'subDef': '#131622',
			'bgDef': '#F5F5F5', 
			'bgDefcont': '#FFFFFF',
			'mainTextDef1': '#000000',
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