import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        ♻️ EcoTrack
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/services">Services</Link>

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/login">Login</Link>

        <Link to="/register" className="nav-button">
          Get Started
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;