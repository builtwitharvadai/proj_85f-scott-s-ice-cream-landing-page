# Scott's Ice Cream Landing Page

A premium handcrafted ice cream landing page showcasing Scott's Ice Cream business with modern design, responsive layout, and interactive animations.

## Features

- **Responsive Design**: Mobile-first approach that works seamlessly on all devices (mobile, tablet, desktop)
- **Interactive Animations**: Scroll-triggered reveals with Intersection Observer API
- **Kinetic Typography**: Letter-by-letter hero headline animation
- **Smooth Scrolling**: Anchor link navigation with smooth scroll behavior
- **Gradient Backgrounds**: Vibrant animated gradients matching ice cream theme
- **Button Morphing**: Interactive CTA buttons with hover and click states
- **Accessibility First**: WCAG 2.1 compliant with skip links, ARIA labels, and keyboard navigation
- **Performance Optimized**: Lazy loading images, reduced motion support, and efficient JavaScript
- **SEO Ready**: Comprehensive meta tags, Open Graph, and Twitter Card integration

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 90+)

Modern browsers with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- Intersection Observer API
- ES6+ JavaScript

## Local Development

### Quick Start with Python HTTP Server

1. Clone or download this repository

2. Navigate to the project directory:
```bash
cd proj_85f-scott-s-ice-cream-landing-page
```

3. Start a local web server using Python:

**Python 3.x:**
```bash
python3 -m http.server 8000
```

**Python 2.x:**
```bash
python -m SimpleHTTPServer 8000
```

4. Open your browser and visit:
```
http://localhost:8000
```

### Alternative: Using Node.js

If you have Node.js installed:

```bash
npx http-server -p 8000
```

## Deployment

### GitHub Pages Deployment

1. Push your code to a GitHub repository

2. Go to repository Settings → Pages

3. Under "Source", select the branch (usually `main`) and root folder `/`

4. Click Save

5. Your site will be published at:
```
https://[your-username].github.io/[repository-name]
```

### Other Deployment Options

- **Netlify**: Drag and drop the project folder to Netlify dashboard
- **Vercel**: Import the GitHub repository in Vercel dashboard
- **Surge**: Run `npm install -g surge && surge` in project directory

## Project Structure

```
proj_85f-scott-s-ice-cream-landing-page/
├── index.html           # Main HTML structure
├── styles.css           # CSS with custom properties and responsive design
├── main.js              # Interactive JavaScript features
├── apple-touch-icon.png # iOS home screen icon (180x180)
├── favicon.ico          # Browser favicon
└── README.md            # This file
```

## Accessibility Features

- **Skip Navigation Link**: Keyboard users can skip to main content
- **Semantic HTML5**: Proper use of header, main, footer, nav, article elements
- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support for all interactive features
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Reduced Motion**: Respects prefers-reduced-motion system preference
- **Alt Text**: All images have descriptive alt attributes
- **Screen Reader Support**: Live regions for dynamic content updates

## Performance Optimizations

- **Lazy Loading**: Images load only when visible in viewport
- **Optimized Images**: Unsplash images served via CDN with proper sizing
- **Efficient Animations**: RequestAnimationFrame for smooth 60fps animations
- **CSS Custom Properties**: Centralized design tokens for maintainability
- **Minimal Dependencies**: Zero external libraries, pure vanilla JavaScript
- **Intersection Observer**: Battery-efficient scroll animations
- **Prefers Reduced Motion**: Disables animations for users who prefer reduced motion

## Credits

### Images
All images sourced from [Unsplash](https://unsplash.com):
- Hero image and ice cream photos by various Unsplash contributors
- Images used under Unsplash License (free for commercial and non-commercial use)

### Fonts
- System fonts stack for optimal loading performance
- Georgia serif for elegant headings

### Technologies
- HTML5
- CSS3 (Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (ES6+)
- Intersection Observer API
- Web Accessibility Standards (WCAG 2.1)

## Contact Information

**Scott's Ice Cream**

- **Address**: 123 Main Street, Downtown District, Springfield, ST 12345
- **Phone**: (555) 555-1234
- **Email**: hello@scottsicecream.com
- **Hours**:
  - Monday - Thursday: 11:00 AM - 9:00 PM
  - Friday - Saturday: 11:00 AM - 10:00 PM
  - Sunday: 12:00 PM - 8:00 PM

**Social Media**:
- Facebook: [facebook.com/scottsicecream](https://facebook.com)
- Instagram: [@scottsicecream](https://instagram.com)
- Twitter: [@scottsicecream](https://twitter.com)

## License

© 2024 Scott's Ice Cream. All rights reserved.

---

Built with ❤️ for ice cream lovers everywhere
