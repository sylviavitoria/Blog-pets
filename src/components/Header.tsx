import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="logo">
        <h1 className="logo-text"><span>Mundo</span>Pet</h1>
      </div>
      <i 
        className="fa fa-bars menu" 
        id="menuToggle"
        data-testid="menuToggle"  
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <ul className="nav" id="menuItems" style={{ display: menuOpen ? 'block' : '' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/criar-post">Criar post</Link></li>
      </ul>
    </header>
  );
};

export default Header;