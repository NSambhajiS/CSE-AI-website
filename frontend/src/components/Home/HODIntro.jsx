import React from "react";
import "./HODIntro.css";
import hodintro_img from "../../assets/hodintro.jpg";

const HODIntro = () => {
  return (
    <div className="hodintro">
      <div className="hodintro-left">
        <h3>Head of the Departement</h3>
        <h2>Dr. Nilesh Sable</h2>
        <p>
          "Hello, I'm Dr. Nilesh Sable, leading the Department of Computer Science
          and Engineering specializing in Artificial Intelligence at VIIT
          College, Pune. Within our dynamic department, we're driving innovation
          and excellence in the realm of AI. Our focus is on empowering students
          to harness the transformative power of AI, preparing them to tackle
          real-world challenges and opportunities in today's technology-driven
          world. With a dedicated team of faculty and state-of-the-art
          resources, we're committed to fostering a collaborative learning
          environment where students can thrive and make meaningful
          contributions to the field of artificial intelligence."
        </p>
      </div>
      <div className="hodintro-right">
        <img src={hodintro_img} alt="" className="hodintro-img" />
      </div>
    </div>
  );
};

export default HODIntro;
