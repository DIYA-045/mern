import Navbar from "../components/Navbar.jsx";

function Profile() {
  return (
    <>
      <Navbar />

      <main className="profile-page">

        {/* Header */}
        <section className="profile-header">
          <div>
            <p className="profile-tagline">♻️ MY PROFILE</p>

            <h1>
              Your EcoTrack
              <br />
              <span>profile.</span>
            </h1>

            <p>
              Manage your account information and keep your
              EcoTrack details up to date.
            </p>
          </div>

          <div className="profile-avatar">
            👤
          </div>
        </section>


        {/* Profile Layout */}
        <section className="profile-layout">

          {/* Personal Information */}
          <div className="profile-card">

            <div className="profile-card-header">
              <div>
                <p>PERSONAL INFORMATION</p>
                <h2>Account Details</h2>
              </div>

              <span className="profile-badge">
                Citizen
              </span>
            </div>


            <form>

              <div className="profile-form-row">

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    value="Eco User"
                    readOnly
                  />
                </div>


                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    value="ecouser@example.com"
                    readOnly
                  />
                </div>

              </div>


              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                />
              </div>


              <div className="form-group">
                <label>Address</label>

                <textarea
                  rows="3"
                  placeholder="Enter your address"
                ></textarea>
              </div>


              <button
                type="button"
                className="profile-button"
              >
                Save Changes
              </button>

            </form>

          </div>


          {/* Eco Stats */}
          <div className="profile-side">

            <div className="eco-profile-card">

              <div className="eco-profile-icon">
                🌱
              </div>

              <p>YOUR ECO SCORE</p>

              <h2>480</h2>

              <span>
                Eco Points
              </span>

              <div className="profile-progress">
                <div></div>
              </div>

              <small>
                20 points to next level
              </small>

            </div>


            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                ♻️
              </div>

              <div>
                <p>Waste Recycled</p>
                <h3>24 kg</h3>
              </div>

            </div>


            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                📅
              </div>

              <div>
                <p>Pickups Completed</p>
                <h3>5</h3>
              </div>

            </div>


            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                📍
              </div>

              <div>
                <p>Reports Submitted</p>
                <h3>12</h3>
              </div>

            </div>

          </div>

        </section>


        {/* Account Section */}
        <section className="account-settings">

          <div>
            <p>ACCOUNT</p>
            <h2>Account Settings</h2>
          </div>

          <div className="settings-actions">

            <button>
              Change Password
            </button>

            <button className="logout-button">
              Logout
            </button>

          </div>

        </section>

      </main>
    </>
  );
}

export default Profile;