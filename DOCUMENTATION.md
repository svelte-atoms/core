# Atomic SV Documentation

A vibrant, interactive documentation site for the Atomic SV component library built with SvelteKit and Svelte 5.

## 🚀 Features

- **Modern Design**: Built with Tailwind CSS v4 and vibrant gradient colors
- **Interactive Components**: Live component previews and interactive playgrounds
- **Responsive Layout**: Mobile-first design that works on all devices
- **Accessibility First**: Built with accessibility in mind throughout
- **Smooth Animations**: Engaging animations that respect reduced motion preferences
- **Code Examples**: Syntax-highlighted code examples with copy functionality
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## 📁 Structure

```
src/routes/
├── +layout.svelte          # Main layout with navigation
├── +page.svelte             # Homepage with hero and features
├── getting-started/         # Installation and setup guide
│   └── +page.svelte
├── components/              # Component documentation
│   ├── +page.svelte        # Component overview page
│   ├── accordion/          # Individual component pages
│   ├── button/
│   └── checkbox/
```

## 🎨 Design System

### Colors

- **Primary**: Purple to Pink gradients (#8b5cf6 → #ec4899)
- **Accent**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Background**: Soft gradients (purple/blue/pink)

### Typography

- **Headings**: Bold, large scale for clear hierarchy
- **Body**: Readable gray text with good contrast
- **Code**: Syntax highlighted with color coding

### Animations

- **Float**: Subtle floating elements in hero section
- **Gradient Shift**: Animated background gradients
- **Hover Effects**: Scale and color transitions
- **Pulse Glow**: Attention-grabbing button animations

## 🧩 Component Documentation Pattern

Each component page follows a consistent structure:

1. **Header**: Component name, status badge, and description
2. **Installation**: Import statements with copy functionality
3. **Examples**: Live previews with code snippets
4. **Interactive Playground**: Customizable component demo
5. **API Reference**: Props table with types and descriptions
6. **Accessibility**: Built-in a11y features documentation
7. **Navigation**: Previous/next component links

## 🎯 Key Features

### Interactive Elements

- Copy-to-clipboard functionality for code examples
- Hover animations on cards and buttons
- Smooth transitions between pages
- Responsive navigation menu

### Accessibility

- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Respects user preferences (reduced motion, high contrast)

### Performance

- Code splitting by route
- Optimized asset loading
- Efficient component imports
- Minimal bundle size

## 🛠 Development

The documentation is built with:

- **SvelteKit**: Full-stack framework
- **Svelte 5**: Latest version with runes
- **Tailwind CSS v4**: Utility-first styling
- **TypeScript**: Type safety
- **Vite**: Fast development server

## 📱 Responsive Design

- **Mobile**: Stacked navigation, single column layouts
- **Tablet**: Adapted spacing and navigation
- **Desktop**: Full multi-column layouts with sidebar navigation

## 🎨 Customization

The design system is easily customizable through:

- Tailwind CSS utility classes
- Custom CSS animations
- Component-level styling
- Global theme variables

## 🚀 Deployment

The documentation can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Built with ❤️ using Svelte 5 and modern web technologies.
