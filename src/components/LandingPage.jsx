import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "./ui/animated-modal"; // Adjust path as needed

import Robot1 from "../assets/img/robot.png";
import Robot2 from "../assets/img/robot2.png";
import Robot3 from "../assets/img/robot3.png";
import Robot4 from "../assets/img/robot4.png";
import Video from "../assets/videos/robotVideo.mp4";

// Custom hook for throttling a callback
function useThrottledCallback(callback, delay) {
  const callbackRef = useRef(callback);
  const lastRanRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRanRef.current >= delay) {
        callbackRef.current(...args);
        lastRanRef.current = now;
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (Date.now() - lastRanRef.current >= delay) {
            callbackRef.current(...args);
            lastRanRef.current = Date.now();
          }
        }, delay - (now - lastRanRef.current));
      }
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return throttledCallback;
}

const ABOUT_US_HEADING = "About Aalbot";
const FULL_ABOUT_US_TEXT =
  "Welcome to the School of Android & Linux Programming, where innovation meets expertise. Aalbot is your gateway to mastering next-generation automotive technology. We provide comprehensive training in Android Automotive OS, HMI development, and Linux programming - empowering developers to create the intelligent, connected vehicles of tomorrow. Join thousands of professionals who have transformed their careers with our cutting-edge curriculum and hands-on learning approach.";

const FEATURES_DATA = [
  {
    icon: "🏠",
    title: "Helpful in Housework",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: "🧸",
    title: "Kid-Friendly",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: "🧠",
    title: "Monitor Intelligence",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: "🔒",
    title: "Monitor Safety and Security",
    gradient: "from-orange-400 to-red-500",
  },
  {
    icon: "📚",
    title: "Adaptive Learning",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    icon: "🔋",
    title: "Self-Charging",
    gradient: "from-teal-400 to-green-500",
  },
];

