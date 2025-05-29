import { useState, useEffect, useCallback } from "react";
import { useThrottledCallback } from "../hooks/useThrottledCallback";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AboutUsSection from "./AboutUsSection";
import ContactSection from "./ContactSection";
import RobotImages from "./RobotImages";
import BottomNavBar from "./BottomNavBar";
import { ABOUT_US_HEADING, FULL_ABOUT_US_TEXT, FEATURES_DATA, CONTACT_METHODS } from "./Constants";

export default function DeveloperLandingPage() {
  const [showFeaturesContent, setShowFeaturesContent] = useState(false);
  const [showAboutUsContent, setShowAboutUsContent] = useState(false);
  const [showContactCardsContent, setShowContactCardsContent] = useState(false);
  const [showContactFormContent, setShowContactFormContent] = useState(false);
  const [typedAboutUsText, setTypedAboutUsText] = useState("");
  const [robot1CurrentOpacity, setRobot1CurrentOpacity] = useState(1);
  const [robot2CurrentOpacity, setRobot2CurrentOpacity] = useState(0);
  const [robot3CurrentOpacity, setRobot3CurrentOpacity] = useState(0);
  const [robot4CurrentOpacity, setRobot4CurrentOpacity] = useState(0);
  const [featuresAnimationProgress, setFeaturesAnimationProgress] = useState(0);
  const [contactCardsAnimationProgress, setContactCardsAnimationProgress] = useState(0);
  const [contactFormAnimationProgress, setContactFormAnimationProgress] = useState(0);
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

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    const INTRO_END_SCROLL = 1000;
    const FEATURES_START_SCROLL = INTRO_END_SCROLL + 400;
    const FEATURES_END_SCROLL = FEATURES_START_SCROLL + 2200;
    const ABOUT_US_START_SCROLL = FEATURES_END_SCROLL + 1400;
    const ABOUT_US_TYPING_END_SCROLL = ABOUT_US_START_SCROLL + 1200;
    const CONTACT_CARDS_START_SCROLL = ABOUT_US_TYPING_END_SCROLL + 1000;
    const CONTACT_CARDS_END_SCROLL = CONTACT_CARDS_START_SCROLL + 800;
    const CONTACT_FORM_START_SCROLL = CONTACT_CARDS_END_SCROLL + 300;
    const CONTACT_FORM_END_SCROLL = CONTACT_FORM_START_SCROLL + 2000;
    const ROBOT_FADE_OUT_START_SCROLL = CONTACT_FORM_END_SCROLL + 600;

    let showFeatures = false;
    let showAboutUs = false;
    let showContactCards = false;
    let showContactForm = false;

    // Determine active section and visibility
    if (currentScrollY < INTRO_END_SCROLL) {
      setActiveItem("hero");
    } else if (currentScrollY >= FEATURES_START_SCROLL && currentScrollY <= FEATURES_END_SCROLL) {
      setActiveItem("features");
      showFeatures = true;
      const progress = Math.max(
        1,
        Math.min(1, (currentScrollY - FEATURES_START_SCROLL) / (FEATURES_END_SCROLL - FEATURES_START_SCROLL))
      );
      setFeaturesAnimationProgress(progress);
    } else if (currentScrollY >= ABOUT_US_START_SCROLL && currentScrollY <= ABOUT_US_TYPING_END_SCROLL) {
      setActiveItem("about");
      showAboutUs = true;
      const scrollProgress = Math.max(
        1,
        Math.min(1, (currentScrollY - ABOUT_US_START_SCROLL) / (ABOUT_US_TYPING_END_SCROLL - ABOUT_US_START_SCROLL))
      );
      const charsToShow = Math.floor(scrollProgress * FULL_ABOUT_US_TEXT.length);
      setTypedAboutUsText(FULL_ABOUT_US_TEXT.substring(0, charsToShow));
    } else if (currentScrollY > ABOUT_US_TYPING_END_SCROLL && currentScrollY < CONTACT_CARDS_START_SCROLL) {
      setActiveItem("about");
      setTypedAboutUsText(FULL_ABOUT_US_TEXT);
    } else if (currentScrollY >= CONTACT_CARDS_START_SCROLL) {
      setActiveItem("contact");
      if (currentScrollY >= CONTACT_CARDS_START_SCROLL && currentScrollY <= CONTACT_CARDS_END_SCROLL) {
        showContactCards = true;
        const progress = Math.max(
          0,
          Math.min(1, (currentScrollY - CONTACT_CARDS_START_SCROLL) / (CONTACT_CARDS_END_SCROLL - CONTACT_CARDS_START_SCROLL))
        );
        setContactCardsAnimationProgress(progress);
      } else {
        setContactCardsAnimationProgress(1); // Keep cards fully visible until form starts
      }
      if (currentScrollY >= CONTACT_FORM_START_SCROLL && currentScrollY <= CONTACT_FORM_END_SCROLL) {
        showContactForm = true;
        showContactCards = false; // Explicitly hide cards when form is visible
        const progress = Math.max(
          0,
          Math.min(1, (currentScrollY - CONTACT_FORM_START_SCROLL) / (CONTACT_FORM_END_SCROLL - CONTACT_FORM_START_SCROLL))
        );
        setContactFormAnimationProgress(progress);
      } else {
        setContactFormAnimationProgress(0);
      }
    }

    setShowFeaturesContent(showFeatures);
    setShowAboutUsContent(showAboutUs);
    setShowContactCardsContent(showContactCards);
    setShowContactFormContent(showContactForm);

    let newRobot1Opacity = 0;
    let newRobot2Opacity = 0;
    let newRobot3Opacity = 0;
    let newRobot4Opacity = 0;

    if (currentScrollY <= INTRO_END_SCROLL) {
      newRobot1Opacity = 1;
    } else if (currentScrollY > INTRO_END_SCROLL && currentScrollY <= FEATURES_START_SCROLL) {
      const fadeProgress = (currentScrollY - INTRO_END_SCROLL) / (FEATURES_START_SCROLL - INTRO_END_SCROLL);
      newRobot1Opacity = 1 - fadeProgress;
      newRobot2Opacity = fadeProgress;
    }

    if (currentScrollY > INTRO_END_SCROLL && currentScrollY <= FEATURES_END_SCROLL) {
      if (currentScrollY >= FEATURES_START_SCROLL) {
        newRobot2Opacity = 1;
      }
    } else if (currentScrollY > FEATURES_END_SCROLL && currentScrollY <= ABOUT_US_START_SCROLL) {
      const fadeOutProgress = (currentScrollY - FEATURES_END_SCROLL) / (ABOUT_US_START_SCROLL - FEATURES_END_SCROLL);
      newRobot2Opacity = 1 - fadeOutProgress;
      newRobot3Opacity = fadeOutProgress;
    }

    if (currentScrollY > FEATURES_END_SCROLL && currentScrollY <= ABOUT_US_TYPING_END_SCROLL) {
      if (currentScrollY >= ABOUT_US_START_SCROLL) {
        newRobot3Opacity = 1;
      }
    } else if (currentScrollY > ABOUT_US_TYPING_END_SCROLL && currentScrollY <= CONTACT_CARDS_START_SCROLL) {
      const fadeOutProgress = (currentScrollY - ABOUT_US_TYPING_END_SCROLL) / (CONTACT_CARDS_START_SCROLL - ABOUT_US_TYPING_END_SCROLL);
      newRobot3Opacity = 1 - fadeOutProgress;
      newRobot4Opacity = fadeOutProgress;
    }

    if (currentScrollY > CONTACT_CARDS_START_SCROLL && currentScrollY <= CONTACT_FORM_END_SCROLL) {
      newRobot4Opacity = 1;
    } else if (currentScrollY > ROBOT_FADE_OUT_START_SCROLL) {
      const fadeOutProgress = Math.min(1, (currentScrollY - ROBOT_FADE_OUT_START_SCROLL) / 500);
      newRobot4Opacity = 1 - fadeOutProgress;
    }

    setRobot1CurrentOpacity(newRobot1Opacity);
    setRobot2CurrentOpacity(newRobot2Opacity);
    setRobot3CurrentOpacity(newRobot3Opacity);
    setRobot4CurrentOpacity(newRobot4Opacity);
  }, []);

  const throttledHandleScroll = useThrottledCallback(handleScroll, 100);

  useEffect(() => {
    const html = document.documentElement;
    const originalMinHeight = html.style.minHeight;
    html.style.minHeight = "1200vh";

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      html.style.minHeight = originalMinHeight;
    };
  }, [throttledHandleScroll]);

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

  return (
    <>
      <style>
        {`
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
        `}
      </style>
      <div className="min-h-screen w-full bg-primary">
        <div className="fixed inset-0 bg-primary z-0">
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-pulse"></div>
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
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full text-white p-4 sm:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
              <RobotImages
                robot1Opacity={robot1CurrentOpacity}
                robot2Opacity={robot2CurrentOpacity}
                robot3Opacity={robot3CurrentOpacity}
                robot4Opacity={robot4CurrentOpacity}
                setMouseClientPos={setMouseClientPos}
                setIsRobotAreaHovered={setIsRobotAreaHovered}
                mouseClientPos={mouseClientPos}
                isRobotAreaHovered={isRobotAreaHovered}
              />
              <div className="w-full relative h-full flex flex-col justify-center md:order-1 order-2">
                <div id="hero">
                  <HeroSection
                    show={!showFeaturesContent && !showAboutUsContent && !showContactCardsContent && !showContactFormContent && window.scrollY <= 2000}
                  />
                </div>
                <div id="features">
                  <FeaturesSection
                    show={showFeaturesContent}
                    isMobile={isMobile}
                    currentFeatureIndex={currentFeatureIndex}
                    animationProgress={featuresAnimationProgress}
                  />
                </div>
                <div id="about">
                  <AboutUsSection
                    show={showAboutUsContent}
                    typedText={typedAboutUsText}
                  />
                </div>
                <div id="contact">
                  <ContactSection
                    showCards={showContactCardsContent}
                    showForm={showContactFormContent}
                    cardsAnimationProgress={contactCardsAnimationProgress}
                    formAnimationProgress={contactFormAnimationProgress}
                    formData={contactFormData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "900vh" }}></div>
        </div>
        <BottomNavBar activeItem={activeItem} setActiveItem={setActiveItem} />
      </div>
    </>
  );
}