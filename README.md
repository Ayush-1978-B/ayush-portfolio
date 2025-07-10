# Ayush Yadav - Portfolio

A modern, responsive portfolio website built with React, Three.js, and Framer Motion. Features a stunning 3D solar system background, smooth animations, and a professional design.

## 🚀 Features

- **3D Solar System Background** - Interactive Three.js background with animated planets and effects
- **Modern UI/UX** - Glassmorphic design with smooth animations
- **Responsive Design** - Optimized for all devices and screen sizes
- **Performance Optimized** - Fast loading with optimized assets and code splitting
- **Accessibility** - WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized** - Meta tags, structured data, and performance metrics

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, CSS3
- **3D Graphics**: Three.js
- **Animations**: Framer Motion
- **Icons**: React Icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayush-1978-B/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── parts/           # Main page sections
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Experience.jsx
│   │   ├── ProjectCompleted.jsx
│   │   └── contact.jsx
│   ├── NavBar.jsx       # Navigation component
│   ├── Footer.jsx       # Footer component
│   ├── SolarSystemBackground.jsx  # 3D background
│   └── MovingTextBanner.jsx       # Animated banner
├── constants/
│   └── Index.js         # Data and configuration
├── lib/
│   └── firebase.js      # Firebase configuration (for Firestore/DB only)
└── assets/              # Static assets
```

## 🎨 Customization

### Colors and Themes
The project uses a consistent color scheme defined in `tailwind.config.js`:
- Primary: Pink (#ec4899)
- Secondary: Purple (#a855f7)
- Background: Dark theme with glassmorphic effects

### Content Updates
- **Personal Info**: Update `src/constants/Index.js`
- **Projects**: Modify the projects array in `ProjectCompleted.jsx`
- **Skills**: Edit the skills data in `Experience.jsx`

### 3D Background
The solar system background can be customized in `SolarSystemBackground.jsx`:
- Planet positions and sizes
- Animation speeds
- Color schemes
- Particle effects

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- **Lazy Loading**: Components load on demand
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Route-based code splitting
- **Bundle Optimization**: Tree shaking and minification

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type checking (optional)

## 🚀 Deployment

You can deploy the project to any static hosting platform:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder

## 📊 Analytics

The portfolio includes analytics tracking:
- Page views and user interactions
- Performance metrics
- User engagement data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: ayush.yadav@example.com
- **LinkedIn**: [Ayush Yadav](https://linkedin.com/in/ayush-yadav-dev)
- **GitHub**: [@Ayush-1978-B](https://github.com/Ayush-1978-B)

## 🙏 Acknowledgments

- Three.js community for 3D graphics inspiration
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- React community for excellent documentation

---

Made with ❤️ by Ayush Yadav