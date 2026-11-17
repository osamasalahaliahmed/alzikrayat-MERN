import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/">Alzikrayat</Link>
        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/photos">Gallery</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
