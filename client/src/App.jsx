
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TicketSection from './pages/TicketSection.jsx';
import ProfileSection from './pages/ProfileSection.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="tickets" element={<TicketSection />} />
        <Route path="profile" element={<ProfileSection />} />
      </Route>
    </Routes>
  );
}

export default App;