// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import TicketSection from "./pages/TicketSection.jsx";
import ProfileSection from "./pages/ProfileSection.jsx";
import UsersAgentsPage from "./pages/UsersAgentsPage.jsx"; // <-- Import the new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="tickets" element={<TicketSection />} />
        <Route path="profile" element={<ProfileSection />} />
        <Route path="users" element={<UsersAgentsPage />} />
        {/* <-- Add this route */}
      </Route>
    </Routes>
  );
}

export default App;
