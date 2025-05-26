import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import Robot1 from "../assets/img/robot1.png";
import Robot2 from "../assets/img/robot2.png";
import Robot3 from "../assets/img/robot3.png";
import Robot4 from "../assets/img/robot4.png";

// Custom hook for throttling a callback
function useThrottledCallback(callback, delay) {
  const callbackRef = useRef(callback);
  const lastRanRef = useRef(0);
  const timeoutRef = useRef(null);

  // Update callbackRef when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Memoized throttled function
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

  // Cleanup timeout on unmount
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
    icon: "📱",
    title: "Android Automotive OS",
    description:
      "Master the complete Android Automotive development stack with hands-on projects and real-world applications.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: "🎨",
    title: "Advanced HMI Design",
    description:
      "Create stunning, intuitive user interfaces that enhance the driving experience with modern design principles.",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: "🐧",
    title: "Linux Programming",
    description:
      "Deep dive into Linux kernel development and system programming for automotive embedded systems.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: "🔧",
    title: "Real-world Projects",
    description:
      "Build production-ready applications with industry-standard tools and best practices.",
    gradient: "from-orange-400 to-red-500",
  },
  {
    icon: "🚗",
    title: "Vehicle Integration",
    description:
      "Learn to integrate with vehicle systems, sensors, and communication protocols seamlessly.",
    gradient: "from-indigo-400 to-purple-500",
  },
  {
    icon: "📊",
    title: "Analytics & Testing",
    description:
      "Implement comprehensive testing strategies and analytics to ensure robust automotive applications.",
    gradient: "from-teal-400 to-green-500",
  },
];

const CONTACT_METHODS = [
  {
    icon: "📧",
    title: "Email Us",
    description: "Get in touch for course inquiries",
    contact: "info@aalbot.com",
    gradient: "from-blue-400 to-cyan-500",
    action: "Send Email",
  },
  {
    icon: "📞",
    title: "Call Us",
    description: "Speak with our advisors",
    contact: "+1 (555) 123-4567",
    gradient: "from-green-400 to-emerald-500",
    action: "Call Now",
  },
  {
    icon: "💬",
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Available 24/7",
    gradient: "from-purple-400 to-pink-500",
    action: "Start Chat",
  },
  {
    icon: "📍",
    title: "Visit Us",
    description: "Come to our training center",
    contact: "123 Tech Valley, Silicon City",
    gradient: "from-orange-400 to-red-500",
    action: "Get Directions",
  },
];

