import React, { useState, useEffect } from "react";

function SignUpModal({ openModal, setOpenModal, setIsLoginModalOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // State to show messages

  const API_URL = "http://localhost:8081/api/auth/singup";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.mobile) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed!");
      }

      setMessage("✅ Signup Successful! Redirecting to login...");
      setTimeout(() => {
        setOpenModal(false);
        setIsLoginModalOpen(true); // Open login modal
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ " + (error.message || "Signup failed! Please try again."));
    } finally {
      setLoading(false);
    }
  };

  // Reset message when modal opens or closes
  useEffect(() => {
    if (!openModal) {
      setMessage("");
    }
  }, [openModal]);

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.8)]">
      <div className="relative w-full max-w-sm h-auto bg-black p-6 shadow-lg">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          SIGN UP TO ThinkEdge
        </h2>

        {message && (
          <p className="text-center text-sm p-2 rounded bg-[#262626] text-white mb-3">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#262626] text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#262626] text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#262626] text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-1" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#262626] text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 text-white rounded ${
              loading ? "bg-gray-500" : "bg-[#6674CC] hover:bg-[#5c63a2] transition-colors"
            }`}
          >
            {loading ? "Signing Up..." : "Start your learning journey"}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4 text-sm">
          <button
            onClick={() => {
              setOpenModal(false);
              setIsLoginModalOpen(true);
            }}
            className="text-[#6674CC] hover:underline"
          >
            Sign in with your account
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
