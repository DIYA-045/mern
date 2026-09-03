import Navbar from "../components/Navbar.jsx";

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <p className="about-tagline">♻️ ABOUT ECOTRACK</p>

            <h1>
              Making Waste
              <br />
              <span>Management Smarter.</span>
            </h1>

            <p>
              EcoTrack is a smart waste management platform designed
              to make waste reporting, collection, and responsible
              disposal easier for everyone.
            </p>
          </div>

          <div className="about-hero-visual">
            <div className="about-circle">
              🌱
            </div>
          </div>
        </section>


        {/* Mission Section */}
        <section className="mission-section">
          <div className="section-heading">
            <p>OUR MISSION</p>

            <h2>
              A cleaner environment
              <br />
              starts with better habits.
            </h2>
          </div>

          <div className="mission-content">
            <p>
              Our mission is to connect citizens, waste collectors,
              and administrators through one simple digital platform.
              EcoTrack helps communities report waste problems,
              request pickups, and keep track of waste collection.
            </p>

            <p>
              By encouraging responsible waste disposal and
              recycling, we aim to create cleaner neighborhoods
              and a more sustainable future.
            </p>
          </div>
        </section>


        {/* How It Works */}
        <section className="how-section">
          <div className="section-heading center">
            <p>HOW ECOTRACK HELPS</p>

            <h2>
              From waste to responsible disposal.
            </h2>
          </div>

          <div className="process-container">

            <div className="process-card">
              <div className="process-icon">📍</div>

              <h3>Report</h3>

              <p>
                Report waste or overflowing garbage in your area.
              </p>
            </div>

            <div className="process-arrow">→</div>

            <div className="process-card">
              <div className="process-icon">📅</div>

              <h3>Schedule</h3>

              <p>
                Schedule a convenient time for waste collection.
              </p>
            </div>

            <div className="process-arrow">→</div>

            <div className="process-card">
              <div className="process-icon">🚛</div>

              <h3>Collect</h3>

              <p>
                Waste collectors receive and manage pickup requests.
              </p>
            </div>

            <div className="process-arrow">→</div>

            <div className="process-card">
              <div className="process-icon">♻️</div>

              <h3>Recycle</h3>

              <p>
                Encourage proper disposal and recycling practices.
              </p>
            </div>

          </div>
        </section>


        {/* Values Section */}
        <section className="values-section">
          <div className="section-heading center">
            <p>OUR VALUES</p>

            <h2>
              What EcoTrack stands for.
            </h2>
          </div>

          <div className="values-grid">

            <div className="value-card">
              <div className="value-icon">🌱</div>

              <h3>Sustainability</h3>

              <p>
                Promoting practices that protect our environment
                for future generations.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">🤝</div>

              <h3>Community</h3>

              <p>
                Bringing citizens and waste management teams
                together to solve local waste problems.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">💡</div>

              <h3>Innovation</h3>

              <p>
                Using technology to make waste management
                simpler, faster, and more transparent.
              </p>
            </div>

          </div>
        </section>


        {/* Bottom CTA */}
        <section className="about-cta">
          <div>
            <p>READY TO MAKE A DIFFERENCE?</p>

            <h2>
              Start managing waste smarter.
            </h2>
          </div>

          <a href="/register" className="cta-button">
            Get Started
          </a>
        </section>

      </main>
    </>
  );
}

export default About;