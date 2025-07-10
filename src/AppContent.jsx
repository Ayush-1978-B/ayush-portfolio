import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hero from './components/parts/Hero';
import MyWork from './components/MyWork';
import ProjectCompleted from './components/parts/ProjectCompleted';
import NavBar from './components/NavBar';
import Features from './components/parts/Features';
import Experience from './components/parts/Experience';
import Contact from './components/parts/contact';
import HireMe from './components/HireMe';
import MovingTextBanner from './components/MovingTextBanner';
import Footer from './components/Footer';
import SolarSystemBackground from './components/SolarSystemBackground';
import TransparentOverlay from './components/TransparentOverlay';
import netflixLogo from './assets/netflix-logo.png';

function AppContent() {
  return (
    <div className="relative">
      <SolarSystemBackground />
      <TransparentOverlay />
      <div className="lightning-effects">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`lightning-bolt lightning-${i + 1}`}></div>
        ))}
      </div>
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="floating-particle"></div>
        ))}
      </div>
      <div className="light-rays">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="light-ray"></div>
        ))}
      </div>
      <div className="energy-orbs">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`energy-orb orb-${i + 1}`}></div>
        ))}
      </div>
      <div className="relative z-20">
        <Routes>
          <Route path="/" element={
            <>
              <NavBar/>
              <Hero/>
              <MyWork/>
              <ProjectCompleted/>
              <Features/>
              <Experience/>
              <MovingTextBanner />
              <Contact/>
              <Footer />
            </>
          } />
          <Route path="/hire-me" element={
            <>
              <HireMe />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default AppContent; 