import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SchedulePickup() {
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    pickupDate: "",
    preferredTime: "",
    pickupAddress: "",
    landmark: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/pickups",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Pickup scheduled successfully 🌱"
      );

      setFormData({
        wasteType: "",
        quantity: "",
        pickupDate: "",
        preferredTime: "",
        pickupAddress: "",
        landmark: "",
        notes: "",
      });
    } catch (err) {
      console.error("Schedule pickup error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to schedule pickup."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="pickup-page">

        {/* HEADER */}
        <div className="pickup-header">
          <div>
            <p className="pickup-tagline">
              ECO-FRIENDLY COLLECTION
            </p>

            <h1>
              SCHEDULE <span>PICKUP</span>
            </h1>

            <p>
              Schedule a convenient time for EcoTrack to
              collect your waste.
            </p>
          </div>

          <div className="pickup-visual">
            🚚
          </div>
        </div>

        {/* CONTENT */}
        <div className="pickup-content">

          {/* FORM CARD */}
          <div className="pickup-form-card">

            <h2>Pickup Details</h2>

            {message && (
              <div
                style={{
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {message}
              </div>
            )}

            {error && (
              <div
                style={{
                  background: "#ffebee",
                  color: "#c62828",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* WASTE TYPE */}
              <div className="form-group">
                <label>Waste Type</label>

                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select waste type
                  </option>

                  <option value="Organic">
                    Organic Waste
                  </option>

                  <option value="Plastic">
                    Plastic Waste
                  </option>

                  <option value="Paper">
                    Paper Waste
                  </option>

                  <option value="Glass">
                    Glass Waste
                  </option>

                  <option value="E-Waste">
                    E-Waste
                  </option>

                  <option value="Metal">
                    Metal Waste
                  </option>

                  <option value="Mixed">
                    Mixed Waste
                  </option>
                </select>
              </div>

              {/* QUANTITY */}
              <div className="form-group">
                <label>Estimated Quantity</label>

                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select quantity
                  </option>

                  <option value="Less than 5 kg">
                    Less than 5 kg
                  </option>

                  <option value="5 - 10 kg">
                    5 - 10 kg
                  </option>

                  <option value="10 - 20 kg">
                    10 - 20 kg
                  </option>

                  <option value="20 - 50 kg">
                    20 - 50 kg
                  </option>

                  <option value="More than 50 kg">
                    More than 50 kg
                  </option>
                </select>
              </div>

              {/* DATE */}
              <div className="form-group">
                <label>Pickup Date</label>

                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  required
                />
              </div>

              {/* TIME */}
              <div className="form-group">
                <label>Preferred Time</label>

                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select preferred time
                  </option>

                  <option value="8:00 AM - 10:00 AM">
                    8:00 AM - 10:00 AM
                  </option>

                  <option value="10:00 AM - 12:00 PM">
                    10:00 AM - 12:00 PM
                  </option>

                  <option value="12:00 PM - 2:00 PM">
                    12:00 PM - 2:00 PM
                  </option>

                  <option value="2:00 PM - 4:00 PM">
                    2:00 PM - 4:00 PM
                  </option>

                  <option value="4:00 PM - 6:00 PM">
                    4:00 PM - 6:00 PM
                  </option>
                </select>
              </div>

              {/* ADDRESS */}
              <div className="form-group">
                <label>Pickup Address</label>

                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Enter your complete pickup address"
                  rows="4"
                  required
                />
              </div>

              {/* LANDMARK */}
              <div className="form-group">
                <label>Nearby Landmark</label>

                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Example: Near City Mall"
                />
              </div>

              {/* NOTES */}
              <div className="form-group">
                <label>Additional Notes</label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional instructions..."
                  rows="4"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="pickup-submit"
                disabled={loading}
              >
                {loading
                  ? "Scheduling..."
                  : "Schedule Pickup"}
              </button>

            </form>
          </div>

          {/* SIDE INFORMATION */}
          <div className="pickup-side">

            <div className="pickup-info-card">

              <div className="pickup-info-icon">
                🚚
              </div>

              <h3>Convenient Collection</h3>

              <p>
                Our waste collectors will collect your
                recyclable waste from your selected location.
              </p>

            </div>

            <div className="pickup-info-card">

              <div className="pickup-info-icon">
                📍
              </div>

              <h3>Accurate Location</h3>

              <p>
                Provide a complete address and nearby
                landmark so our collector can easily find you.
              </p>

            </div>

            <div className="pickup-info-card">

              <div className="pickup-info-icon">
                ♻️
              </div>

              <h3>Eco-Friendly</h3>

              <p>
                Your waste will be properly sorted,
                processed and recycled whenever possible.
              </p>

            </div>

            <div className="pickup-info-card">

              <div className="pickup-status-icon">
                📋
              </div>

              <h3>Pickup Status</h3>

              <div className="pickup-timeline">

                <div>
                  <strong>Request Submitted</strong>
                  <span>
                    Your pickup request is received.
                  </span>
                </div>

                <div>
                  <strong>Collector Assigned</strong>
                  <span>
                    A waste collector will be assigned.
                  </span>
                </div>

                <div>
                  <strong>Waste Collected</strong>
                  <span>
                    Your waste will be collected.
                  </span>
                </div>

                <div>
                  <strong>Request Completed</strong>
                  <span>
                    Pickup will be marked completed.
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulePickup;