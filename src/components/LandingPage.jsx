import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AboutUsSection from "./AboutUsSection";
import ContactSection from "./ContactSection";
import BottomNavBar from "./BottomNavBar";
import { FEATURES_DATA } from "./Constants";

export default function DeveloperLandingPage({ onSectionChange }) {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [mouseClientPos, setMouseClientPos] = useState({ x: null, y: null });
  const [isRobotAreaHovered, setIsRobotAreaHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [activeItem, setActiveItem] = useState("hero");

  useEffect(() => {
    // Disable body overflow to prevent scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % FEATURES_DATA.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", contactFormData);
  };

  const handleSectionChange = (section) => {
    setActiveItem(section);
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <>
      <style>
        {`
          /* Ensure no scrolling */
          html, body {
            height: 100vh;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          .sine-background {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 C25,20 75,80 100,50' fill='none' stroke='%2333ccff' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M0,60 C25,30 75,90 100,60' fill='none' stroke='%2333ccff' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M0,40 C25,10 75,70 100,40' fill='none' stroke='%2333ccff' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E");
            background-size: 200px 200px;
            animation: sine-flow 25s linear infinite;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 5;
          }
          @keyframes sine-flow {
            0% { background-position: 0 0; }
            100% { background-position: 200px 200px; }
          }
          .particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 6;
            pointer-events: none;
          }
          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(51, 204, 255, 0.8) 0%, rgba(51, 204, 255, 0) 70%);
            border-radius: 50%;
            animation: particle-float 15s linear infinite;
            opacity: 0.5;
          }
          @keyframes particle-float {
            0% { transform: translateY(0) translateX(0); opacity: 0.5; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
          }
          .hud-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 7;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 C20,30 40,70 60,50 C80,30 100,70 100,50' fill='none' stroke='%2333ccff' stroke-width='0.2' opacity='0.15'/%3E%3C/svg%3E");
            background-size: 100px 100px;
            opacity: 0.15;
            pointer-events: none;
          }
          .hud-text {
            position: absolute;
            color: rgba(51, 204, 255, 0.3);
            font-family: 'Courier New', monospace;
            font-size: 12px;
            animation: hud-scan 5s linear infinite;
          }
          @keyframes hud-scan {
            0% { transform: translateY(0); opacity: 0.3; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-20px); opacity: 0.1; }
          }
          .gradient-button {
            background: linear-gradient(to right, #ff6bd6, #a855f7);
            color: white;
            font-weight: 500;
            padding: 12px 24px;
            border-radius: 9999px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          .gradient-button:hover {
            background: linear-gradient(to right, #ff8be0, #c084fc);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          }
          .gradient-button-secondary {
            background: transparent;
            color: white;
            font-weight: 500;
            padding: 12px 24px;
            border-radius: 9999px;
            border: 1px solid grey;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
          .gradient-button-secondary:hover {
            background: linear-gradient(to right, #c084fc, #9333ea);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          }
          .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 20;
          }
          .section {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            opacity: 0;
            transition: opacity 0.6s ease-out;
          }
          .section.active {
            opacity: 1;
            z-index: 10;
          }
        `}
      </style>
      <div className="w-full h-[100vh] bg-primary relative overflow-hidden">
        <div className="bg-primary z-0 relative h-full">
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${10 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
          <div className="hud-overlay">
            <div className="hud-text" style={{ top: "10%", left: "5%" }}>
              SYSTEM: INITIALIZED
            </div>
            <div className="hud-text" style={{ top: "20%", right: "5%" }}>
              DATA_STREAM: ACTIVE
            </div>
            <div className="hud-text" style={{ bottom: "15%", left: "10%" }}>
              PROTOCOL: SECURE
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink..to-pink..600/20 animate-pulse"></div>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
                }}
              ></div>
            </div>
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>
          <div className="relative z-10 w-full h-full text-white p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div id="hero" className={`section ${activeItem === "hero" ? "active" : ""}`}>
              <HeroSection
                setMouseClientPos={setMouseClientPos}
                setIsRobotAreaHovered={setIsRobotAreaHovered}
                mouseClientPos={mouseClientPos}
                isRobotAreaHovered={isRobotAreaHovered}
              />
            </div>

            {/* Features Section */}
            <div id="features" className={`section ${activeItem === "features" ? "active" : ""}`}>
              <FeaturesSection
                isMobile={isMobile}
                currentFeatureIndex={currentFeatureIndex}
                setMouseClientPos={setMouseClientPos}
                setIsRobotAreaHovered={setIsRobotAreaHovered}
                mouseClientPos={mouseClientPos}
                isRobotAreaHovered={isRobotAreaHovered}
              />
           `           </div>

            {/* About Us Section */}
            <div id="about" className={`section ${activeItem === "about" ? "active" : ""}`}>
              <AboutUsSection
                setMouseClientPos={setMouseClientPos}
                setIsRobotAreaHovered={setIsRobotAreaHovered}
                mouseClientPos={mouseClientPos}
                isRobotAreaHovered={isRobotAreaHovered}
              />
            </div>

            {/* Contact Section */}
            <div id="contact" className={`section ${activeItem === "contact" ? "active" : ""}`}>
              <ContactSection
                formData={contactFormData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setMouseClientPos={setMouseClientPos}
                setIsRobotAreaHovered={setIsRobotAreaHovered}
                mouseClientPos={mouseClientPos}
                isRobotAreaHovered={isRobotAreaHovered}
              />
            </div>
          </div>
        </div>
        <div className="bottom-nav">
          <BottomNavBar activeItem={activeItem} handleSectionChange={handleSectionChange} />
        </div>
      </div>
    </>
  );
}