import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import SignInButton from '../Authentication/SignInButton';
import SignUpButton from '../Authentication/SignUpButton';
import SignOutButton from '../Authentication/SignOutButton';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const auth = UserAuth()!;
  const { session } = auth;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.1;
      setIsScrolled(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled && !isMenuOpen ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Gaussian Explorer
        </Link>

        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <button
            className="close-button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="navbar-links">
            {session && (
              <>
                <Link to="/posts" className="navbar-link">Posts</Link>
                <Link to="/splats" className="navbar-link">Splats</Link>
              </>
            )}
          </div>
          <div className={`navbar-auth ${session ? 'session' : ''}`}>
            {session ? (
              <div className="navbar-user">
                <span className="navbar-email">{session.user.email}</span>
                <SignOutButton />
              </div>
            ) : (
              <div className="navbar-user">
                <SignInButton />
                <SignUpButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 