
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useRef } from 'react';
import Landing from "./Pages/Landing";
import AuthForm from "./Pages/AuthForm";
import Lenis from 'lenis';

function App() {
  const lenis = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenis.current = new Lenis({
      duration: 0.6, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });

    const animate = (time) => {
      lenis.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.current.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    lenis.current.scrollTo(element);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<AuthForm />} />
        <Route path="/Register" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
