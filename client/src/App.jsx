import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";

import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import SchedulePickup from "./pages/SchedulePickup";
import MyRequests from "./pages/MyRequests";
import Profile from "./pages/Profile";

import CollectorDashboard from "./pages/CollectorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            EMAIL OTP
        ========================== */}

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        {/* =========================
            CITIZEN PAGES
        ========================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/report-waste"
          element={<ReportWaste />}
        />

        <Route
          path="/schedule-pickup"
          element={<SchedulePickup />}
        />

        <Route
          path="/my-requests"
          element={<MyRequests />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =========================
            COLLECTOR
        ========================== */}

        <Route
          path="/collector-dashboard"
          element={<CollectorDashboard />}
        />

        {/* =========================
            ADMIN
        ========================== */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;