
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">Title</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-100"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h2 className="text-5xl font-bold mb-6 text-blue-900">
          Welcome
        </h2>
        <p className="text-xl mb-8 text-blue-800 max-w-xl">
          Placeholder text
        </p>
        <Link
          to="/register"
          className="px-8 py-4 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center bg-white shadow-inner text-blue-700">
        &copy; Placeholder
      </footer>
    </div>
  );
}
