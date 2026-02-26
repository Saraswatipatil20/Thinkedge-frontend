import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import loadingGif from "../assets/loading.gif";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:8081/api/admin/AllCourse", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        
        const data = await response.json();
        console.log("Fetched Courses:", data);

        // Filter courses where available === true
        const availableCourses = data.filter(course => course.available === true);
        setCourses(availableCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId, amount) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    // Store the course ID and amount in localStorage
    localStorage.setItem("selectedCourseId", courseId);
    localStorage.setItem("selectedCourseAmount", amount);

    // Navigate to the payment page
    navigate(`/payment`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Explore Our Courses</h1>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <img src={loadingGif} alt="Loading..." className="w-32 h-32" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-80 bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl p-5 flex flex-col"
            >
              {course.imageData && (
                <img
                  className="w-full h-80 object-cover rounded-md"
                  src={`data:${course.imageType};base64,${course.imageData}`}
                  alt={course.imageName}
                  style={{ width: "500px", height: "auto", borderRadius: "8px", marginTop: "10px" }}
                />
              )}

              <h3 className="text-xl font-bold text-gray-900 mt-4">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed flex-grow">{course.description}</p>
              <p className="text-blue-600 font-semibold text-lg mt-2">{course.price} ETH</p>

              <button
                onClick={() => handleEnroll(course.courseId, course.price)}
                className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
};

export default CourseList;
