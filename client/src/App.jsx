import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthForm from "./pages/AuthForm";
import Lenis from "lenis";

import MainLayout from "./layout/MainLayout.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import TicketSection from "./pages/admin/TicketSection.jsx";
import ProfileSection from "./pages/admin/ProfileSection.jsx";

function App() {
  const lenis = useRef(null);
  // initialize Lenis only on landing (body-scrolling) routes to avoid hijacking inner scroll areas
  const location = useLocation();
  useEffect(() => {
    // if not on root landing, ensure Lenis is destroyed
    if (location.pathname !== '/') {
      if (lenis.current) {
        try { lenis.current.destroy(); } catch (e) {}
        lenis.current = null;
      }
      return;
    }

    // Initialize Lenis on landing route
    lenis.current = new Lenis({
      duration: 0.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
    });
    let rafId;
    const animate = (time) => {
      if (lenis.current) lenis.current.raf(time);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => {
      if (lenis.current) {
        try { lenis.current.destroy(); } catch (e) {}
        lenis.current = null;
      }
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (lenis.current && typeof lenis.current.scrollTo === 'function') {
      lenis.current.scrollTo(element);
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

    {/* User dashboard (same layout, scoped view) */}
    <Route path="/user" element={<MainLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="tickets" element={<TicketSection />} />
      <Route path="profile" element={<ProfileSection />} />
    </Route>
  </Routes>


);
}

export default App;
