import React, { useEffect, useState } from "react";
import "./animate.css"; // Import CSS for styling
import logo from "../assets/logo1-removebg-preview (2).png"; // ✅ Make sure this is in `src` folder
 
 
const Preloader = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 6000); // Adjust the timing if needed
      return () => clearTimeout(timer);
    }, []);
  
    return (
      loading && (
        <div className="preloader">
          <img src={logo} alt="ThinkEdge Logo" className="logo" />
        </div>
      )
    );
  };
  
  export default Preloader;
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
