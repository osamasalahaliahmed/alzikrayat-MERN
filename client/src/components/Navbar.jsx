import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ user, setUser }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Could not log out. Please try again.");
      }
      setUser(null);
      navigate("/");
    } catch (error) {
      setError("Could not log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      <nav>
        <Link to="/">Alzikrayat</Link>
        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/photos">Gallery</Link>
          {user ? (
            <>
              <Link to="/photos/new">Add Photo</Link>
              <span>Hi {user.firstName}</span>
              <button type="button" onClick={logout} disabled={loading}>
                {loading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <Link to="/login">Please Login</Link>
          )}
        </div>
      </nav>
      {error && <p className="navError" role="alert">{error}</p>}
    </header>
  );
}

export default Navbar;
