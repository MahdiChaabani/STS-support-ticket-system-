import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    //ROOT
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-300"> 
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full flex justify-between items-center px-6 py-4 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/50 backdrop-blur-md shadow-md' 
            : 'bg-white shadow-md'
        }`}
      >
        <h1 className="text-lg font-bold text-purple-700">Title</h1>
        <div className="space-x-5">
          <Link to="/auth">
          <button className="px-4 py-2 text-sm text-white bg-purple-600 rounded hover:bg-purple-700">
            Login
          </button>
          </Link>
          <Link to="/auth">
          <button className="px-4 py-2 text-sm text-purple-700 border border-purple-700 rounded hover:bg-purple-100">
            Get Started
          </button>
          </Link>
          
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4 mt-40">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
          Placeholder main text
        </h2>
        <p className="text-l mb-8 text-purple-800 max-w-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci dolor
          ut laboriosam optio excepturi ipsa vitae, nam unde porro voluptatem accusamus
          reprehenderit, quod magnam esse officiis. Esse eaque accusamus aspernatur.
        </p>
        <Link to="/auth">
        <button className="px-4 py-2 bg-purple-600 text-white text-lg rounded hover:bg-purple-700">
          Get Started
        </button>
        </Link>
        
        {/* Features Section */}
        <section className="py-16 bg-transparent">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mb-4">
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Placeholder</h3>
              <p className="text-gray-600 text-sm">
                Lorem, ipsum dolor sit amet consectetur 
                adipisicing elit. Aut pariatur, mollitia officiis facere, minus
                maxime earum sunt excepturi atque culpa a at ullam id quaerat sapiente modi repudiandae ab? Optio.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-cyan-600 rounded-lg mb-4">
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Placeholder</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam, explicabo laborum praesentium aliquam eum consequuntur dolorem 
                adipisci quis porro unde quas vero aperiam earum sit, voluptas, a exercitationem incidunt labore.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-green-600 rounded-lg mb-4">
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Placeholder</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Perferendis nemo unde nobis iste placeat odio voluptatibus 
                autem, a, quisquam quos, deserunt dolorum dicta tempore ut voluptatem 
                provident numquam. Quibusdam, tenetur?
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-yellow-600 rounded-lg mb-4">
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Placeholder</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni veniam facere minus 
                totam odio! Suscipit mollitia officia aliquam labore hic eius. 
                Asperiores, nisi. Reiciendis nisi eos quibusdam commodi modi beatae.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-10 px-6 bg-purple-400 mb-25 rounded-[2vw]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-3xl font-bold text-purple-100 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatem accusamus consectetur.
              Debitis doloremque nesciunt aperiam, eaque temporibus eius! Doloribus pariatur ipsam deserunt, optio mollitia architecto reiciendis tenetur ipsum velit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-transparent text-white text-lg font-semibold border-2 border-white rounded-lg hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center bg-white shadow-inner text-purple-800">
        &copy; Placeholder footer
      </footer>
    </div>
  );
}