import Navbar from "../components/Navbar.jsx";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <main className="admin-page">

        {/* Header */}
        <section className="admin-header">

          <div>
            <p className="admin-tagline">
              ♻️ ADMIN CONTROL CENTER
            </p>

            <h1>
              Manage EcoTrack
              <br />
              <span>from one place.</span>
            </h1>

            <p>
              Monitor waste reports, pickups, users, and
              collection activity across the platform.
            </p>
          </div>

          <div className="admin-visual">
            🛡️
          </div>

        </section>


        {/* Statistics */}
        <section className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">👥</div>

            <div>
              <p>Total Users</p>
              <h2>1,248</h2>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">📍</div>

            <div>
              <p>Waste Reports</p>
              <h2>342</h2>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">🚛</div>

            <div>
              <p>Pickup Requests</p>
              <h2>186</h2>
            </div>
          </div>


          <div className="admin-stat-card">
            <div className="admin-stat-icon">♻️</div>

            <div>
              <p>Waste Collected</p>
              <h2>2.8T</h2>
            </div>
          </div>

        </section>


        {/* Main Grid */}
        <section className="admin-grid">

          {/* Recent Reports */}
          <div className="admin-card">

            <div className="admin-card-header">

              <div>
                <p>RECENT REPORTS</p>
                <h2>Latest waste reports</h2>
              </div>

              <button>
                View All
              </button>

            </div>


            <div className="admin-report">

              <div className="admin-report-icon">
                📍
              </div>

              <div>
                <h3>Overflowing Garbage Bin</h3>

                <p>
                  Beach Road, Visakhapatnam
                </p>

                <span>
                  10 minutes ago
                </span>
              </div>

              <label className="admin-status urgent">
                Urgent
              </label>

            </div>


            <div className="admin-report">

              <div className="admin-report-icon">
                ♻️
              </div>

              <div>
                <h3>Plastic Waste Dumping</h3>

                <p>
                  MVP Colony, Visakhapatnam
                </p>

                <span>
                  35 minutes ago
                </span>
              </div>

              <label className="admin-status pending">
                Pending
              </label>

            </div>


            <div className="admin-report">

              <div className="admin-report-icon">
                📍
              </div>

              <div>
                <h3>Illegal Waste Dumping</h3>

                <p>
                  NAD Junction, Visakhapatnam
                </p>

                <span>
                  1 hour ago
                </span>
              </div>

              <label className="admin-status progress">
                In Progress
              </label>

            </div>

          </div>


          {/* Quick Actions */}
          <div className="admin-card">

            <div className="admin-card-header">

              <div>
                <p>ADMIN TOOLS</p>
                <h2>Quick actions</h2>
              </div>

            </div>


            <div className="admin-actions">

              <button>
                <span>👥</span>
                Manage Users
              </button>

              <button>
                <span>🚛</span>
                Manage Collectors
              </button>

              <button>
                <span>📍</span>
                Review Reports
              </button>

              <button>
                <span>📅</span>
                Manage Pickups
              </button>

            </div>

          </div>

        </section>


        {/* System Overview */}
        <section className="admin-overview">

          <div className="admin-overview-heading">

            <p>SYSTEM OVERVIEW</p>

            <h2>
              EcoTrack activity
            </h2>

          </div>


          <div className="admin-overview-grid">

            <div>
              <span>Active Collectors</span>
              <strong>42</strong>
            </div>

            <div>
              <span>Pending Reports</span>
              <strong>27</strong>
            </div>

            <div>
              <span>Today's Pickups</span>
              <strong>64</strong>
            </div>

            <div>
              <span>Completed Today</span>
              <strong>51</strong>
            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default AdminDashboard;