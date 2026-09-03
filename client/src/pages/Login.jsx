import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const [showOTP, setShowOTP] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [verifying, setVerifying] = useState(false);

  const [resending, setResending] = useState(false);


  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================
  // LOGIN
  // ==========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage(
        "Please enter email and password."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );


      // ==========================
      // LOGIN SUCCESS
      // ==========================

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      setMessage(
        "Login successful 🌱"
      );


      // ==========================
      // ROLE REDIRECT
      // ==========================

      setTimeout(() => {

        if (
          response.data.user.role ===
          "collector"
        ) {
          window.location.href =
            "/collector-dashboard";

        } else if (
          response.data.user.role ===
          "admin"
        ) {
          window.location.href =
            "/admin-dashboard";

        } else {
          window.location.href =
            "/dashboard";
        }

      }, 700);


    } catch (error) {

      console.error(
        "Login error:",
        error
      );


      // ==========================
      // EMAIL NOT VERIFIED
      // ==========================

      if (
        error.response?.status === 403 &&
        error.response?.data
          ?.requiresVerification
      ) {

        setShowOTP(true);

        localStorage.setItem(
          "verificationEmail",
          error.response.data.email
        );

        setMessage(
          "Please verify your email. Enter the OTP sent to your email."
        );

        return;
      }


      // ==========================
      // OTHER ERRORS
      // ==========================

      if (error.response) {

        setMessage(
          error.response.data.message ||
            "Login failed."
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


  // ==========================
  // VERIFY OTP
  // ==========================

  const handleVerifyOTP = async () => {

    setMessage("");

    const email =
      formData.email ||
      localStorage.getItem(
        "verificationEmail"
      );


    if (!email) {

      setMessage(
        "Please enter your email address."
      );

      return;
    }


    if (!otp || otp.length !== 6) {

      setMessage(
        "Please enter the 6-digit OTP."
      );

      return;
    }


    setVerifying(true);


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


      setShowOTP(false);

      setOtp("");

      localStorage.removeItem(
        "verificationEmail"
      );


    } catch (error) {

      console.error(
        "OTP verification error:",
        error
      );


      setMessage(
        error.response?.data?.message ||
          "Invalid OTP."
      );

    } finally {

      setVerifying(false);

    }
  };


  // ==========================
  // RESEND OTP
  // ==========================

  const handleResendOTP = async () => {

    setMessage("");

    const email =
      formData.email ||
      localStorage.getItem(
        "verificationEmail"
      );


    if (!email) {

      setMessage(
        "Please enter your email address."
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


      setMessage(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );

    } finally {

      setResending(false);

    }
  };


  return (
    <>
      <Navbar />

      <main className="auth-page">

        <section className="auth-container">

          {/* ==========================
              LEFT SIDE
          ========================== */}

          <div className="auth-info">

            <p className="auth-tagline">
              ♻️ WELCOME BACK
            </p>

            <h1>
              Keep making
              <br />
              <span>
                a difference.
              </span>
            </h1>

            <p>
              Sign in to your EcoTrack
              account and continue making
              waste management smarter and
              cleaner.
            </p>

            <div className="auth-visual">

              <div className="auth-circle">
                🌱
              </div>

            </div>

          </div>


          {/* ==========================
              LOGIN CARD
          ========================== */}

          <div className="auth-card">

            <div className="auth-card-header">

              <h2>
                Welcome Back
              </h2>

              <p>
                Sign in to continue to EcoTrack
              </p>

            </div>


            <form onSubmit={handleLogin}>

              {/* EMAIL */}

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


              {/* PASSWORD */}

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* ==========================
                  VERIFY EMAIL + OTP
              ========================== */}

              {showOTP && (

                <div className="otp-section">

                  <div
                    style={{
                      marginBottom: "15px",
                    }}
                  >

                    <strong>
                      📧 Verify Email
                    </strong>

                    <p
                      style={{
                        marginTop: "6px",
                        fontSize: "14px",
                      }}
                    >
                      Enter the 6-digit OTP sent
                      to your email.
                    </p>

                  </div>


                  {/* OTP */}

                  <div className="form-group">

                    <label>
                      Verification OTP
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="6"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => {

                        const value =
                          e.target.value.replace(
                            /\D/g,
                            ""
                          );

                        setOtp(value);

                      }}
                    />

                  </div>


                  {/* VERIFY BUTTON */}

                  <button
                    type="button"
                    className="auth-button"
                    onClick={handleVerifyOTP}
                    disabled={verifying}
                  >

                    {verifying
                      ? "Verifying..."
                      : "Verify Email & OTP"}

                  </button>


                  {/* RESEND */}

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "15px",
                    }}
                  >

                    <button
                      type="button"
                      onClick={handleResendOTP}
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

                </div>

              )}


              {/* MESSAGE */}

              {message && (

                <p className="auth-message">
                  {message}
                </p>

              )}


              {/* SIGN IN */}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >

                {loading
                  ? "Signing In..."
                  : "Sign In"}

              </button>

            </form>


            {/* DIVIDER */}

            <div className="auth-divider">

              <span>
                OR
              </span>

            </div>


            {/* REGISTER */}

            <p className="auth-register">

              Don't have an account?

              <a href="/register">
                {" "}Create Account
              </a>

            </p>

          </div>

        </section>

      </main>
    </>
  );
}

export default Login;