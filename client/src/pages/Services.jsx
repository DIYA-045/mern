import Navbar from "../components/Navbar.jsx";

function Services() {
  return (
    <>
      <Navbar />

      <main className="services-page">

        {/* Hero */}
        <section className="services-hero">
          <div className="services-hero-content">
            <p className="services-tagline">♻️ OUR SERVICES</p>

            <h1>
              Everything You Need
              <br />
              for <span>Smarter Waste.</span>
            </h1>

            <p>
              EcoTrack brings waste reporting, collection scheduling,
              tracking, and responsible disposal together in one
              simple platform.
            </p>
          </div>

          <div className="services-hero-visual">
            <div className="services-circle">
              ♻️
            </div>
          </div>
        </section>


        {/* Services */}
        <section className="services-list">

          <div className="services-heading">
            <p>WHAT WE OFFER</p>

            <h2>
              Simple tools for a cleaner community.
            </h2>
          </div>

          <div className="services-grid">

            <div className="service-card">
              <div className="service-icon">📍</div>

              <h3>Report Waste</h3>

              <p>
                Report garbage, illegal dumping, overflowing bins,
                and other waste-related problems in your area.
              </p>

              <span>01</span>
            </div>


            <div className="service-card">
              <div className="service-icon">📅</div>

              <h3>Schedule Pickup</h3>

              <p>
                Request a waste pickup and choose a convenient
                date and time for collection.
              </p>

              <span>02</span>
            </div>


            <div className="service-card">
              <div className="service-icon">🚛</div>

              <h3>Waste Collection</h3>

              <p>
                Connect pickup requests with waste collectors
                and manage collection efficiently.
              </p>

              <span>03</span>
            </div>


            <div className="service-card">
              <div className="service-icon">📊</div>

              <h3>Track Requests</h3>

              <p>
                Track your waste reports and pickup requests
                from submission to completion.
              </p>

              <span>04</span>
            </div>


            <div className="service-card">
              <div className="service-icon">♻️</div>

              <h3>Recycling Support</h3>

              <p>
                Learn how to separate recyclable materials and
                follow responsible waste disposal practices.
              </p>

              <span>05</span>
            </div>


            <div className="service-card">
              <div className="service-icon">🏆</div>

              <h3>Eco Rewards</h3>

              <p>
                Earn points for responsible waste management
                activities and contribute to a greener community.
              </p>

              <span>06</span>
            </div>

          </div>
        </section>


        {/* Process */}
        <section className="service-process">

          <div className="services-heading center">
            <p>HOW IT WORKS</p>

            <h2>
              Manage your waste in four simple steps.
            </h2>
          </div>

          <div className="service-steps">

            <div className="service-step">
              <div className="step-number">1</div>
              <h3>Report</h3>
              <p>
                Tell us about the waste problem.
              </p>
            </div>

            <div className="step-line"></div>

            <div className="service-step">
              <div className="step-number">2</div>
              <h3>Schedule</h3>
              <p>
                Choose a suitable pickup time.
              </p>
            </div>

            <div className="step-line"></div>

            <div className="service-step">
              <div className="step-number">3</div>
              <h3>Collect</h3>
              <p>
                A collector handles the request.
              </p>
            </div>

            <div className="step-line"></div>

            <div className="service-step">
              <div className="step-number">4</div>
              <h3>Recycle</h3>
              <p>
                Waste is directed toward responsible disposal.
              </p>
            </div>

          </div>
        </section>


        {/* CTA */}
        <section className="services-cta">

          <div>
            <p>MAKE A DIFFERENCE</p>

            <h2>
              Start managing waste smarter today.
            </h2>
          </div>

          <a href="/register" className="services-cta-button">
            Get Started
          </a>

        </section>

      </main>
    </>
  );
}

export default Services;