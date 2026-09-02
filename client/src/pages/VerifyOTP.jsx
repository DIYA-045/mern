import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const email =
    localStorage.getItem("verificationEmail") || "";

  const handleVerify = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!email) {
      setMessage(
        "Verification email not found. Please register again."
      );
      return;
    }

    if (!otp || otp.length !== 6) {
      setMessage("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      setMessage(
        response.data.message ||
          "Email verified successfully 🌱"
      );

      localStorage.removeItem("verificationEmail");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Invalid OTP."
        );
      } else {
        setMessage(
          "Unable to connect to EcoTrack server."
        );
      }
    } finally {
      setLoading(false);
    }
  };


  const handleResend = async () => {
    setMessage("");

    if (!email) {
      setMessage(
        "Verification email not found. Please register again."
      );
      return;
    }

    setResending(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/resend-otp",
        {
          email,
        }
      );

      setMessage(
        response.data.message ||
          "A new OTP has been sent."
      );

    } catch (error) {
      console.error(
        "Resend OTP error:",
        error
      );

      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Unable to resend OTP."
        );
      } else {
        setMessage(
          "Unable to connect to EcoTrack server."
        );
      }
    } finally {
      setResending(false);
    }
  };


  return (
    <>
      <Navbar />

      <main className="auth-page">

        <section className="auth-container">

          {/* Left Side */}

          <div className="auth-info">

            <p className="auth-tagline">
              ✉️ VERIFY YOUR EMAIL
            </p>

            <h1>
              One step
              <br />
              <span>away.</span>
            </h1>

            <p>
              We've sent a 6-digit verification code
              to your email address.
            </p>

            <div className="auth-visual">

              <div className="auth-circle">
                ✉️
              </div>

            </div>

          </div>


          {/* OTP Card */}

          <div className="auth-card">

            <div className="auth-card-header">

              <h2>
                Verify Email
              </h2>

              <p>
                Enter the OTP sent to
              </p>

              <strong>
                {email || "your email address"}
              </strong>

            </div>


            <form onSubmit={handleVerify}>

              {/* OTP */}

              <div className="form-group">

                <label>
                  Verification Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const value =
                      e.target.value
                        .replace(/\D/g, "");

                    setOtp(value);
                  }}
                  required
                />

              </div>


              {/* Message */}

              {message && (
                <p className="auth-message">
                  {message}
                </p>
              )}


              {/* Verify */}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >

                {loading
                  ? "Verifying..."
                  : "Verify Email"}

              </button>

            </form>


            {/* Resend */}

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >

              <p>
                Didn't receive the OTP?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >

                {resending
                  ? "Sending..."
                  : "Resend OTP"}

              </button>

            </div>


            {/* Login */}

            <p
              className="auth-register"
              style={{
                marginTop: "20px",
              }}
            >

              Already verified?

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

export default VerifyOTP;