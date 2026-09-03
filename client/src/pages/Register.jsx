import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!agreed) {
      setMessage("Please agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (!formData.role) {
      setMessage("Please select a role.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
        }
      );

      setMessage(response.data.message);
      if (response.data.requiresVerification) {
  localStorage.setItem(
    "verificationEmail",
    response.data.email
  );

  setTimeout(() => {
    window.location.href = "/verify-otp";
  }, 1500);

  return;
}

      /*
        If registration succeeds, go to OTP verification page.
      */
      if (response.data.requiresVerification) {
        localStorage.setItem(
          "verificationEmail",
          response.data.email
        );

        setTimeout(() => {
          window.location.href = "/verify-otp";
        }, 1000);

        return;
      }

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        password: "",
        confirmPassword: "",
      });

      setAgreed(false);

    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Registration failed."
        );

        /*
          If an existing unverified account gets a new OTP,
          send the user to OTP verification.
        */
        if (error.response.data.requiresVerification) {
          localStorage.setItem(
            "verificationEmail",
            error.response.data.email
          );

          setTimeout(() => {
            window.location.href = "/verify-otp";
          }, 1000);
        }
      } else {
        setMessage(
          "Unable to connect to EcoTrack server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">

        <section className="auth-container register-container">

          {/* =========================
              LEFT SIDE
          ========================== */}

          <div className="auth-info">

            <p className="auth-tagline">
              ♻️ JOIN ECOTRACK
            </p>

            <h1>
              Be part of a
              <br />
              <span>cleaner future.</span>
            </h1>

            <p>
              Create your EcoTrack account and help make
              waste management smarter, cleaner, and more
              responsible.
            </p>

            <div className="auth-visual">

              <div className="auth-circle">
                🌍
              </div>

            </div>

          </div>


          {/* =========================
              REGISTER CARD
          ========================== */}

          <div className="auth-card">

            <div className="auth-card-header">

              <h2>
                Create Account
              </h2>

              <p>
                Join EcoTrack and start making a difference
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* =========================
                  FULL NAME
              ========================== */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =========================
                  EMAIL
              ========================== */}

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =========================
                  PHONE
              ========================== */}

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =========================
                  ADDRESS
              ========================== */}

              <div className="form-group">

                <label>
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* =========================
                  ROLE
              ========================== */}

              <div className="form-group">

                <label>
                  Select Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Choose your role
                  </option>

                  <option value="user">
                    Citizen
                  </option>

                  <option value="collector">
                    Waste Collector
                  </option>

                </select>

              </div>


              {/* =========================
                  PASSWORD
              ========================== */}

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

              </div>


              {/* =========================
                  CONFIRM PASSWORD
              ========================== */}

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

              </div>


              {/* =========================
                  TERMS
              ========================== */}

              <div className="terms-row">

                <label>

                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) =>
                      setAgreed(e.target.checked)
                    }
                  />

                  <span>
                    I agree to the EcoTrack terms and
                    conditions
                  </span>

                </label>

              </div>


              {/* =========================
                  MESSAGE
              ========================== */}

              {message && (
                <p className="auth-message">
                  {message}
                </p>
              )}


              {/* =========================
                  SUBMIT
              ========================== */}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </button>

            </form>


            {/* =========================
                DIVIDER
            ========================== */}

            <div className="auth-divider">

              <span>
                OR
              </span>

            </div>


            {/* =========================
                LOGIN LINK
            ========================== */}

            <p className="auth-register">

              Already have an account?

              <a href="/login">
                {" "}Sign In
              </a>

            </p>

          </div>

        </section>

      </main>
    </>
  );
}

export default Register;