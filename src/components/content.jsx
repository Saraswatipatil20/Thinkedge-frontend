import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link, useNavigate } from "react-router-dom"; 

import right from "../assets/home-right.webp"; // Ensure correct path for the image

const Content = () => {
  const typedRef = useRef(null);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    // Typed.js typing animation
    const typed = new Typed(typedRef.current, {
      strings: ["Web Designer", "Web Developer", "Graphic Designer", "YouTuber"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    // Cleanup Typed.js instance on component unmount
    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    // Counter animation
    const counters = document.querySelectorAll(".count");
    const speed = 200;

    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCount();
    });
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="hero-section text-center py-12 px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-7/12">
            <h1 className="text-4xl font-bold">
              Learn & become the <br />
              <span className="text-indigo-600">Top 1% software developer</span>
            </h1>
            <h4 className="text-4xl mt-4 mb-2">
              <span ref={typedRef}></span>
            </h4>
            <button
              className="btn bg-indigo-600 text-white font-bold py-3 px-6 rounded mt-6 hover:bg-indigo-700"
              onClick={() => navigate("/sigma-course")}
            >
              <span className="text-yellow-400">Ultimate</span> Placement Solution &raquo;
            </button>
          </div>
          <div className="md:w-5/12  ">
            <img
              src={right}
              alt="Smiling person coding"
              className="max-w-[450px] h-auto responsive-image  rounded-full" // Max width of 500px, height auto
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section relative bg-gradient-to-br from-indigo-500 to-indigo-400 text-white py-16 px-4">
  <div className="absolute inset-0 bg-gradient-to-tl from-indigo-400 to-indigo-500 transform skew-y-12 z-0"></div>
  
  <div className="relative z-10 text-center">
    <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold">
      INDIA'S MOST LOVED CODING COMMUNITY ❤️
    </h5>

    {/* Responsive Grid for Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <div className="text-center">
        <p className="text-4xl">&#128101;</p>
        <h3 className="count text-3xl font-semibold" data-target="6000000">
          0
        </h3>
        <p className="text-lg">Happy Learners</p>
      </div>

      <div className="text-center">
        <p className="text-4xl">&#128065;</p>
        <h3 className="text-3xl font-semibold">2 Crore+</h3>
        <p className="text-lg">Monthly Views</p>
      </div>

      <div className="text-center">
        <p className="text-4xl">&#128279;</p>
        <h3 className="count text-3xl font-semibold" data-target="100000">
          0
        </h3>
        <p className="text-lg">New Monthly Subscribers</p>
      </div>
    </div>
  </div>
</div>

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

      {/* Placement Section */}
      <section className="placement bg-white text-center py-16 px-4">
        <h1 className="text-3xl font-bold text-indigo-600">
          NEW PLACEMENT PREP BATCH 🔥
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          SIGMA 5.0: DSA + DEVELOPMENT + APTITUDE
        </p>
        <p className="text-lg text-gray-700 mt-2 mb-5">
          Start your placement preparation today!
        </p>
        <a
          href="#"
          className="btn bg-indigo-600 text-white py-3 px-6 mt-3 rounded mt-6 hover:bg-indigo-700"
          onClick={() => navigate("/sigma-course")}
        >
          Explore More &raquo;
        </a>
      </section>

      {/* Companies Section */}
      <section className="companies py-16 text-center bg-gray-100">
        <h2 className="font-semibold text-4xl">
          Thousands of students achieved their{" "}
          <span className="text-primary text-indigo-600">dream job at</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center mt-8">
          {[
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/ec5be16b046b62a2a860b67f9dc55b86.png",
              alt: "Amazon",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/ee17a1d06126f8bfc5444ad666e8ba21.png",
              alt: "Google",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/9e4198383730a6e7036b2c7cf50554d0.png",
              alt: "Microsoft",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/5a5a608278ba2b74aff5fb081f7df81c.png",
              alt: "Goldman Sachs",
            }, {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/02fb63567e1b107d549d5d15e922424b.png",
              alt: "PayPal",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/4d6e24add7d7c5d618aeef1795dba038.png",
              alt: "Samsung",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/622a116daf32436d38271cd6c49ee3af.png",
              alt: "Salesforce",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/cfe53c7856b98c0bf010ebcfc8cbfa29.png",
              alt: "NetApp",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/91cb8fef8fe424a1ae2406aa58a380d8.png",
              alt: "Hitachi",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/689bf09a2c1040423fba7a8db0248211.png",
              alt: "JPMorgan",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/b5070669b92945ffb20fadc3ea552d16.png",
              alt: "IBM",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/0f683ab474c5a018baa3bdd53330c9ae.png",
              alt: "Dell",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/e24ce5f542c45a73c05172d9c4f38e2e.png",
              alt: "Deloitte",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/f271b7c4e1a5c41745580804a2b2b458.png",
              alt: "KPMG",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/2c6580da38af7ceff65addfda59f06b9.png",
              alt: "ISRO",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/1da11f6f0c244abc5abffc0556730e91.png",
              alt: "Mercedes-Benz",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/f226d6ddcb4f38c2c23f02008bbdf737.png",
              alt: "EY",
            },
            {
              src: "https://lwfiles.mycourse.app/62a6cd5e1e9e2fbf212d608d-public/9a47085894be9870158c9ad4e23c1a24.png",
              alt: "Airtel",
            }
            // Additional companies can be added here...
          ].map((company, index) => (
            <img
              key={index}
              src={company.src}
              alt={company.alt}
              className="w-40 h-auto mx-4 my-4"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Content;
