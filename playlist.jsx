import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CoursePage = () => {
  const [videos, setVideos] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseIdFromUrl = queryParams.get("courseId");
  const [courseId, setCourseId] = useState(courseIdFromUrl || localStorage.getItem("courseId"));
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing!");
      return;
    }
    localStorage.setItem("courseId", courseId);

    const fetchVideoList = async () => {
      setLoading(true);
      try {
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `http://localhost:8081/api/showVideo?courseId=${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch videos");

        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoList();
  }, [courseId]);

  const handleVideoSelect = (video, index) => {
    setVideoUrl(video.video_url);
    setCurrentLessonIndex(index);
  };

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => console.error("Auto-play blocked:", err));
    }
  }, [videoUrl]);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Course Videos</h2>
        <h3 className="text-md font-medium mb-2">Course ID: {courseId}</h3>
        {loading ? <p>Loading videos...</p> : (
          <ul className="space-y-4">
            {videos.map((video, index) => (
              <li
                key={index}
                className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg ${
                  currentLessonIndex === index ? "bg-blue-200" : "hover:bg-gray-200"
                }`}
                onClick={() => handleVideoSelect(video, index)}
              >
                <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
                  <i className="fas fa-play text-xs"></i>
                </div>
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-2/3 bg-black flex items-center justify-center">
        {videoUrl ? (
          <video ref={videoRef} width="100%" height="80%" controls autoPlay>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : <p className="text-white">Select a video to start watching.</p>}
      </div>
    </div>
  );
};

export default CoursePage;
