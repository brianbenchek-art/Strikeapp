import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">topple</span>
        </Link>
        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
          >
            Search
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            Saved
          </Link>
          <Link to="/create" className="nav-link create-btn">
            + Create
          </Link>
        </nav>
      </div>
    </header>
  );
}
