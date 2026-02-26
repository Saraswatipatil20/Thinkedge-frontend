import React from "react";
import logo1 from "../assets/logo1.jpg";
import { 
  FaFacebookF, FaTwitter, FaYoutube, FaInstagram, 
  FaLinkedin, FaEnvelope, FaClock, FaMapMarkerAlt, FaPhone 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-center md:text-left py-6 px-4 border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo1} alt="ThinkEdge Logo" className="w-40" />
          <p className="text-blue-600 mt-2">Where education meets real-world needs.</p>
        </div>

        {/* Helpful Links */}
        <div>
          <h5 className="text-lg font-bold text-blue-600">HELPFUL LINKS</h5>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="text-blue-600 hover:underline">Courses</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Refund Policy</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h5 className="text-lg font-bold text-black">GET IN TOUCH</h5>
          <ul className="mt-2 space-y-2 text-gray-700">
            <li><FaMapMarkerAlt className="inline text-red-600 mr-2" /> 123, ThinkEdge Street, India</li>
            <li><FaEnvelope className="inline text-blue-600 mr-2" /> support@ThinkEdge.com</li>
            <li><FaPhone className="inline text-green-600 mr-2 rotate-90" />  +91 XXXXXXXXX</li>
          
            <li><FaClock className="inline text-black mr-2" /> Support: 10am - 6pm</li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h5 className="text-lg font-bold text-black text-center md:text-left">CONNECT WITH US</h5>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="text-blue-600 text-xl hover:scale-110 transition"><FaFacebookF /></a>
            <a href="#" className="text-blue-400 text-xl hover:scale-110 transition"><FaTwitter /></a>
            <a href="#" className="text-red-600 text-xl hover:scale-110 transition"><FaYoutube /></a>
            <a href="#" className="text-pink-500 text-xl hover:scale-110 transition"><FaInstagram /></a>
            <a href="#" className="text-blue-800 text-xl hover:scale-110 transition"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-700 mt-6">
        Copyright &copy; {new Date().getFullYear()} ThinkEdge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
