import React, { useState } from 'react';
// import { ParallaxProvider } from 'react-scroll-parallax';
import BottomNavBar from './components/BottomNavBar';
import DeveloperLandingPage from './components/LandingPage';
import Header from './components/Header';


function App() {
  const [activeSection, setActiveSection] = useState('Home');

  return (
       
<div className="relative min-h-[300vh] bg-primary text-white font-inter">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>

      {/* Header component - positioned at the top and fixed */}
      <Header />

      {/* <ParallaxProvider> */}
        {/* DeveloperLandingPage is fixed and takes full screen, but Header is above it due to z-index */}
        {/* <div className="fixed inset-0 flex items-center justify-center z-20"> */}
        <div className="relative flex items-center justify-center z-20">
          <DeveloperLandingPage onSectionChange={setActiveSection} />
        </div>

        {/* This div was likely for content below the landing page, ensure it has enough padding if needed */}
        <div className="pb-20"></div>
      {/* </ParallaxProvider> */}
    </div>
  
    
  );
}

export default App;