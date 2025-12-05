import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import AuthForm from "./Pages/AuthForm";
import Lenis from "lenis";

import MainLayout from "./layout/MainLayout.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import TicketSection from "./pages/admin/TicketSection.jsx";
import ProfileSection from "./pages/admin/ProfileSection.jsx";

function App() {
const lenis = useRef(null);

useEffect(() => {
// Only initialize Lenis for public pages
const pathname = window.location.pathname;
if (!pathname.startsWith("/admin")) {
lenis.current = new Lenis({
duration: 0.6,
easing: (t) => 1 - Math.pow(1 - t, 3),
smooth: true,
smoothTouch: true,
});


  const animate = (time) => {
    lenis.current.raf(time);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  return () => {
    lenis.current.destroy();
  };
}


}, []);

const scrollToSection = (id) => {
if (lenis.current) {
const element = document.getElementById(id);
lenis.current.scrollTo(element);
}
};

return (
<Routes>
{/* Public pages */}
<Route path="/" element={<Landing scrollToSection={scrollToSection} />} />
<Route path="/Login" element={<AuthForm />} />
<Route path="/Register" element={<AuthForm />} />


    {/* Admin dashboard */}
    <Route path="/admin" element={<MainLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="tickets" element={<TicketSection />} />
      <Route path="profile" element={<ProfileSection />} />
    </Route>
  </Routes>


);
}

export default App;
