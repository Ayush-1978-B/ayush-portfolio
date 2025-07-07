import React from 'react'
import { navLinks } from '../constants/Index'
import HireMeButton from './HireMeButton'
import '../index.css'
import { useEffect,useState } from 'react'

function NavBar() {
  // Helper to set document title
  const handleNavClick = (name) => {
    document.title = `${name} | Ayush Yadav`;
  };
  return (
    <header className="navbar bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="inner">
        <a href="#hero" className=" logo" onClick={() => handleNavClick('Home')}>
          Ayush ! Yadav
        </a>
        <nav className="desktop">
          <ul>
            {navLinks.map(({link,name}) => (
              <li key={name} className="group">
                <a href={link} onClick={() => handleNavClick(name)}>
                  <span>{name}</span>
                  <span className="underline group-hover:w-full"/>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <HireMeButton />
      </div>
    </header>
  )
}

export default NavBar