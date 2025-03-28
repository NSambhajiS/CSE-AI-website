// filepath: /krishna-project/frontend/krishna-frontend/src/pages/FacultyPage.jsx
import React from 'react';
import Home from '../components/Home/Home';
import About from '../components/Home/About'; 
import HODIntro from '../components/Home/HODIntro';
import Footer from '../components/Home/Footer';


function HomePage() {
  return (
    <div>
      <Home />
      <About />
      <HODIntro />
      <Footer />
    </div>
  );
}

export default HomePage;