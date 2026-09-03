import Navbar from "../components/Navbar.jsx";
function Home() {
  return (
    <>
      <Navbar />

      <main className="hero">
        <div className="hero-content">
          <p className="tagline">♻️ SMART WASTE MANAGEMENT</p>

          <h1>
            A Cleaner City
            <br />
            Starts With <span>Us.</span>
          </h1>

          <p className="hero-text">
            Report waste, schedule pickups, track collections,
            and help build a cleaner and greener community.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Report Waste
            </button>

            <button className="secondary-btn">
              Schedule Pickup
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="eco-circle">
            ♻️
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;