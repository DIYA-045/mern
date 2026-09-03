import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ReportWaste() {
  const [formData, setFormData] = useState({
    wasteType: "",
    location: "",
    description: "",
    urgency: "Medium",
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
        "http://localhost:5000/api/waste-reports",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Waste report submitted successfully 🌱"
      );

      setFormData({
        wasteType: "",
        location: "",
        description: "",
        urgency: "Medium",
      });
    } catch (err) {
      console.error("Report waste error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to submit waste report."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "#f4faf5",
          padding: "60px 8%",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div style={{ marginBottom: "35px" }}>
            <p
              style={{
                color: "#1f9d55",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "3px",
                marginBottom: "10px",
              }}
            >
              KEEP YOUR COMMUNITY CLEAN
            </p>

            <h1
              style={{
                fontSize: "42px",
                margin: 0,
                color: "#17351f",
              }}
            >
              REPORT <span style={{ color: "#1f9d55" }}>WASTE</span>
            </h1>

            <p
              style={{
                color: "#68766c",
                marginTop: "12px",
                fontSize: "16px",
              }}
            >
              Report improperly dumped or unmanaged waste in
              your area.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "30px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                border: "1px solid #dfe9e1",
                boxShadow: "0 8px 25px rgba(30,70,40,0.06)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  color: "#17351f",
                }}
              >
                Waste Report Details
              </h2>

              {message && (
                <div
                  style={{
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    padding: "13px",
                    borderRadius: "8px",
                    marginBottom: "20px",
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
                    padding: "13px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Waste Type
                  </label>

                  <select
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "13px",
                      border: "1px solid #d5dfd7",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
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

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Where is the waste located?"
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "13px",
                      border: "1px solid #d5dfd7",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the waste problem..."
                    rows="5"
                    required
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "13px",
                      border: "1px solid #d5dfd7",
                      borderRadius: "8px",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "25px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Urgency
                  </label>

                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "13px",
                      border: "1px solid #d5dfd7",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#1f9d55",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {loading
                    ? "Submitting..."
                    : "Submit Waste Report"}
                </button>
              </form>
            </div>

            <div>
              <div
                style={{
                  background: "#e5f5e8",
                  borderRadius: "16px",
                  padding: "30px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontSize: "45px" }}>📍</div>

                <h3 style={{ color: "#17351f" }}>
                  Help Keep Your Area Clean
                </h3>

                <p
                  style={{
                    color: "#5f7064",
                    lineHeight: "1.7",
                  }}
                >
                  Report waste dumping, overflowing garbage,
                  or unmanaged waste so it can be reviewed and
                  resolved.
                </p>
              </div>

              <div
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "30px",
                  border: "1px solid #dfe9e1",
                }}
              >
                <h3 style={{ color: "#17351f" }}>
                  Report Process
                </h3>

                <p>📝 Submit your report</p>
                <p>🔎 Report is reviewed</p>
                <p>♻️ Waste issue is handled</p>
                <p>✅ Report is resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportWaste;