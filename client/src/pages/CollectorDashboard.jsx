import Navbar from "../components/Navbar.jsx";

function CollectorDashboard() {
  return (
    <>
      <Navbar />

      <main className="collector-page">

        {/* Header */}
        <section className="collector-header">

          <div>
            <p className="collector-tagline">
              ♻️ COLLECTOR DASHBOARD
            </p>

            <h1>
              Ready to make a
              <br />
              <span>cleaner city?</span>
            </h1>

            <p>
              Manage your assigned waste collections and
              keep track of today's pickup activities.
            </p>
          </div>

          <div className="collector-visual">
            🚛
          </div>

        </section>


        {/* Statistics */}
        <section className="collector-stats">

          <div className="collector-stat-card">
            <div className="collector-stat-icon">
              📋
            </div>

            <div>
              <p>Assigned Pickups</p>
              <h2>12</h2>
            </div>
          </div>


          <div className="collector-stat-card">
            <div className="collector-stat-icon pending">
              ⏳
            </div>

            <div>
              <p>Pending</p>
              <h2>05</h2>
            </div>
          </div>


          <div className="collector-stat-card">
            <div className="collector-stat-icon progress">
              🚛
            </div>

            <div>
              <p>In Progress</p>
              <h2>02</h2>
            </div>
          </div>


          <div className="collector-stat-card">
            <div className="collector-stat-icon completed">
              ✓
            </div>

            <div>
              <p>Completed</p>
              <h2>25</h2>
            </div>
          </div>

        </section>


        {/* Today's Pickups */}
        <section className="collector-content">

          <div className="collector-jobs">

            <div className="collector-section-header">

              <div>
                <p>TODAY'S COLLECTIONS</p>
                <h2>Assigned pickups</h2>
              </div>

              <select>
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

            </div>


            {/* Job 1 */}
            <div className="collector-job">

              <div className="job-icon">
                🚛
              </div>

              <div className="job-details">

                <span className="job-type">
                  HOUSEHOLD WASTE
                </span>

                <h3>
                  Waste Collection #EC1024
                </h3>

                <p>
                  📍 MVP Colony, Visakhapatnam
                </p>

                <p>
                  🕐 10:00 AM - 12:00 PM
                </p>

              </div>

              <div className="job-actions">

                <span className="job-status pending-status">
                  Pending
                </span>

                <button className="job-button">
                  Start Pickup
                </button>

              </div>

            </div>


            {/* Job 2 */}
            <div className="collector-job">

              <div className="job-icon">
                ♻️
              </div>

              <div className="job-details">

                <span className="job-type">
                  PLASTIC WASTE
                </span>

                <h3>
                  Waste Collection #EC1025
                </h3>

                <p>
                  📍 Beach Road, Visakhapatnam
                </p>

                <p>
                  🕐 12:00 PM - 02:00 PM
                </p>

              </div>

              <div className="job-actions">

                <span className="job-status progress-status">
                  In Progress
                </span>

                <button className="job-button">
                  Complete
                </button>

              </div>

            </div>


            {/* Job 3 */}
            <div className="collector-job">

              <div className="job-icon">
                📍
              </div>

              <div className="job-details">

                <span className="job-type">
                  ELECTRONIC WASTE
                </span>

                <h3>
                  Waste Collection #EC1026
                </h3>

                <p>
                  📍 NAD Junction, Visakhapatnam
                </p>

                <p>
                  🕐 02:00 PM - 04:00 PM
                </p>

              </div>

              <div className="job-actions">

                <span className="job-status completed-status">
                  Completed
                </span>

                <button className="job-button disabled">
                  Completed
                </button>

              </div>

            </div>


          </div>


          {/* Side Panel */}
          <aside className="collector-side">

            <div className="collector-info-card">

              <div className="collector-info-icon">
                📊
              </div>

              <p>COLLECTION PERFORMANCE</p>

              <h2>89%</h2>

              <span>
                Completion rate
              </span>

              <div className="collector-progress">
                <div></div>
              </div>

            </div>


            <div className="collector-info-card">

              <div className="collector-info-icon">
                🌱
              </div>

              <h3>
                Eco Impact
              </h3>

              <p>
                Your collections helped divert
                <strong> 128 kg</strong> of waste
                from improper disposal this month.
              </p>

            </div>


            <div className="collector-info-card">

              <div className="collector-info-icon">
                📍
              </div>

              <h3>
                Today's Route
              </h3>

              <p>
                3 collection points assigned
                across the city.
              </p>

              <button className="route-button">
                View Route
              </button>

            </div>

          </aside>

        </section>

      </main>
    </>
  );
}

export default CollectorDashboard;