const CONTACT_METHODS = [
  {
    icon: "📍",
    label: "Location",
    value: "Kollam",
  },
  {
    icon: "📧",
    label: "Email",
    value: "contact@aalbot.in",
  },
  {
    icon: "📞",
    label: "Call",
    value: "+91 907 250 2065",
  },
];

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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const robot1ImageRef = useRef(null);
  const robot2ImageRef = useRef(null);
  const robot3ImageRef = useRef(null);
  const robot4ImageRef = useRef(null);
  const [mouseClientPos, setMouseClientPos] = useState({ x: null, y: null });
  const [isRobotAreaHovered, setIsRobotAreaHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

 const handleScroll = useCallback(() => {
  const currentScrollY = window.scrollY;

  const INTRO_END_SCROLL = 1000;
  const FEATURES_START_SCROLL = INTRO_END_SCROLL + 400;
  const FEATURES_END_SCROLL = FEATURES_START_SCROLL + 2200;
  const ABOUT_US_START_SCROLL = FEATURES_END_SCROLL + 1400;
  const ABOUT_US_TYPING_END_SCROLL = ABOUT_US_START_SCROLL + 1200;
  const CONTACT_CARDS_START_SCROLL = ABOUT_US_TYPING_END_SCROLL + 1000;
  const CONTACT_CARDS_END_SCROLL = CONTACT_CARDS_START_SCROLL + 800;
const CONTACT_FORM_START_SCROLL = CONTACT_CARDS_END_SCROLL + 300; // Reduced from 600
const CONTACT_FORM_END_SCROLL = CONTACT_FORM_START_SCROLL + 400; // Reduced from 800
  const ROBOT_FADE_OUT_START_SCROLL = CONTACT_FORM_END_SCROLL + 600;

  // Reset all section states
  let showHeroContent = false;
  let showFeatures = false;
  let showAboutUs = false;
  let showContactCards = false;
  let showContactForm = false;

  // Hero Section (only visible at the top)
  if (currentScrollY <= INTRO_END_SCROLL) {
    // eslint-disable-next-line no-unused-vars
    showHeroContent = true;
  }

  // Features Section
  if (
    currentScrollY >= FEATURES_START_SCROLL &&
    currentScrollY <= FEATURES_END_SCROLL
  ) {
    showFeatures = true;
    const progress = Math.max(
      0,
      Math.min(
        1,
        (currentScrollY - FEATURES_START_SCROLL) /
          (FEATURES_END_SCROLL - FEATURES_START_SCROLL)
      )
    );
    setFeaturesAnimationProgress(progress);
  } else {
    setFeaturesAnimationProgress(0);
  }

  // About Us Section
  if (
    currentScrollY >= ABOUT_US_START_SCROLL &&
    currentScrollY <= ABOUT_US_TYPING_END_SCROLL
  ) {
    showAboutUs = true;
    const scrollProgress = Math.max(
      0,
      Math.min(
        1,
        (currentScrollY - ABOUT_US_START_SCROLL) /
          (ABOUT_US_TYPING_END_SCROLL - ABOUT_US_START_SCROLL)
      )
    );
    const charsToShow = Math.floor(scrollProgress * FULL_ABOUT_US_TEXT.length);
    const newTypedText = FULL_ABOUT_US_TEXT.substring(0, charsToShow);
    setTypedAboutUsText(newTypedText);
  } else if (currentScrollY > ABOUT_US_TYPING_END_SCROLL) {
    setTypedAboutUsText(FULL_ABOUT_US_TEXT);
  } else {
    setTypedAboutUsText("");
  }

  // Contact Cards Section
  if (
    currentScrollY >= CONTACT_CARDS_START_SCROLL &&
    currentScrollY <= CONTACT_CARDS_END_SCROLL
  ) {
    showContactCards = true;
    const progress = Math.max(
      0,
      Math.min(
        1,
        (currentScrollY - CONTACT_CARDS_START_SCROLL) /
          (CONTACT_CARDS_END_SCROLL - CONTACT_CARDS_START_SCROLL)
      )
    );
    setContactCardsAnimationProgress(progress);
  } else if (currentScrollY < CONTACT_CARDS_START_SCROLL) {
    setContactCardsAnimationProgress(0);
  } else if (currentScrollY > CONTACT_CARDS_END_SCROLL) {
    setContactCardsAnimationProgress(1);
  }

  // Contact Form Section
  if (
    currentScrollY >= CONTACT_FORM_START_SCROLL &&
    currentScrollY <= CONTACT_FORM_END_SCROLL
  ) {
    showContactForm = true;
    const progress = Math.max(
      0,
      Math.min(
        1,
        (currentScrollY - CONTACT_FORM_START_SCROLL) /
          (CONTACT_FORM_END_SCROLL - CONTACT_FORM_START_SCROLL)
      )
    );
    setContactFormAnimationProgress(progress);
  } else {
    setContactFormAnimationProgress(0);
  }

  // Update section visibility states
  setShowFeaturesContent(showFeatures);
  setShowAboutUsContent(showAboutUs);
  setShowContactCardsContent(showContactCards);
  setShowContactFormContent(showContactForm);

  // Robot Image Transitions
  let newRobot1Opacity = 0;
  let newRobot2Opacity = 0;
  let newRobot3Opacity = 0;
  let newRobot4Opacity = 0;

  if (currentScrollY <= INTRO_END_SCROLL) {
    newRobot1Opacity = 1;
  } else if (
    currentScrollY > INTRO_END_SCROLL &&
    currentScrollY <= FEATURES_START_SCROLL
  ) {
    const fadeProgress =
      (currentScrollY - INTRO_END_SCROLL) /
      (FEATURES_START_SCROLL - INTRO_END_SCROLL);
    newRobot1Opacity = 1 - fadeProgress;
    newRobot2Opacity = fadeProgress;
  }

  if (
    currentScrollY > INTRO_END_SCROLL &&
    currentScrollY <= FEATURES_END_SCROLL
  ) {
    if (currentScrollY >= FEATURES_START_SCROLL) {
      newRobot2Opacity = 1;
    }
  } else if (
    currentScrollY > FEATURES_END_SCROLL &&
    currentScrollY <= ABOUT_US_START_SCROLL
  ) {
    const fadeOutProgress =
      (currentScrollY - FEATURES_END_SCROLL) /
      (ABOUT_US_START_SCROLL - FEATURES_END_SCROLL);
    newRobot2Opacity = 1 - fadeOutProgress;
    newRobot3Opacity = fadeOutProgress;
  }

  if (
    currentScrollY > FEATURES_END_SCROLL &&
    currentScrollY <= ABOUT_US_TYPING_END_SCROLL
  ) {
    if (currentScrollY >= ABOUT_US_START_SCROLL) {
      newRobot3Opacity = 1;
    }
  } else if (
    currentScrollY > ABOUT_US_TYPING_END_SCROLL &&
    currentScrollY <= CONTACT_CARDS_START_SCROLL
  ) {
    const fadeOutProgress =
      (currentScrollY - ABOUT_US_TYPING_END_SCROLL) /
      (CONTACT_CARDS_START_SCROLL - ABOUT_US_TYPING_END_SCROLL);
    newRobot3Opacity = 1 - fadeOutProgress;
    newRobot4Opacity = fadeOutProgress;
  }

  if (
    currentScrollY > CONTACT_CARDS_START_SCROLL &&
    currentScrollY <= CONTACT_FORM_END_SCROLL
  ) {
    newRobot4Opacity = 1;
  } else if (currentScrollY > ROBOT_FADE_OUT_START_SCROLL) {
    const fadeOutProgress = Math.min(
      1,
      (currentScrollY - ROBOT_FADE_OUT_START_SCROLL) / 500
    );
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
    html.style.minHeight = "1020vh"; // Increased to accommodate larger gaps

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      html.style.minHeight = originalMinHeight;
    };
  }, [throttledHandleScroll]);

  const handleRobotMouseMove = (e) => {
    setMouseClientPos({ x: e.clientX, y: e.clientY });
    setIsRobotAreaHovered(true);
  };

  const handleRobotMouseLeave = () => {
    setIsRobotAreaHovered(false);
    setMouseClientPos({ x: null, y: null });
  };

  const getRobotMaskStyle = (imageRef, currentRobotOpacityValue) => {
    if (
      currentRobotOpacityValue > 0.04 &&
      isRobotAreaHovered &&
      mouseClientPos.x !== null &&
      mouseClientPos.y !== null &&
      imageRef.current
    ) {
      const imageRect = imageRef.current.getBoundingClientRect();
      const localMouseX = mouseClientPos.x - imageRect.left;
      const localMouseY = mouseClientPos.y - imageRect.top;

      const radius = 100;
      const fadeOutRadius = 250;

      const maskPosition = `${localMouseX}px ${localMouseY}px`;
      const gradient = `radial-gradient(circle at ${maskPosition}, rgba(255,255,255,2) ${radius}px, rgba(255,255,255,0.5) ${fadeOutRadius}px)`;

      return {
        WebkitMaskImage: gradient,
        maskImage: gradient,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        transition:
          "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out",
      };
    }

    const defaultMask = `linear-gradient(to bottom, rgba(255,255,255,1) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,1) 200%)`;
    return {
      WebkitMaskImage: defaultMask,
      maskImage: defaultMask,
      transition: "mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out",
    };
  };

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

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
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
            box-shadow: 0 6px 20px rgba(0, 0, ाब

System: 0.3);
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-primary">
        <div className="fixed inset-0 bg-primary z-0">
          <div className=""></div> {/* sine-background */}
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

          <div className="fixed inset-0 bg-black opacity-30 z-10 pointer-events-none">
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
              <div className="w-full md:w-1/2 md:justify-start flex justify-center items-center mb-12 md:mb-0 md:order-2 order-1 lg:relative absolute">
                <div className="relative w-64 sm:w-72 md:w-96 lg:w-[500px] h-64 sm:h-72 md:h-96 lg:h-[600px]">
                  <img
                    ref={robot1ImageRef}
                    src={Robot1}
                    alt="Robot 1 - Hero Section"
                    onMouseMove={handleRobotMouseMove}
                    onMouseLeave={handleRobotMouseLeave}
                    style={{
                      opacity: robot1CurrentOpacity,
                      ...getRobotMaskStyle(robot1ImageRef, robot1CurrentOpacity),
                    }}
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out cursor-pointer"
                  />
                  <img
                    ref={robot2ImageRef}
                    src={Robot2}
                    alt="Robot 2 - Features Section"
                    onMouseMove={handleRobotMouseMove}
                    onMouseLeave={handleRobotMouseLeave}
                    style={{
                      opacity: robot2CurrentOpacity,
                      ...getRobotMaskStyle(robot2ImageRef, robot2CurrentOpacity),
                    }}
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out cursor-pointer"
                  />
                  <img
                    ref={robot3ImageRef}
                    src={Robot3}
                    alt="Robot 3 - About Us Section"
                    onMouseMove={handleRobotMouseMove}
                    onMouseLeave={handleRobotMouseLeave}
                    style={{
                      opacity: robot3CurrentOpacity,
                      ...getRobotMaskStyle(robot3ImageRef, robot3CurrentOpacity),
                    }}
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out cursor-pointer"
                  />
                  <img
                    ref={robot4ImageRef}
                    src={Robot4}
                    alt="Robot 4 - Contact Section"
                    onMouseMove={handleRobotMouseMove}
                    onMouseLeave={handleRobotMouseLeave}
                    style={{
                      opacity: robot4CurrentOpacity,
                      ...getRobotMaskStyle(robot4ImageRef, robot4CurrentOpacity),
                    }}
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 relative h-full flex flex-col justify-center md:order-1 order-2">
                <div
  style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "opacity 0.3s ease-in-out",
    opacity:
      !showFeaturesContent &&
      !showAboutUsContent &&
      !showContactCardsContent &&
      !showContactFormContent &&
      window.scrollY <= 1000
        ? 1
        : 0,
    pointerEvents:
      !showFeaturesContent &&
      !showAboutUsContent &&
      !showContactCardsContent &&
      !showContactFormContent &&
      window.scrollY <= 1000
        ? "auto"
        : "none",
  }}
