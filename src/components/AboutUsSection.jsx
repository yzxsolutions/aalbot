import React, { useRef } from "react";
import { ABOUT_US_HEADING, FULL_ABOUT_US_TEXT } from "./Constants";
import { motion } from "framer-motion";
import Robot3 from "../assets/img/robot/3.png";

export default function AboutUsSection({
  setMouseClientPos,
  setIsRobotAreaHovered,
  mouseClientPos,
  isRobotAreaHovered,
}) {
  const robotImageRef = useRef(null);

  const handleRobotMouseMove = (e) => {
    setMouseClientPos({ x: e.clientX, y: e.clientY });
    setIsRobotAreaHovered(true);
  };

  const handleRobotMouseLeave = () => {
    setIsRobotAreaHovered(false);
    setMouseClientPos({ x: null, y: null });
  };

  const handleRobotTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      setMouseClientPos({ x: touch.clientX, y: touch.clientY });
      setIsRobotAreaHovered(true);
    }
  };

  const handleRobotTouchEnd = () => {
    setIsRobotAreaHovered(false);
    setMouseClientPos({ x: null, y: null });
  };

  const getRobotMaskStyle = () => {
    const isMobile = window.innerWidth < 768;
    if (
      isRobotAreaHovered &&
      mouseClientPos.x !== null &&
      mouseClientPos.y !== null &&
      robotImageRef.current
    ) {
      const imageRect = robotImageRef.current.getBoundingClientRect();
      const localMouseX = mouseClientPos.x - imageRect.left;
      const localMouseY = mouseClientPos.y - imageRect.top;
      const radius = isMobile ? 80 : 100;
      const fadeOutRadius = isMobile ? 200 : 250;
      const maskPosition = `${localMouseX}px ${localMouseY}px`;
      const gradient = `radial-gradient(circle at ${maskPosition}, rgba(255,255,255,1) ${radius}px, rgba(255,255,255,0.5) ${fadeOutRadius}px)`;
      return {
        WebkitMaskImage: gradient,
        maskImage: gradient,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out',
      };
    }
    const defaultMask = `linear-gradient(to bottom, rgba(255,255,255,1) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,1) 200%)`;
    return {
      WebkitMaskImage: defaultMask,
      maskImage: defaultMask,
      transition: 'mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
    };
  };

  const stats = [
    { value: "500+", label: "Robotics Trained" },
    { value: "50+", label: "Tech Partners" },
    { value: "95%", label: "Innovation Rate" },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center w-full py-4 sm:py-6 relative">
      {/* Background Robot Image for Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="sm:hidden absolute inset-0 flex justify-center items-center z-0"
      >
        <div className="relative w-[400px] h-[400px] max-w-[90vw] max-h-[90vh]">
          <motion.img
            ref={robotImageRef}
            src={Robot3}
            alt="Robot 3 - About Us Section"
            onMouseMove={handleRobotMouseMove}
            onMouseLeave={handleRobotMouseLeave}
            onTouchMove={handleRobotTouchMove}
            onTouchEnd={handleRobotTouchEnd}
            style={getRobotMaskStyle()}
            className="w-full h-full object-contain cursor-pointer"
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center w-full max-w-[95%] sm:max-w-[90%] md:max-w-5xl lg:max-w-6xl mx-auto gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
        {/* Robot Image for sm and Above */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden sm:flex w-full sm:w-2/5 justify-center"
        >
          <div className="relative w-[300px] sm:w-[350px] md:w-[450px] lg:w-[550px] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] max-w-[90vw] sm:max-h-[60vh]">
            <motion.img
              ref={robotImageRef}
              src={Robot3}
              alt="Robot 3 - About Us Section"
              onMouseMove={handleRobotMouseMove}
              onMouseLeave={handleRobotMouseLeave}
              onTouchMove={handleRobotTouchMove}
              onTouchEnd={handleRobotTouchEnd}
              style={getRobotMaskStyle()}
              className="w-full h-full object-contain cursor-pointer"
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full sm:w-3/5 flex flex-col justify-center items-center sm:items-start rounded-xl p-4 sm:p-6 md:p-8"
        >
          <div className="mb-2 sm:mb-3 text-center sm:text-left">
            <span className="inline-block px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-full mb-2 sm:mb-3">
              Our Vision
            </span>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 leading-tight text-center sm:text-left">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              {ABOUT_US_HEADING}
            </span>
          </h1>
          <div className="space-y-3 sm:space-y-4 w-full flex flex-col items-center sm:items-start">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-center sm:text-left">
              {FULL_ABOUT_US_TEXT}
            </p>
            {/* Marquee for Stats */}
            <div className="w-full overflow-hidden pt-3 sm:pt-4">
              <div className="marquee-left-to-right flex items-center gap-2 sm:gap-3 py-1 sm:py-2">
                <div className="marquee-content flex items-center gap-2 sm:gap-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={`stat-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                      className={`bg-gradient-to-br ${
                        index === 0
                          ? 'from-blue-500/20 to-cyan-500/20'
                          : index === 1
                          ? 'from-cyan-600/20 to-blue-600/20'
                          : 'from-green-500/20 to-blue-500/20'
                      } backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-blue-400/20 flex-shrink-0 w-[120px] sm:w-[140px] md:w-[160px]`}
                    >
                      <div className="text-base sm:text-lg md:text-xl font-bold text-blue-400 mb-1 text-center">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 text-center">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {stats.map((stat, index) => (
                    <motion.div
                      key={`stat-dup-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                      className={`bg-gradient-to-br ${
                        index === 0
                          ? 'from-blue-500/20 to-cyan-500/20'
                          : index === 1
                          ? 'from-cyan-600/20 to-blue-600/20'
                          : 'from-green-500/20 to-blue-500/20'
                      } backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-blue-400/20 flex-shrink-0 w-[120px] sm:w-[140px] md:w-[160px]`}
                    >
                      <div className="text-base sm:text-lg md:text-xl font-bold text-blue-400 mb-1 text-center">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 text-center">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          .marquee-left-to-right .marquee-content {
            display: flex;
            animation: marquee-left-to-right 10s linear infinite;
          }
          @keyframes marquee-left-to-right {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-left-to-right:hover .marquee-content {
            animation-play-state: paused;
          }
          @media (max-width: 640px) {
            .marquee-left-to-right .marquee-content > div {
              width: 100px !important;
              padding: 1.5px !important;
            }
            .marquee-left-to-right .marquee-content > div .text-base {
              font-size: 0.875rem !important;
            }
            .marquee-left-to-right .marquee-content > div .text-[10px] {
              font-size: 0.625rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}