export default function DeveloperLandingPage() {
  const [showFeaturesContent, setShowFeaturesContent] = useState(false);
  const [showAboutUsContent, setShowAboutUsContent] = useState(false);
  const [showContactContent, setShowContactContent] = useState(false);
  const [typedAboutUsText, setTypedAboutUsText] = useState("");
  const [robot1CurrentOpacity, setRobot1CurrentOpacity] = useState(1);
  const [robot2CurrentOpacity, setRobot2CurrentOpacity] = useState(0);
  const [robot3CurrentOpacity, setRobot3CurrentOpacity] = useState(0);
  const [robot4CurrentOpacity, setRobot4CurrentOpacity] = useState(0);
  const [featuresAnimationProgress, setFeaturesAnimationProgress] = useState(0);
  const [contactAnimationProgress, setContactAnimationProgress] = useState(0);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const robot1ImageRef = useRef(null);
  const robot2ImageRef = useRef(null);
  const robot3ImageRef = useRef(null);
  const robot4ImageRef = useRef(null);

  const [mouseClientPos, setMouseClientPos] = useState({ x: null, y: null });
  const [isRobotAreaHovered, setIsRobotAreaHovered] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentContactMethodIndex, setCurrentContactMethodIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    const INTRO_END_SCROLL = 1000;
    const FEATURES_START_SCROLL = INTRO_END_SCROLL + 400;
    const FEATURES_END_SCROLL = FEATURES_START_SCROLL + 800;
    const ABOUT_US_START_SCROLL = FEATURES_END_SCROLL + 400;
    const ABOUT_US_TYPING_END_SCROLL = ABOUT_US_START_SCROLL + 1000;
    const CONTACT_START_SCROLL = ABOUT_US_TYPING_END_SCROLL + 600;
    const CONTACT_END_SCROLL = CONTACT_START_SCROLL + 1000;
    const ROBOT_FADE_OUT_START_SCROLL = CONTACT_END_SCROLL + 400;

    // Features section logic
    if (
      currentScrollY > FEATURES_START_SCROLL &&
      currentScrollY <= FEATURES_END_SCROLL
    ) {
      if (!showFeaturesContent) {
        setShowFeaturesContent(true);
        setShowAboutUsContent(false);
        setShowContactContent(false);
      }
      const progress = Math.max(
        0,
        Math.min(
          1,
          (currentScrollY - FEATURES_START_SCROLL) /
            (FEATURES_END_SCROLL - FEATURES_START_SCROLL)
        )
      );
      setFeaturesAnimationProgress(progress);
    } else if (currentScrollY <= FEATURES_START_SCROLL) {
      setShowFeaturesContent(false);
      setFeaturesAnimationProgress(0);
    } else if (currentScrollY > FEATURES_END_SCROLL) {
      setFeaturesAnimationProgress(1);
    }

    // About Us section logic
    if (
      currentScrollY > ABOUT_US_START_SCROLL &&
      currentScrollY <= ABOUT_US_TYPING_END_SCROLL
    ) {
      if (!showAboutUsContent) {
        setShowAboutUsContent(true);
        setShowFeaturesContent(false);
        setShowContactContent(false);
        setTypedAboutUsText("");
      }
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (currentScrollY - ABOUT_US_START_SCROLL) /
            (ABOUT_US_TYPING_END_SCROLL - ABOUT_US_START_SCROLL)
        )
      );
      const charsToShow = Math.floor(
        scrollProgress * FULL_ABOUT_US_TEXT.length
      );
      const newTypedText = FULL_ABOUT_US_TEXT.substring(0, charsToShow);
      setTypedAboutUsText(newTypedText);
    } else if (currentScrollY > ABOUT_US_TYPING_END_SCROLL) {
      setShowAboutUsContent(true);
      setTypedAboutUsText(FULL_ABOUT_US_TEXT);
    } else if (currentScrollY <= ABOUT_US_START_SCROLL) {
      setShowAboutUsContent(false);
      setTypedAboutUsText("");
    }

    // Contact section logic
    if (
      currentScrollY > CONTACT_START_SCROLL &&
      currentScrollY <= CONTACT_END_SCROLL
    ) {
      if (!showContactContent) {
        setShowContactContent(true);
        setShowAboutUsContent(false);
        setShowFeaturesContent(false);
      }
      const progress = Math.max(
        0,
        Math.min(
          1,
          (currentScrollY - CONTACT_START_SCROLL) /
            (CONTACT_END_SCROLL - CONTACT_START_SCROLL)
        )
      );
      setContactAnimationProgress(progress);
    } else if (currentScrollY <= CONTACT_START_SCROLL) {
      setShowContactContent(false);
      setContactAnimationProgress(0);
    } else if (currentScrollY > CONTACT_END_SCROLL) {
      setContactAnimationProgress(1);
    }

    // Robot opacity logic
    let newRobot1Opacity = 0;
    let newRobot2Opacity = 0;
    let newRobot3Opacity = 0;
    let newRobot4Opacity = 0;

    // Hero Section: Robot1
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

    // Features Section: Robot2
    if (
      currentScrollY > INTRO_END_SCROLL &&
      currentScrollY <= FEATURES_END_SCROLL
    ) {
      if (currentScrollY > FEATURES_START_SCROLL) {
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

    // About Us Section: Robot3
    if (
      currentScrollY > FEATURES_END_SCROLL &&
      currentScrollY <= ABOUT_US_TYPING_END_SCROLL
    ) {
      if (currentScrollY > ABOUT_US_START_SCROLL) {
        newRobot3Opacity = 1;
      }
    } else if (
      currentScrollY > ABOUT_US_TYPING_END_SCROLL &&
      currentScrollY <= CONTACT_START_SCROLL
    ) {
      const fadeOutProgress =
        (currentScrollY - ABOUT_US_TYPING_END_SCROLL) /
        (CONTACT_START_SCROLL - ABOUT_US_TYPING_END_SCROLL);
      newRobot3Opacity = 1 - fadeOutProgress;
      newRobot4Opacity = fadeOutProgress;
    }

    // Contact Section: Robot4
    if (
      currentScrollY > ABOUT_US_TYPING_END_SCROLL &&
      currentScrollY <= CONTACT_END_SCROLL
    ) {
      if (currentScrollY > CONTACT_START_SCROLL) {
        newRobot4Opacity = 1;
      }
    } else if (
      currentScrollY > CONTACT_END_SCROLL &&
      currentScrollY <= ROBOT_FADE_OUT_START_SCROLL
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

    // Log for debugging
    console.log(
      `scrollY: ${currentScrollY}, robot1: ${newRobot1Opacity}, robot2: ${newRobot2Opacity}, robot3: ${newRobot3Opacity}, robot4: ${newRobot4Opacity}`
    );
  }, []);

  // Use the custom throttling hook
  const throttledHandleScroll = useThrottledCallback(handleScroll, 100);

  useEffect(() => {
    const html = document.documentElement;
    const originalMinHeight = html.style.minHeight;
    html.style.minHeight = "600vh";

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
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !showContactContent) return;

    const interval = setInterval(() => {
      setCurrentContactMethodIndex(
        (prev) => (prev + 1) % CONTACT_METHODS.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, showContactContent]);

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
    // Add form submission logic here
  };

  return (
    <>
      <style>
        {`
          /* Circuit background animation */
          .circuit-background {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 H20 L30,30 H50 L60,70 H80 L90,50 H100' fill='none' stroke='%2333ccff' stroke-width='0.5' opacity='0.2'/%3E%3Cpath d='M0,60 H25 L35,80 H55 L65,40 H85 L95,60 H100' fill='none' stroke='%2333ccff' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E");
            background-size: 200px 200px;
            animation: circuit-flow 20s linear infinite;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 5;
          }

          @keyframes circuit-flow {
            0% { background-position: 0 0; }
            100% { background-position: 200px 200px; }
          }

          /* Glowing particles */
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

          /* HUD overlay */
          .hud-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 7;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='hex' width='10' height='8.66' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='5,0 10,4.33 5,8.66 0,4.33' fill='none' stroke='%2333ccff' stroke-width='0.2' opacity='0.1'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23hex)'/%3E%3C/svg%3E");
            background-size: 50px 50px;
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
        `}
      </style>

      <div className="min-h-screen w-full bg-primary">
        {/* Unified Background Layer */}
        <div className="fixed inset-0 bg-primary z-0">


            
          {/* New Robotics Background Elements */}
          <div className="circuit-background"></div>
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

          {/* Original Background Overlay */}
          <div className="fixed inset-0 bg-black opacity-30 z-10 pointer-events-none">
            {/* Animated background pattern */}
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

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full text-white p-4 sm:p-8 max-w-7xl mx-auto min-h-screen">
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
              {/* Robot Section */}
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
                      ...getRobotMaskStyle(
                        robot1ImageRef,
                        robot1CurrentOpacity
                      ),
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
                      ...getRobotMaskStyle(
                        robot2ImageRef,
                        robot2CurrentOpacity
                      ),
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
                      ...getRobotMaskStyle(
                        robot3ImageRef,
                        robot3CurrentOpacity
                      ),
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
                      ...getRobotMaskStyle(
                        robot4ImageRef,
                        robot4CurrentOpacity
                      ),
                    }}
                    className="absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 relative h-full flex flex-col justify-center md:order-1 order-2">
                {/* Hero Section */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: "opacity 0.7s ease-in-out",
                    opacity:
                      !showFeaturesContent &&
                      !showAboutUsContent &&
                      !showContactContent
                        ? 1
                        : 0,
                    pointerEvents:
                      !showFeaturesContent &&
                      !showAboutUsContent &&
                      !showContactContent
                        ? "auto"
                        : "none",
                  }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-center md:text-left">
                    Build the
                    <span className="bg-gradient-to-r ml-2 from-blue-400 to-cyan-600 bg-clip-text text-transparent">
                      Future
                    </span>
                    <br />
                    of Robotics
                  </h1>

                  <h2 className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-400 mb-8 leading-tight max-w-lg text-center md:text-left mx-auto md:mx-0">
                    Master AI-driven robotics and automotive development with
                    cutting-edge HMI and Linux solutions. Create intelligent
                    systems that redefine mobility.
                  </h2>

                  <div className="flex flex-wrap gap-3 mb-8 text-sm text-gray-400 justify-center md:justify-start">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      AI Integration
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                      Robotic HMI Design
                    </span>
                    <span className llamó="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Real-time Processing
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue deluxe-400 to-cyan-600 hover:from-blue-500 hover:to-cyan-700 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Start Building Now
                    </button>
                    <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-blue-400/30 backdrop-blur-md bg-blue-50/25 flex items-center justify-center gap-3 hover:bg-blue-100/20 hover:border-blue-400/50 transition-all duration-300 group">
                      <svg
                        className="w-5 h-5 group-hover-blue-12 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch Demo</span>
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-blue-800/20 text-center md:text-left">
                    <p className="text-sm text-gray-500 mb-2">
                      Trusted by leading robotics innovators
                    </p>
                    <div className="flex items-center gap-6 opacity-60 justify-center md:justify-start">
                      <span className="text-xs font-medium">
                        BOSTON DYNAMICS
                      </span>
                      <span className="text-xs font-medium">iROBOT</span>
                      <span className="text-xs font-medium">NVIDIA</span>
                      <span className="text-xs font-medium">TESLA</span>
                    </div>

                  </div>
                </div>

                {/* Features Section */}
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
                      Robotics Features
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
                              className={`text-lg font-semibold mb-2 bg-gradient-to-r ${FEATURES_DATA[currentFeatureIndex].gradient} bg-clip-text text-transparent`}
                            >
                              {FEATURES_DATA[currentFeatureIndex].title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {FEATURES_DATA[currentFeatureIndex].description}
                            </p>
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
                        const delay = index * 0.15;
                        const shouldShow = featuresAnimationProgress > delay;
                        const itemProgress = Math.max(
                          0,
                          Math.min(1, (featuresAnimationProgress - delay) / 0.3)
                        );

                        return (
                          <div
                            key={index}
                            className={`bg-gray-900/50 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:bg-gray-800/30 hover:border-blue-600/30 transition-all duration-500 transform ${
                              shouldShow
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                            }`}
                            style={{
                              transitionDelay: `${delay}s`,
                              transform: `translateY(${
                                (1 - itemProgress) * 32
                              }px)`,
                              opacity: itemProgress,
                            }}
                            role="listitem"
                            aria-label={`Feature: ${feature.title}`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 rounded-lg bg-gray-800/25 flex items-start gap-3 flex-shrink-0`}
                              >
                                {feature.icon}
                              </div>
                              <div className="flex-1">
                                <h3
                                  className={`text-lg font-semibold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                                >
                                  {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  {feature.description}
                                </p>
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

                {/* About Us Section */}
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

                {/* Contact Section */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transition: "opacity 0.7s ease-out",
                    opacity: showContactContent ? 1 : 0,
                    pointerEvents: showContactContent ? "auto" : "none",
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
                      Contact Us
                    </span>
                  </h1>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 max-w-md mx-auto md:mx-0 w-full"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={contactFormData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="bg-white/5 border border-blue-400/30 backdrop-blur-sm p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        value={contactFormData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="bg-white/5 border border-blue-400/30 backdrop-blur-sm p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        required
                      />
                    </div>

                    <input
                      type="text"
                      name="course"
                      value={contactFormData.course}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className="w-full bg-white/5 border border-blue-400/30 backdrop-blur-sm p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />

                    <textarea
                      name="message"
                      value={contactFormData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows={5}
                      className="w-full bg-white/5 border border-blue-400/30 backdrop-blur-sm p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      required
                    ></textarea>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 hover:from-blue-600 hover:to-cyan-700 transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer to ensure scrollability */}
          <div style={{ height: "600vh" }}></div>
        </div>
      </div>
    </>
  );
}
