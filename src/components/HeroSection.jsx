import React, { useRef } from "react";
import { Modal, ModalTrigger, ModalBody, ModalContent } from "./ui/animated-modal";
import Video from "../assets/videos/robotVideo.mp4";
import { motion } from "framer-motion";
import Robot1 from "../assets/img/robot/1.png";
// import WhatsAppIcon from "../assets/icons/whatsapp.svg";
// import PlayIcon from "../assets/icons/watch.svg";

export default function HeroSection({ setMouseClientPos, setIsRobotAreaHovered, mouseClientPos, isRobotAreaHovered }) {
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
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        transition: "mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out",
      };
    }
    const defaultMask = `linear-gradient(to bottom, rgba(255,255,255,1) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,1) 200%)`;
    return {
      WebkitMaskImage: defaultMask,
      maskImage: defaultMask,
      transition: "mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out",
    };
  };

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto h-full min-h-screen  sm:py-12 lg:py-16">
        
        {/* Robot Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative w-36 h-36 xs:w-72 xs:h-72 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] 2xl:w-[500px] 2xl:h-[500px]">
            <motion.img
              ref={robotImageRef}
              src={Robot1}
              alt="Robot 1 - Hero Section"
              onMouseMove={handleRobotMouseMove}
              onMouseLeave={handleRobotMouseLeave}
              style={getRobotMaskStyle()}
              className="absolute inset-0 w-full h-full object-contain cursor-pointer"
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 lg:pr-8 xl:pr-12"
        >
          {/* Main Title */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-2 leading-tight text-center lg:text-left">
            <span className="text-pink-400">A HOUSE ROBO</span>
          </h1>

         

          {/* Secondary Title */}
          <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 sm:mb-6 leading-tight text-center lg:text-left">
            Sleek, Smart, and Full of Personality
          </h3>

          {/* Description */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-base xl:text-lg 2xl:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0">
            It is designed to be both a high-tech helper and a source of joy in your home.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 w-full max-w-md mx-auto lg:mx-0">
            <a
              href="https://wa.me/9072502065"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-button flex-1 sm:flex-none whitespace-nowrap flex items-center justify-center text-center"
            >
              Contact on WhatsApp
              {/* <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" /> */}
            </a>
            
            <Modal className="bg-primary flex-1 sm:flex-none">
              <ModalTrigger className="gradient-button-secondary w-full whitespace-nowrap flex items-center justify-center text-center">
                Watch Demo
                {/* <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" /> */}
              </ModalTrigger>
              <ModalBody className="bg-primary rounded-lg shadow-lg border border-[#030d38] p-0 sm:p-0">
                <ModalContent className="bg-gradient-to-br from-[#030d38] to-pink-900/50 w-full h-full">
                  <div className="flex justify-center items-center w-full h-full">
                    <video
                      autoPlay
                      loop
                      muted
                      controls
                      className="w-full h-full object-contain rounded-lg border-2 border-[#030d38] shadow-md"
                      aria-label="Kammani demo video"
                    >
                      <source src={Video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </ModalContent>
              </ModalBody>
            </Modal>
          </div>
        </motion.div>
      </div>
    </div>
  );
}