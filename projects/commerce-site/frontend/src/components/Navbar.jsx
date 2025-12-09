import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav>
      <div className="nav-content"> 
        <div className="logo">My Shop</div>
        <div className="links">
          <Link to="/">Catalog</Link>
          <Link to="/admin">Administration</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;