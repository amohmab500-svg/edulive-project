import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Levels from "../pages/Levels";
import Teachers from "../pages/Teachers";
import Students from "../pages/Students";
import Groups from "../pages/Groups";
import Resources from "../pages/Resources";
import Messages from "../pages/Messages";
import ContactMessages from "../pages/ContactMessages";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import Attendance from "../pages/Attendance";
import RegistrationRequests from "../pages/RegistrationRequests";

// Public Pages Imports
import PublicLayout from "../layout/PublicLayout";
import HomePage from "../pages/public/HomePage";
import ContactPage from "../pages/public/ContactPage";
import RegisterPage from "../pages/public/RegisterPage";
import NiveauxPage from "../pages/public/NiveauxPage"; // الجديدة
import AvisPage from "../pages/public/AvisPage";       // الجديدة

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes - visitors */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="niveaux" element={<NiveauxPage />} /> {/* إضافة المسار */}
          <Route path="avis" element={<AvisPage />} />       {/* إضافة المسار */}
        </Route>

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Admin protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="levels" element={<Levels />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="students" element={<Students />} />
          <Route path="groups" element={<Groups />} />
          <Route path="resources" element={<Resources />} />
          <Route path="messages" element={<Messages />} />
          <Route path="contact-messages" element={<ContactMessages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="registration-requests" element={<RegistrationRequests />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}