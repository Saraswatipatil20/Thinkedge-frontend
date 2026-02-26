import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginModal = ({ openModal, setOpenModal, setIsSignUpModalOpen, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const[usename,setUsername]=useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotEmail, setForgotEmail] = useState(""); // ✅ State for forgot password email
  const [isForgotPassword, setIsForgotPassword] = useState(false); // ✅ Toggle login/forgot password
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenModal(false);
    setError("");
    setIsForgotPassword(false); // ✅ Reset to login form when closing
  };

  const handleOpenSignUp = () => {
    setOpenModal(false);
    setIsSignUpModalOpen(true);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true); // ✅ Show forgot password form
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = { email, password };

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.role === "ROLE_USER") {
        localStorage.setItem("authToken", data.jwtToken);
        localStorage.setItem("email",data.username);
        setIsAuthenticated(true);
        handleClose();
        navigate("/");
      } else if (response.ok && data.role === "ROLE_ADMIN") {
        localStorage.setItem("authToken",data.jwtToken);
        setIsAuthenticated(true);
        handleClose();
        navigate("/admin");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset link sent! Check your email.");
        setIsForgotPassword(false); // ✅ Go back to login form
      } else {
        setError(data.error || "Failed to send reset link.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    openModal && (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50 p-4">
        <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <h2 className="text-2xl mb-4 text-center text-white">
            {isForgotPassword ? "Reset Your Password" : "Login or Sign Up"}
          </h2>

          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          {/* ✅ Login Form */}
          {!isForgotPassword && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-white font-medium">
                  What's your email?
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-md bg-[#262626] text-white outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-white font-medium">
                  Your password?
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 rounded-md bg-[#262626] text-white outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-[#6674CC] text-white rounded-md hover:bg-[#5a56e5] transition"
              >
                Login
              </button>
            </form>
          )}

          {/* ✅ Forgot Password Form */}
          {isForgotPassword && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="forgot-email" className="block text-white mb-1">
                  Enter your email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 bg-[#262626] text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-[#6674CC] text-white rounded hover:bg-[#5c63a2] transition-colors"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="mt-4 text-[#6674CC] hover:underline block text-center"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* ✅ Footer Links */}
          {!isForgotPassword && (
            <div className="flex justify-between mt-4 text-sm">
              <button
                onClick={handleOpenSignUp}
                className="text-[#6674CC] hover:underline"
              >
                Create Account
              </button>
              <button
                onClick={handleForgotPassword}
                className="text-[#6674CC] hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* ✅ Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default LoginModal;
