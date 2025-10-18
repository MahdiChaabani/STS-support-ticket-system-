
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthForm from "./pages/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
