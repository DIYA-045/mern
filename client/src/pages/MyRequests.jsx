import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/requests/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data.requests || []);
    } catch (err) {
      console.error("Fetch requests error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this pickup?"
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/requests/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to cancel request."
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed-text";

      case "Cancelled":
        return "cancelled-text";

      case "Accepted":
      case "Picked Up":
        return "progress-text";

      default:
        return "pending-text";
    }
  };

  const getIcon = (wasteType) => {
    switch (wasteType) {
      case "Plastic":
        return "🥤";
      case "Paper":
        return "📄";
      case "Glass":
        return "🍾";
      case "E-Waste":
        return "💻";
      case "Metal":
        return "🔩";
      case "Organic":
        return "🌱";
      default:
        return "♻️";
    }
  };

  const pendingCount = requests.filter(
    (r) => r.status === "Pending"
  ).length;

  const progressCount = requests.filter(
    (r) =>
      r.status === "Accepted" ||
      r.status === "Picked Up"
  ).length;

  const completedCount = requests.filter(
    (r) => r.status === "Completed"
  ).length;

  return (
    <>
      <Navbar />

      <div className="requests-page">

        {/* HEADER */}
        <div className="requests-header">
          <div>
            <p className="requests-tagline">
              TRACK YOUR ACTIVITY
            </p>

            <h1>
              MY <span>REQUESTS</span>
            </h1>

            <p>
              View and manage all your waste pickup
              requests in one place.
            </p>
          </div>

          <div className="requests-visual">
            📋
          </div>
        </div>

        {/* SUMMARY */}
        <div className="request-summary">

          <div className="request-summary-card">
            <div className="summary-icon">
              📋
            </div>

            <div>
              <p>Total Requests</p>
              <h2>{requests.length}</h2>
            </div>
          </div>

          <div className="request-summary-card">
            <div className="summary-icon pending-bg">
              ⏳
            </div>

            <div>
              <p>Pending</p>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="request-summary-card">
            <div className="summary-icon progress-bg">
              🚚
            </div>

            <div>
              <p>In Progress</p>
              <h2>{progressCount}</h2>
            </div>
          </div>

          <div className="request-summary-card">
            <div className="summary-icon completed-bg">
              ✅
            </div>

            <div>
              <p>Completed</p>
              <h2>{completedCount}</h2>
            </div>
          </div>

        </div>

        {/* REQUESTS */}
        <div className="requests-section">

          <div className="requests-section-header">
            <div>
              <p>YOUR PICKUPS</p>
              <h2>Pickup Requests</h2>
            </div>
          </div>

          {loading && (
            <p style={{ padding: "25px 0" }}>
              Loading your requests...
            </p>
          )}

          {error && (
            <div
              style={{
                background: "#ffebee",
                color: "#c62828",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            requests.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 20px",
                }}
              >
                <div style={{ fontSize: "50px" }}>
                  ♻️
                </div>

                <h3
                  style={{
                    marginTop: "15px",
                    color: "#304637",
                  }}
                >
                  No pickup requests yet
                </h3>

                <p
                  style={{
                    marginTop: "8px",
                    color: "#718076",
                  }}
                >
                  Schedule your first waste pickup to
                  see it here.
                </p>
              </div>
            )}

          {!loading &&
            requests.map((request) => (
              <div
                className="request-card"
                key={request._id}
              >

                <div className="request-main">

                  <div className="request-icon">
                    {getIcon(request.wasteType)}
                  </div>

                  <div>
                    <p className="request-type">
                      WASTE PICKUP
                    </p>

                    <h3>
                      {request.wasteType} Waste
                    </h3>

                    <p>
                      {request.quantity} •{" "}
                      {request.pickupDate}
                    </p>

                    <p>
                      {request.preferredTime}
                    </p>

                    <p>
                      📍 {request.pickupAddress}
                    </p>

                    {request.landmark && (
                      <p>
                        Landmark: {request.landmark}
                      </p>
                    )}
                  </div>

                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <p
                    className={`activity-status ${getStatusClass(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </p>

                  {request.collector && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#718076",
                        marginTop: "8px",
                      }}
                    >
                      Collector:{" "}
                      {request.collector.fullName}
                    </p>
                  )}

                  {(request.status === "Pending" ||
                    request.status === "Accepted") && (
                    <button
                      onClick={() =>
                        handleCancel(request._id)
                      }
                      style={{
                        marginTop: "12px",
                        padding: "8px 14px",
                        border: "1px solid #d9534f",
                        borderRadius: "7px",
                        background: "white",
                        color: "#d9534f",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Cancel Request
                    </button>
                  )}
                </div>

              </div>
            ))}

        </div>
      </div>
    </>
  );
}

export default MyRequests;