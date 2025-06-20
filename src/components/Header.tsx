import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <header>
      <div className="logo">
        <h1 className="logo-text"><span>Mundo</span>Pet</h1>
      </div>
      <i
        className={`fa fa-bars menu ${menuOpen ? 'active' : ''}`}
        id="menuToggle"
        data-testid="menuToggle"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <ul className={`nav ${menuOpen ? 'menu-open' : ''}`} id="menuItems">
        <li><Link to="/" onClick={() => isMobile && setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/sobre" onClick={() => isMobile && setMenuOpen(false)}>Sobre</Link></li>
        <li><Link to="/criar-post" onClick={() => isMobile && setMenuOpen(false)}>Criar post</Link></li>
      </ul>
    </header>
  );
};

export default Header;