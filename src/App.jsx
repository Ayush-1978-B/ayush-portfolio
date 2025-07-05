import React from 'react';
import Hero from './components/parts/Hero';
import ProjectCompleted from './components/parts/ProjectCompleted';
import NavBar from './components/NavBar';
import './App.css';
import LgoSection from './components/LgoSection';
import Features from './components/parts/Features';
import Experience from './components/parts/Experience';
import TechStack from './components/parts/TechStack';
import Contact from './components/parts/contact';

function App() {
  return (
  <>
  <NavBar/>
  <Hero/>
  <ProjectCompleted/>
  <LgoSection/>
  <Features/>
  <Experience/>
  <TechStack/>
  <Contact/>
  </>
  )
}

export default App