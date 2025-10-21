import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function AuthForm() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true); //true = login, false = register

  useEffect(() => {
    if (location.pathname === "/Register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/register logic here
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 scroll-smooth">
      <main className="bg-white/50 backdrop-blur-md shadow-md p-20 rounded-[2vw]">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div>
            <Link to={"/"} className="inline-block">
              <div className="bg-purple-400/20 backdrop-blur-md rounded-lg p-1 hover:bg-purple-300/30 transition-colors">
                <svg viewBox="0 0 16 16" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 8 L4 8" 
                    stroke="#4F46E5" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path 
                    d="M4 8 L7 5 M4 8 L7 11" 
                    stroke="#4F46E5" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-medium text-gray font-bold">
            {isLogin ? "Sign in" : "Sign up"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
            {!isLogin && (
              <div className="w-full transform border-b-2 bg-transparent text-md duration-300 focus-within:border-indigo-500">
                <input 
                  type="text" 
                  name="username"
                  placeholder="Username"  
                  className="w-full font-sans border-none bg-transparent outline-none focus:outline-none"
                />
              </div>
            )}

            {!isLogin && (
              <div className="w-full transform border-b-2 bg-transparent text-md duration-300 focus-within:border-indigo-500">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email"  
                  className="w-full font-sans border-none bg-transparent outline-none focus:outline-none"
                />
              </div>
            )}

            {!isLogin && (
              <div className="w-full transform border-b-2 bg-transparent text-md duration-300 focus-within:border-indigo-500">
                <input 
                  type="email" 
                  name="confirmEmail"
                  placeholder="Confirm Email"  
                  className="w-full font-sans border-none bg-transparent outline-none focus:outline-none"
                />
              </div>
            )}
            
            {isLogin && (
              <div className="w-full transform border-b-2 bg-transparent text-md duration-300 focus-within:border-indigo-500">
                <input 
                  type="text" 
                  name="emailOrUsername"
                  placeholder="Email or Username"  
                  className="w-full font-sans border-none bg-transparent outline-none focus:outline-none"
                />
              </div>
            )}

            <div className="w-full transform border-b-2 bg-transparent text-md duration-300 focus-within:border-indigo-500">
              <input 
                type="password" 
                name="password"
                placeholder="Password"  
                className="w-full font-sans border-none bg-transparent outline-none focus:outline-none"
              />
            </div>

            {!isLogin && (
              <div className="w-full transform border-b-2 bg-transparent text-md duration-300 focus-within:border-indigo-500">
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm Password"  
                  className="w-full font-sans border-none bg-transparent outline-none focus:outline-none"
                />
              </div>
            )}

            <button 
              type="submit"
              className="mb-5 transform rounded-sm bg-indigo-500 py-2 font-bold duration-300 hover:bg-indigo-400 text-stone-200"
            >
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>

            <button 
              type="button"
              className="mb-5 transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-md"
            >
              <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1"
                  x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48"
                  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                  </path>
                  <path fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                  </path>
                  <path fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                  </path>
                  <path fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                  </path>
                </svg>
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </span>
            </button>
          </form>

          <a href="#" className="mb-5 transform text-center text-sm text-gray-800 duration-300 hover:text-gray-500">
            Forgot password?
          </a>

          <p className="text-center text-md">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/Register" : "/Login"}
              className="font-medium text-indigo-500 underline hover:text-indigo-300"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}