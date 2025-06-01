import React, { useRef } from "react";
import { ABOUT_US_HEADING, FULL_ABOUT_US_TEXT } from "./Constants";
import { motion } from "framer-motion"; // Corrected import
import Robot3 from "../assets/img/robot/3.png"; // Adjusted path

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
    <div className="min-h-screen flex flex-col items-center justify-center w-full py-16">
      <div
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-xl mx-auto gap-24 px-4"
      >
        {/* Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-3/5 flex flex-col justify-center items-center md:items-start"
        >
          <div className="mb-4 text-center md:text-left">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-full mb-4">
              Our Vision
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-center md:text-left">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              {ABOUT_US_HEADING}
            </span>
          </h1>
          <div className="space-y-6 max-w-lg w-full flex flex-col items-center md:items-start">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed min-h-[150px] text-center md:text-left">
              {FULL_ABOUT_US_TEXT}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 w-full">
              {[
                { value: "500+", label: "Robotics Trained" },
                { value: "50+", label: "Tech Partners" },
                { value: "95%", label: "Innovation Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                  className={`bg-gradient-to-br ${
                    index === 0
                      ? 'from-blue-500/20 to-cyan-500/20'
                      : index === 1
                      ? 'from-cyan-600/20 to-blue-600/20'
                      : 'from-green-500/20 to-blue-500/20'
                  } backdrop-blur-sm p-4 rounded-lg border border-blue-400/20`}
                >
                  <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 text-center">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 text-center">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Robot Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} // Slide in from right
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-2/5 flex justify-center mt-8 md:mt-0"
        >
          <div className="relative w-64 sm:w-72 md:w-[500px] lg:w-[400px] h-64 sm:h-72 md:h-80 lg:h-[500px]">
            <motion.img
              ref={robotImageRef}
              src={Robot3}
              alt="Robot 3 - About Us Section"
              onMouseMove={handleRobotMouseMove}
              onMouseLeave={handleRobotMouseLeave}
              style={getRobotMaskStyle()}
              className="w-full h-full object-contain cursor-pointer"
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}