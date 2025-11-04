# LeetCode Animation Website

A modern, responsive web application built with Next.js and shadcn/ui that showcases LeetCode problems with animated visualizations and detailed explanations.

## Features

- 🎬 **107 LeetCode Problems** with 48 animations
- 🔍 **Smart Search** - Search by problem number or title
- 🏷️ **Category Filtering** - Filter problems by topic (Arrays & Strings, Linked Lists & Trees, Dynamic Programming, etc.)
- 🎨 **Dark Mode Support** - Beautiful light and dark themes
- ⚡ **Optimized Performance** - Static site generation with lazy-loaded animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🚀 **Fast Navigation** - Instant page transitions with Next.js

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the website directory:
```bash
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

The build process will:
1. Copy all problem animations and articles to the public directory
2. Generate static pages for all 107 problems
3. Optimize assets for production

## Project Structure

```
website/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── problem/[slug]/    # Dynamic problem pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── problems-list.tsx # Main problems grid with search
│   ├── optimized-gif.tsx # Lazy-loaded animation component
│   └── theme-toggle.tsx  # Dark mode toggle
├── lib/                  # Utilities
│   ├── problems.ts       # Problem data extraction
│   └── utils.ts          # Helper functions
├── public/               # Static assets
│   └── problems/         # Copied animations and articles (gitignored)
└── copy-assets.js        # Script to copy problem files
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icons
- **next-themes** - Dark mode support

## Performance Optimizations

- **Static Site Generation (SSG)** - All pages pre-rendered at build time
- **Lazy Loading** - Animations load on-demand with loading states
- **Optimized Images** - Next.js Image component for automatic optimization
- **No Runtime Overhead** - Pure static HTML/CSS/JS output

## Features Showcase

### Homepage
- Displays all problems in a responsive grid
- Real-time search filtering
- Category-based filtering
- Shows problem metadata (number, title, category)
- Indicates which problems have animations and articles

### Problem Detail Pages
- Clean, focused layout
- Animated GIF visualization
- Full article content in markdown
- Easy navigation back to homepage
- Optimized loading with skeleton states

## License

This project is part of the LeetCodeAnimation repository.
