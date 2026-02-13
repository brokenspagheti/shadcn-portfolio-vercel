# Modern Portfolio with Next.js & shadcn/ui

A stunning portfolio website built with Next.js 14, shadcn/ui components, and interactive Three.js animations.

## Features

- 🎨 **shadcn/ui Components** - Beautiful, accessible UI components
- 🌊 **Interactive Whirlpool Effect** - Drag your mouse to create water whirlpools
- 👨‍🚀 **Draggable Astronaut** - Interactive space character with easter egg (triple-click for Rickroll!)
- 🎭 **Smooth Animations** - Framer Motion powered transitions
- 📱 **Fully Responsive** - Works on all devices
- 🌙 **Dark Mode** - Beautiful dark theme by default
- ⚡ **Fast Performance** - Built with Next.js 14

## Tech Stack

- **Framework:** Next.js 14
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **3D Graphics:** Three.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brokenspagheti/shadcn-portfolio-vercel.git
cd shadcn-portfolio-vercel
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brokenspagheti/shadcn-portfolio-vercel)

### Manual Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and deploy

## Interactive Features

### Whirlpool Effect
- Click and drag anywhere on the page to create beautiful spiral whirlpools
- Multiple whirlpools can exist simultaneously
- They fade out gracefully after appearing

### Astronaut Easter Egg
- The astronaut floats in the center of the screen
- Drag it anywhere you want
- **Triple-click** the astronaut to trigger a Rickroll surprise! 🎵

## Customization

### Update Personal Information

Edit `app/page.tsx` to update:
- Your name and title
- About section content
- Skills and technologies
- Project information
- Contact links

### Modify Theme Colors

Edit `app/globals.css` to change the color scheme:
```css
:root {
  --primary: 263 70% 50%; /* Purple theme */
  --background: 222.2 84% 4.9%; /* Dark background */
  /* ... other colors */
}
```

## License

MIT License - feel free to use this for your own portfolio!

## Author

**nikhil XD**
- Email: nkndmob@gmail.com
- GitHub: [@brokenspagheti](https://github.com/brokenspagheti)

---

Built with ❤️ using Next.js and shadcn/ui