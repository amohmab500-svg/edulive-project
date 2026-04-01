import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import RegistrationRequests from "../pages/RegistrationRequests";

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

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="registration-requests" element={<RegistrationRequests />} />
        <Route path="/" element={<AdminLayout />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}