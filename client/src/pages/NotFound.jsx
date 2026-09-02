import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function NotFound() {
  return (
    <>
      <Navbar />

      <main className="not-found-page">

        <div className="not-found-icon">
          🌱
        </div>

        <p className="not-found-tagline">
          ECOTRACK
        </p>

        <h1>
          404
        </h1>

        <h2>
          This page wandered off.
        </h2>

        <p>
          The page you're looking for doesn't exist or may
          have been moved somewhere greener.
        </p>

        <Link to="/" className="not-found-button">
          Back to Home
        </Link>

      </main>
    </>
  );
}

export default NotFound;