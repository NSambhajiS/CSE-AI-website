import React, { useEffect } from "react";
import "./Home.css";

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="hero container">
      <div className="hero-text">
        <h2>
          Faculty Research & Development Data of CSE(AI) Department of BRACT's VIIT, Pune.
        </h2>
        <p>
          Our highly educated, skilled, and experienced faculties are always here
          to help you!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
