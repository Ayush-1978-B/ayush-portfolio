import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './lib/firebase';
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
import { IconCloudDemo } from './components/magicui/IconDemo';
import SolarSystemBackground from './components/SolarSystemBackground';
import TransparentOverlay from './components/TransparentOverlay';
import netflixLogo from './assets/netflix-logo.png';

function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [skipLogin, setSkipLogin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('justLoggedIn')) {
      setSkipLogin(true);
      localStorage.removeItem('justLoggedIn');
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 3000);
      } else {
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const showLogin = !loggedIn && location.pathname !== '/hire-me' && !skipLogin;

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowError(false);
    setErrorMsg('');
    try {
      await signInWithEmailAndPassword(auth, username, password);
      localStorage.setItem('justLoggedIn', '1');
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setShowError(false);
    setErrorMsg('');
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      setSignupSuccess(true);
      setTimeout(() => {
        setIsSignUp(false);
        setSignupSuccess(false);
      }, 1000);
      localStorage.setItem('justLoggedIn', '1');
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setShowError(false);
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      localStorage.setItem('justLoggedIn', '1');
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="relative">
      {showLogin && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{background: '#181818', padding: 40, borderRadius: 8, minWidth: 350, boxShadow: '0 4px 32px rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={netflixLogo} alt="Logo" style={{width: 120, marginBottom: 24}} />
            <form onSubmit={isSignUp ? handleSignUp : handleLogin} style={{width: '100%'}}>
              <h2 style={{marginBottom: 24, color: '#fff', fontWeight: 700, fontSize: 28, textAlign: 'center'}}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
              <div style={{marginBottom: 16}}>
                <input type="email" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} style={{width: '100%', padding: 14, borderRadius: 4, border: 'none', background: '#333', color: '#fff', fontSize: 16}} required />
              </div>
              <div style={{marginBottom: 16}}>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%', padding: 14, borderRadius: 4, border: 'none', background: '#333', color: '#fff', fontSize: 16}} required />
              </div>
              {showError && <div style={{color: '#e87c03', marginBottom: 12, fontSize: 15}}>{errorMsg}</div>}
              {signupSuccess && <div style={{color: '#46d369', marginBottom: 12, fontSize: 15}}>Sign up successful! Please sign in.</div>}
              <button type="submit" style={{width: '100%', padding: 14, borderRadius: 4, background: '#e50914', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', marginBottom: 16, cursor: 'pointer', letterSpacing: 1}}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
              <button type="button" onClick={handleGoogleLogin} style={{width: '100%', padding: 14, borderRadius: 4, background: '#4285F4', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', marginBottom: 16, cursor: 'pointer', letterSpacing: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                <svg width="22" height="22" viewBox="0 0 48 48" style={{marginRight: 8}}><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6-6C34.5 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.2-.3-3.5z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.7 0 5.2.9 7.2 2.4l6-6C34.5 5.1 29.5 3 24 3 15.7 3 8.3 8.5 6.3 14.7z"/><path fill="#FBBC05" d="M24 43c5.4 0 10.4-1.8 14.2-4.9l-6.6-5.4c-2 1.4-4.5 2.3-7.6 2.3-5.6 0-10.3-3.7-12-8.7l-6.5 5c3.2 6.3 9.9 10.7 17.5 10.7z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-4.1 4.9l6.6 5.4c1.9-1.8 3.3-4.1 4.1-6.7.6-1.7.9-3.5.9-5.6 0-1.3-.1-2.2-.3-3.5z"/></g></svg>
                Sign in with Google
              </button>
              <div style={{textAlign: 'center', color: '#b3b3b3', fontSize: 15}}>
                <span style={{cursor: 'pointer', color: '#fff', textDecoration: 'underline'}} onClick={() => { setIsSignUp(!isSignUp); setShowError(false); setErrorMsg(''); }}>{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</span>
              </div>
            </form>
          </div>
        </div>
      )}
      {showWelcome && (
        <div style={{position: 'fixed', top: 30, left: '50%', transform: 'translateX(-50%)', background: '#222', color: '#fff', padding: '16px 32px', borderRadius: 8, fontSize: 18, fontWeight: 600, zIndex: 2000, boxShadow: '0 2px 12px rgba(0,0,0,0.3)'}}>
          Welcome to Ayush's Portfolio
        </div>
      )}
      <div style={showLogin ? {filter: 'blur(8px)', pointerEvents: 'auto', userSelect: 'none', overflow: 'auto'} : {}}>
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
                <IconCloudDemo/>
                <MyWork/>
                <ProjectCompleted/>
                <Features/>
                <Experience/>
                <MovingTextBanner text="Backend Journey Begins Soon" />
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
    </div>
  );
}

export default AppContent; 