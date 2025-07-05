import React from 'react'
import { navLinks } from '../constants/Index' 
import '../index.css'
import { useEffect,useState } from 'react'

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  
  return (
    <header className={`navbar ${scrolled ? 'scrolled' : 'not-scrolled md:top-10'}`}>
      <div className="inner">
        <a href="#hero" className=" logo">
          Ayush ! Yadav
        </a>
        <nav className="desktop">
          <ul>
            {navLinks.map(({link,name}) => (
              <li key={name} className="group">
                <a href={link} >
                  <span>{name}</span>
                  <span className="underline group-hover:w-full"/>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="contact-btn group">
          <div className="inner  group-hover:bg-black-50">
            <span className="group-hover:text-white">Contact me</span>
          </div>
        </a>

      </div>
    </header>
  )
}

export default NavBar