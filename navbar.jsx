import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo1.jpg";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Store auth state
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove auth state
    localStorage.removeItem("authToken"); // Remove auth token
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#F9FAFC] shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Company Logo" className="w-48 h-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/sigma-course"
              className={`px-4 py-2 rounded-lg ${
                isActive("/sigma-course") ? "bg-blue-700 text-white" : "bg-[#6674CC] text-white"
              }`}
            >
              Arbitrum course
            </Link>
            <Link
              to="/dsa-sheet"
              className={`font-semibold ${isActive("/dsa-sheet") ? "text-blue-700 underline" : ""}`}
            >
              Whiteboard
            </Link>
            <Link
              to="/new-courses"
              className={`font-semibold ${isActive("/new-courses") ? "text-blue-700 underline" : ""}`}
            >
              New Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/Courses"
                  className={`font-semibold ${isActive("/Courses") ? "text-blue-700 underline" : "text-blue-600"}`}
                >
                  My Batch
                </Link>
                <button className="font-semibold text-red-600" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className={`font-semibold ${isActive("/login") ? "text-blue-700 underline" : "text-blue-600"}`}
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
                <button
                  className={`border border-blue-600 px-4 py-2 rounded-lg ${
                    isActive("/signup") ? "bg-blue-600 text-white" : "text-blue-600"
                  }`}
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} className="text-gray-700" /> : <Menu size={28} className="text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-100">
            <Link
              to="/sigma-course"
              className={`px-4 py-2 rounded-lg ${
                isActive("/sigma-course") ? "bg-blue-700 text-white" : "bg-[#6674CC] text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Arbitrum Course
            </Link>
            <Link
              to="/dsa-sheet"
              className={`font-semibold ${isActive("/dsa-sheet") ? "text-blue-700 underline" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Whiteboard
            </Link>
            <Link
              to="/new-courses"
              className={`font-semibold ${isActive("/new-courses") ? "text-blue-700 underline" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              New Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/Courses"
                  className={`font-semibold ${isActive("/Courses") ? "text-blue-700 underline" : "text-blue-600"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Batch
                </Link>
                <button className="font-semibold text-red-600" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className={`font-semibold ${isActive("/login") ? "text-blue-700 underline" : "text-blue-600"}`}
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
                <button
                  className={`border border-blue-600 px-4 py-2 rounded-lg ${
                    isActive("/signup") ? "bg-blue-600 text-white" : "text-blue-600"
                  }`}
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Modals */}
      <LoginModal
        openModal={isLoginModalOpen}
        setOpenModal={setIsLoginModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        setIsAuthenticated={handleLogin}
      />
      <SignUpModal openModal={isSignUpModalOpen} setOpenModal={setIsSignUpModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
    </>
  );
};

export default Navbar;
