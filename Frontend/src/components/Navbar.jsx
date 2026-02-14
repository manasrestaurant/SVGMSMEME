import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const closeMenu = () => setIsOpen(false);

  const logout = () => {
    closeMenu();
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="brutal-nav">
      <div className="nav-brand">
        <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="brutal-title" style={{ fontSize: '1.5rem' }}>
            SVGMS MEME VERSE
          </h1>
        </Link>

        {/* BRUTAL TOGGLE */}
        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <div className={`nav-actions-container ${isOpen ? 'open' : ''}`}>
        <div className="nav-actions">
          <button onClick={() => { toggleTheme(); closeMenu(); }} className="brutal-btn bg-white">
            {isDark ? '🌙' : '☀️'}
          </button>

          <Link to="/leaderboard" onClick={closeMenu} className="brutal-btn bg-white">
            🏆
          </Link>

          {user ? (
            <>
              <Link to="/upload" onClick={closeMenu} className="brutal-btn bg-blue">
                UPLOAD 🚀
              </Link>
              <Link to="/profile" onClick={closeMenu} className="brutal-btn bg-green">
                👤
              </Link>
              <button onClick={logout} className="brutal-btn bg-pink">
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu} className="brutal-btn bg-green">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;