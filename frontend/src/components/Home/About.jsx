import React from "react";
import "./About.css";
import about_img from "../../assets/about.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about-img" />
      </div>
      <div className="about-right">
        <h3>About Departement</h3>
        <h2>Shaping tomorrow with AI brilliance.</h2>
        <p>
          Welcome to the Department of Computer Science and Engineering with a
          focus on Artificial Intelligence (CSEAI) at VIIT College, Pune. At
          CSEAI, we are dedicated to pioneering advancements at the intersection
          of computer science and artificial intelligence. Our department is
          committed to fostering innovative research, cutting-edge technologies
          and academic excellence in AI-driven solutions. With a dynamic
          curriculum, state-of-the-art facilities, and a team of passionate
          faculty, we empower our students to become future leaders in the
          rapidly evolving field of artificial intelligence. Join us as we
          embark on a journey to shape the future through the transformative
          power of AI.
        </p>
      </div>
    </div>
  );
};

export default About;
