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

import AdminLogin from "./pages/AdminLogin";
import Courses from "./pages/Courses";
import ParentLogin from "./pages/ParentLogin";
import Quiz from "./pages/Quiz";
import StudentLogin from "./pages/StudentLogin";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* EcoTrack Citizen Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-waste" element={<ReportWaste />} />
        <Route path="/schedule-pickup" element={<SchedulePickup />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/profile" element={<Profile />} />

        {/* EcoTrack Collector */}
        <Route
          path="/collector-dashboard"
          element={<CollectorDashboard />}
        />

        {/* EcoTrack Admin */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        {/* Group Learning Platform Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/parent-login" element={<ParentLogin />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;