import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [requestsResponse, reportsResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:5000/api/requests/my",
            { headers }
          ),
          axios.get(
            "http://localhost:5000/api/waste-reports/my",
            { headers }
          ),
        ]);

      setRequests(
        requestsResponse.data.requests || []
      );

      setReports(
        reportsResponse.data.reports || []
      );
    } catch (error) {
      console.error(
        "Dashboard data error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const completedCount = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  const ecoPoints = completedCount * 50;

  const progress = Math.min(
    (ecoPoints / 500) * 100,
    100
  );

  const getActivityIcon = (status) => {
    if (status === "Completed") return "✓";
    if (status === "Pending") return "⌛";
    if (status === "Cancelled") return "×";
    return "🚚";
  };

  const getActivityClass = (status) => {
    if (status === "Completed") {
      return "completed";
    }

    if (status === "Pending") {
      return "pending";
    }

    return "reported";
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        {/* HEADER */}
        <div className="dashboard-header">

          <div>
            <p className="dashboard-tagline">
              ♻ ECOTRACK DASHBOARD
            </p>

            <h1>
              Welcome back,{" "}
              <span>
                {user.fullName || "Eco Hero"}!
              </span>
            </h1>

            <p>
              Here's an overview of your waste
              management activity.
            </p>
          </div>

          <div className="dashboard-eco">
            🌱
          </div>

        </div>

        {/* STATISTICS */}
        <div className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon">
              📋
            </div>

            <div>
              <p>Waste Reports</p>
              <h2>
                {loading ? "..." : reports.length}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              🗓️
            </div>

            <div>
              <p>Pickup Requests</p>
              <h2>
                {loading ? "..." : requests.length}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              ♻️
            </div>

            <div>
              <p>Waste Recycled</p>
              <h2>0 kg</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              🏆
            </div>

            <div>
              <p>Eco Points</p>
              <h2>{ecoPoints}</h2>
            </div>
          </div>

        </div>

        {/* MAIN GRID */}
        <div className="dashboard-grid">

          {/* QUICK ACTIONS */}
          <div className="dashboard-card">

            <div className="dashboard-card-header">
              <div>
                <p>QUICK ACTIONS</p>
                <h2>
                  What would you like to do?
                </h2>
              </div>
            </div>

            <div className="action-grid">

              <Link
                to="/report-waste"
                className="action-card"
              >
                <div className="action-icon">
                  📍
                </div>

                <h3>Report Waste</h3>

                <p>
                  Report a waste problem
                </p>
              </Link>

              <Link
                to="/schedule-pickup"
                className="action-card"
              >
                <div className="action-icon">
                  🗓️
                </div>

                <h3>Schedule Pickup</h3>

                <p>
                  Request waste collection
                </p>
              </Link>

              <Link
                to="/my-requests"
                className="action-card"
              >
                <div className="action-icon">
                  📊
                </div>

                <h3>Track Requests</h3>

                <p>
                  View your requests
                </p>
              </Link>

              <Link
                to="/profile"
                className="action-card"
              >
                <div className="action-icon">
                  👤
                </div>

                <h3>My Profile</h3>

                <p>
                  Manage your account
                </p>
              </Link>

            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>
                <p>RECENT ACTIVITY</p>

                <h2>
                  Your latest updates
                </h2>
              </div>

              <Link to="/my-requests">
                View All
              </Link>

            </div>

            <div className="activity-list">

              {loading && (
                <p>
                  Loading activity...
                </p>
              )}

              {!loading &&
                requests.length === 0 &&
                reports.length === 0 && (
                  <p
                    style={{
                      padding: "20px 0",
                      color: "#718076",
                    }}
                  >
                    No activity yet.
                  </p>
                )}

              {!loading &&
                requests
                  .slice(0, 4)
                  .map((request) => (
                    <div
                      className="activity-item"
                      key={request._id}
                    >
                      <div
                        className={`activity-icon ${getActivityClass(
                          request.status
                        )}`}
                      >
                        {getActivityIcon(
                          request.status
                        )}
                      </div>

                      <div>
                        <h3>
                          {request.wasteType} pickup
                          request
                        </h3>

                        <p>
                          {request.pickupDate} •{" "}
                          {request.preferredTime}
                        </p>
                      </div>

                      <span
                        className={`activity-status ${
                          request.status ===
                          "Completed"
                            ? "completed-text"
                            : request.status ===
                              "Pending"
                            ? "pending-text"
                            : "reported-text"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  ))}

            </div>

          </div>

        </div>

        {/* ECO PROGRESS */}
        <div className="eco-progress-card">

          <div className="progress-content">

            <p>
              YOUR ECO JOURNEY
            </p>

            <h2>
              You're making a difference!
            </h2>

            <p>
              Every responsible waste action helps
              create a cleaner and greener community.
            </p>

          </div>

          <div>

            <div className="progress-info">
              <span>
                Eco Level
              </span>

              <strong>
                {ecoPoints} XP
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <p className="progress-note">
              {ecoPoints} / 500 XP
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;