// Centralized imports for better organization
// This file exports all components and utilities for easy importing

// Main App Components
export { default as AppContent } from './AppContent';
export { default as App } from './App';

// Page Sections
export { default as Hero } from './components/parts/Hero';
export { default as Features } from './components/parts/Features';
export { default as Experience } from './components/parts/Experience';
export { default as ProjectCompleted } from './components/parts/ProjectCompleted';
export { default as Contact } from './components/parts/contact';

// Layout Components
export { default as NavBar } from './components/NavBar';
export { default as Footer } from './components/Footer';
export { default as MovingTextBanner } from './components/MovingTextBanner';

// Background Components
export { default as SolarSystemBackground } from './components/SolarSystemBackground';
export { default as TransparentOverlay } from './components/TransparentOverlay';

// UI Components
export { default as Button } from './components/Button';
export { default as GlowCard } from './components/GlowCard';
export { default as Title } from './components/Title';
export { default as HireMe } from './components/HireMe';
export { default as MyWork } from './components/MyWork';

// Data and Constants
export * from './constants/Index';

// Utilities and Config
export { auth } from './lib/firebase';
export { default as utils } from './lib/utils';

// Assets
export { default as netflixLogo } from './assets/netflix-logo.png'; 