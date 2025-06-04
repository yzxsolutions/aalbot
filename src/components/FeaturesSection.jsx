import React, { useRef } from "react";
import { FEATURES_DATA } from "./Constants";
import { motion } from "framer-motion";
import Robot2 from "../assets/img/robot/2.png";

export default function FeaturesSection({
  isMobile,
  currentFeatureIndex,
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

  return (
    <div className="h-full flex flex-col items-center justify-start mt-20 md:justify-center py-3 sm:py-5 w-full">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-[95%] sm:max-w-[90%] md:max-w-5xl lg:max-w-6xl mx-auto gap-4 sm:gap-5 md:gap-6">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-3/5 flex flex-col items-center md:items-start"
        >
         
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight text-center md:text-left">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              Core Features
            </span>
          </h1>

          {/* Marquee Container */}
          <div className="w-full overflow-hidden">
            {/* First Row: Left to Right */}
            <div className="hidden md:flex marquee-left-to-right  items-center gap-4 sm:gap-6 py-1 sm:py-2">
              <div className="marquee-content flex items-center gap-4 sm:gap-6">
                {FEATURES_DATA.map((feature, index) => (
                  <motion.div
                    key={`left-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-700 flex-shrink-0 w-[350px] sm:w-[400px] md:w-[450px] h-[80px] sm:h-[100px]"
                    role="listitem"
                   
                    aria-label={`Feature: ${feature.title}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 h-full">
                      <div
                        className={`text-xl sm:text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 sm:p-3 rounded-lg bg-gray-800/25 flex-shrink-0`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 flex items-center">
                        <h3
                          className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Duplicate for seamless loop */}
                {FEATURES_DATA.map((feature, index) => (
                  <motion.div
                    key={`left-dup-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-700 flex-shrink-0 w-[350px] sm:w-[400px] md:w-[450px] h-[80px] sm:h-[100px]"
                    role="listitem"
                    aria-label={`Feature: ${feature.title}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 h-full">
                      <div
                        className={`text-xl sm:text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 sm:p-3 rounded-lg bg-gray-800/25 flex-shrink-0`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 flex items-center">
                        <h3
                          className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Second Row: Right to Left */}
            <div className="marquee-right-to-left flex items-center gap-4 sm:gap-6 py-1 sm:py-2">
              <div className="marquee-content flex items-center gap-4 sm:gap-6">
                {FEATURES_DATA.map((feature, index) => (
                  <motion.div
                    key={`right-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-700 flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] h-[80px] sm:h-[100px]"
                    role="listitem"
                    aria-label={`Feature: ${feature.title}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 h-full">
                      <div
                        className={`text-xl sm:text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 sm:p-3 rounded-lg bg-gray-800/25 flex-shrink-0`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 flex items-center">
                        <h3
                          className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Duplicate for seamless loop */}
                {FEATURES_DATA.map((feature, index) => (
                  <motion.div
                    key={`right-dup-${index}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-700 flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] h-[80px] sm:h-[100px]"
                    role="listitem"
                    aria-label={`Feature: ${feature.title}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 h-full">
                      <div
                        className={`text-xl sm:text-2xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 sm:p-3 rounded-lg bg-gray-800/25 flex-shrink-0`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 flex items-center">
                        <h3
                          className={`text-base sm:text-lg font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                        >
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Robot Image */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-2/5 flex justify-center mt-10 sm:mt-5 md:mt-0"
        >
          <div className="relative w-[150px] sm:w-[380px] md:w-[350px] lg:w-[450px] h-[300px] sm:h-[380px] md:h-[350px] lg:h-[450px] max-w-[90vw] md:max-h-[60vh]">
            <motion.img
              ref={robotImageRef}
              src={Robot2}
              alt="Robot 2 - Features Section"
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
      </div>

      <style>
        {`
          .marquee-left-to-right .marquee-content {
            display: flex;
            animation: marquee-left-to-right 20s linear infinite;
          }
          @keyframes marquee-left-to-right {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-right-to-left .marquee-content {
            display: flex;
            animation: marquee-right-to-left 20s linear infinite;
          }
          @keyframes marquee-right-to-left {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-left-to-right:hover .marquee-content,
          .marquee-right-to-left:hover .marquee-content {
            animation-play-state: paused;
          }
          @media (max-width: 640px) {
            .marquee-left-to-right .marquee-content,
            .marquee-right-to-left .marquee-content {
              gap: 12px !important;
            }
            .marquee-left-to-right .marquee-content > div {
              width: 220px !important;
              height: 60px !important;
              padding: 3px !important;
            }
            .marquee-right-to-left .marquee-content > div {
              width: 200px !important;
              height: 60px !important;
              padding: 3px !important;
            }
            .marquee-left-to-right .marquee-content > div .text-xl,
            .marquee-right-to-left .marquee-content > div .text-xl {
              font-size: 1.125rem !important;
              padding: 2px !important;
            }
            .marquee-left-to-right .marquee-content > div .text-base,
            .marquee-right-to-left .marquee-content > div .text-base {
              font-size: 0.875rem !important;
            }
            .marquee-left-to-right .marquee-content > div .gap-4,
            .marquee-right-to-left .marquee-content > div .gap-4 {
              gap: 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
}