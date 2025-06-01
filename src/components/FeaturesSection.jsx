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
      const radius = 100;
      const fadeOutRadius = 250;
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
    <div className="min-h-screen flex flex-col items-center justify-center py-16 w-full">
      <div
        className={`flex ${
          isMobile ? 'flex-col' : 'flex-row'
        } items-center justify-center w-full max-w-screen-xl mx-auto gap-24 px-4`}
      >
        {/* Robot Image - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-full ${isMobile ? 'max-w-md mx-auto mb-8' : 'md:w-2/5'} flex justify-center`}
        >
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-[400px] h-64 sm:h-72 md:h-80 lg:h-[500px]">
            <motion.img
              ref={robotImageRef}
              src={Robot2}
              alt="Robot 2 - Features Section"
              onMouseMove={handleRobotMouseMove}
              onMouseLeave={handleRobotMouseLeave}
              style={getRobotMaskStyle()}
              className="w-full h-full object-contain cursor-pointer"
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Content - Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-full ${isMobile ? 'max-w-md mx-auto' : 'md:w-3/5'} flex flex-col justify-center items-center md:items-start`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto" role="list">
              {FEATURES_DATA.slice(currentFeatureIndex, currentFeatureIndex + 2).map(
                (feature, index) => (
                  <motion.div
                    key={`${feature.title}-${index}`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: index * 0.3, ease: "easeOut" }}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-700"
                    role="listitem"
                    aria-label={`Feature: ${feature.title}`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`text-3xl bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent p-2 rounded-lg bg-gray-800/25 flex-shrink-0`}
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
                  </motion.div>
                )
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full" role="list">
              {FEATURES_DATA.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                  className="bg-gray-900/50 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:bg-gray-800/30 hover:border-blue-600/30 transition-all duration-700"
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
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}