>
  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight text-center md:text-left">
    <span className="text-pink-400">Kammani</span>
  </h1>
  <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-6 leading-tight text-center md:text-left">
    A HOUSE ROBO
  </h2>
  <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight text-center md:text-left">
    Sleek, Smart, and Full of Personality
  </h3>
  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
    It is designed to be both a high-tech helper and a source of joy in your home.
  </p>
  <div className="flex justify-center md:justify-start gap-4">
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="gradient-button"
    >
      Contact on WhatsApp
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.1 3.9C17.9 1.7 15 0.5 12 0.5 5.6 0.5 0.5 5.6 0.5 12c0 2.1 0.7 4.1 1.9 5.8L0.9 23.5l5.8-1.9c1.6 1 3.4 1.5 5.3 1.5 6.4 0 11.5-5.1 11.5-11.5 0-3-1.2-5.9-3.4-8.1zm-8.1 17.1c-1.7 0-3.3-0.5-4.7-1.3l-0.4-0.2-3.4 1.1 1.1-3.4-0.2-0.4c-0.8-1.4-1.3-3-1.3-4.7 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7 0 5.2-4.2 9.4-9.4 9.4zm5.1-6.7c-0.3-0.1-1.7-0.9-1.9-1-0.3-0.1-0.5-0.1-0.7 0.1-0.2 0.2-0.7 1-0.9 1.2-0.2 0.2-0.4 0.3-0.6 0.1-0.6-0.2-2.5-0.8-3.5-2.5-0.8-1.3-1.3-2.7-1.5-3.1-0.2-0.4 0-0.6 0.2-0.8 0.2-0.2 0.4-0.5 0.6-0.7 0.2-0.2 0.3-0.4 0.4-0.6 0.1-0.2 0.1-0.4 0-0.6-0.1-0.2-0.7-1.6-1-2.2-0.3-0.6-0.5-0.5-0.7-0.5-0.2 0-0.4 0-0.6 0.1-0.6 0.2-1.3 0.9-1.3 1.9 0 1.1 0.8 2.2 0.9 2.3 0.1 0.2 1.6 3.4 3.9 4.6 0.6 0.3 1.1 0.5 1.5 0.7 0.6 0.2 1.2 0.2 1.7 0.1 0.5-0.1 1.6-0.7 1.8-1.4 0.2-0.6 0.2-1.3 0.1-1.4z"/>
      </svg>
    </a>
    <Modal>
      <ModalTrigger className="gradient-button-secondary">
        Watch Demo
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-100 font-bold text-center mb-4">
            Kammani Demo Video
          </h4>
          <div className="flex justify-center">
            <video
              ref={videoRef}
              controls
              className="rounded-lg w-full max-w-2xl h-auto"
              aria-label="Kammani demo video"
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button
            onClick={toggleVideoPlay}
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-600 text-white rounded-md text-sm w-28"
          >
            {isVideoPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={(e) => {
              if (videoRef.current) videoRef.current.pause();
              setIsVideoPlaying(false);
              e.currentTarget.closest('[role="dialog"]').querySelector('button').click();
            }}
            className="px-4 py-2 bg-gray-200 text-black dark:bg-neutral-800 dark:text-white border border-gray-300 dark:border-neutral-700 rounded-md text-sm w-28"
          >
            Close
          </button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  </div>
</div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: "opacity 0.7s ease-in-out",
                    opacity: showFeaturesContent ? 1 : 0,
                    pointerEvents: showFeaturesContent ? "auto" : "none",
                  }}
                >
                  <div className="mb-6 text-center md:text-left">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full mb-4">
                      Core Technologies
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-center md:text-left">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
                      Core Features
                    </span>
                  </h1>

                  {isMobile ? (
                    <div className="flex justify-center">
                      <div
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-300 max-w-md w-full"
                        role="listitem"
                        aria-label={`Feature: ${FEATURES_DATA[currentFeatureIndex].title}`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`text-3xl bg-gradient-to-r ${FEATURES_DATA[currentFeatureIndex].gradient} bg-clip-text text-transparent p-2 rounded-lg bg-gray-800/25 flex-shrink-0`}
                          >
                            {FEATURES_DATA[currentFeatureIndex].icon}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-semibold bg-gradient-to-r ${FEATURES_DATA[currentFeatureIndex].gradient} bg-clip-text text-transparent`}
                            >
                              {FEATURES_DATA[currentFeatureIndex].title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto md:mx-0"
                      role="list"
                    >
                      {FEATURES_DATA.map((feature, index) => {
                        const delay = index * 0.2;
                        const shouldShow = featuresAnimationProgress > delay;
                        const itemProgress = Math.max(
                          0,
                          Math.min(1, (featuresAnimationProgress - delay) / 0.3)
                        );

                        return (
                          <div
                            key={index}
                            className={`bg-gray-900/50 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:bg-gray-800/30 hover:border-blue-600/30 transition-all duration-700 transform ${
                              shouldShow
                                ? "translate-y-0 opacity-100"
                                : "translate-y-12 opacity-0"
                            }`}
                            style={{
                              transitionDelay: `${delay}s`,
                              transform: `translateY(${
                                (1 - itemProgress) * 48
                              }px)`,
                              opacity: itemProgress,
                            }}
                            role="listitem"
                            aria-label={`Feature: ${feature.title}`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 rounded-lg bg-gray-800/25 flex items-center flex-shrink-0`}
                              >
                                {feature.icon}
                              </div>
                              <div className="flex-1">
                                <h3
                                  className={`text-lg font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                                >
                                  {feature.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {featuresAnimationProgress > 0.8 && (
                    <div className="mt-10 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 text-sm text-gray-400 animate-pulse">
                        <span>Scroll to explore our vision</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-label="Scroll down arrow"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 14l-8 8l-7-8m0 0l0-7V3m7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: "opacity 0.3s ease-in-out",
                    opacity: showAboutUsContent ? 1 : 0,
                    pointerEvents: showAboutUsContent ? "auto" : "none",
                    zIndex: 10,
                  }}
                >
                  <div className="mb-4 text-center">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-full mb-4">
                      Our Vision
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-center">
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                      {ABOUT_US_HEADING}
                    </span>
                  </h1>

                  <div className="space-y-6 max-w-lg mx-auto flex flex-col items-center">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed min-h-[150px] text-center">
                      {typedAboutUsText}
                      {typedAboutUsText !== FULL_ABOUT_US_TEXT && (
                        <span className="animate-pulse">|</span>
                      )}
                    </p>

                    {typedAboutUsText.length === FULL_ABOUT_US_TEXT.length && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 w-full">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm p-4 rounded-lg border border-blue-400/20">
                          <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 text-center">
                            500+
                          </div>
                          <div className="text-xs text-gray-400 text-center">
                            Robotics Trained
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm p-4 rounded-lg border border-blue-400/20">
                          <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 text-center">
                            50+
                          </div>
                          <div className="text-xs text-gray-400 text-center">
                            Tech Partners
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm p-4 rounded-lg border border-blue-400/20">
                          <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 text-center">
                            95%
                          </div>
                          <div className="text-xs text-gray-400 text-center">
                            Innovation Rate
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: "opacity 0.7s ease-out",
                    opacity: showContactCardsContent || showContactFormContent ? 1 : 0,
                    pointerEvents: showContactCardsContent || showContactFormContent ? "auto" : "none",
                    zIndex: 20,
                  }}
                >
                  <div className="mb-4 text-center md:text-left">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-md mb-4">
                      Connect Now
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-center md:text-left">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
                      Contact
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed text-center md:text-left max-w-md mx-auto md:mx-0">
                    Ready to transform your decision-making? Get in touch with us to explore how our AI/ML can revolutionise business strategy.
                  </p>

                  {/* Contact Cards Section */}
                  {showContactCardsContent && (
                    <div className="space-y-4 max-w-md mx-auto md:mx-0 mb-8">
                      {CONTACT_METHODS.map((info, index) => {
                        const delay = index * 0.2;
                        const shouldShow = contactCardsAnimationProgress > delay;
                        const itemProgress = Math.max(
                          0,
                          Math.min(1, (contactCardsAnimationProgress - delay) / 0.3)
                        );

                        return (
                          <motion.div
                            key={index}
                            className="flex items-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay }}
                          >
                            <span className="text-2xl mr-4">{info.icon}</span>
                            <div>
                              <h3 className="text-sm font-semibold text-gray-400">{info.label}:</h3>
                              <p className="text-base text-white">{info.value}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Contact Form Section */}
                  {showContactFormContent && (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 max-w-md mx-auto md:mx-0 w-full"
                    >
                      {["name", "email", "message"].map((field, index) => {
                        const delay = index * 0.2;
                        const shouldShow = contactFormAnimationProgress > delay;
                        const itemProgress = Math.max(
                          0,
                          Math.min(1, (contactFormAnimationProgress - delay) / 0.3)
                        );

                        return (
                          <motion.div
                            key={field}
                            initial={{ opacity: 0, y: 20 }}
                            animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay }}
                          >
                            {field === "message" ? (
                              <textarea
                                name="message"
                                value={contactFormData.message}
                                onChange={handleInputChange}
                                placeholder="Your Message"
                                rows={5}
                                className="w-full bg-transparent border border-gray-500/50 p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all duration-300"
                                required
                              />
                            ) : (
                              <input
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                value={contactFormData[field]}
                                onChange={handleInputChange}
                                placeholder={field === "name" ? "Your Full Name" : "Your Email"}
                                className="w-full bg-transparent border border-gray-500/50 p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all duration-300"
                                required
                              />
                            )}
                          </motion.div>
                        );
                      })}

                      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={
    contactFormAnimationProgress > 0.5
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 20 }
  }
  transition={{ duration: 0.5, delay: 0.6 }}
>
  <button type="submit" className="w-full sm:w-auto gradient-button">
    Send
  </button>
</motion.div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "900vh" }}></div>
        </div>
      </div>
    </>
  );
}