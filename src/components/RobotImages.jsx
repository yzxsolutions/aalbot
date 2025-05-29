import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import Robot1 from '../assets/img/robot/1.png';
import Robot2 from '../assets/img/robot/2.png';
import Robot3 from '../assets/img/robot/3.png';
import Robot4 from '../assets/img/robot/4.png';

export default function RobotImages({
  robot1Opacity,
  robot2Opacity,
  robot3Opacity,
  robot4Opacity,
  setMouseClientPos,
  setIsRobotAreaHovered,
  mouseClientPos,
  isRobotAreaHovered,
}) {
  const robot1ImageRef = useRef(null);
  const robot2ImageRef = useRef(null);
  const robot3ImageRef = useRef(null);
  const robot4ImageRef = useRef(null);

  // Determine the active robot based on highest opacity
  const activeRobot = useMemo(() => {
      const opacities = [
        { id: 1, opacity: robot1Opacity, ref: robot1ImageRef },
        { id: 2, opacity: robot2Opacity, ref: robot2ImageRef },
        { id: 3, opacity: robot3Opacity, ref: robot3ImageRef },
        { id: 4, opacity: robot4Opacity, ref: robot4ImageRef },
      ];
      // Find the robot with the highest opacity (threshold > 0.04 to avoid flicker)
      return opacities.reduce((max, current) =>
        current.opacity > max.opacity && current.opacity > 0.04 ? current : max,
        { id: 1, opacity: 0, ref: robot1ImageRef }
      );
    }, [robot1Opacity, robot2Opacity, robot3Opacity, robot4Opacity]);

  const handleRobotMouseMove = (e) => {
    setMouseClientPos({ x: e.clientX, y: e.clientY });
    setIsRobotAreaHovered(true);
  };

  const handleRobotMouseLeave = () => {
    setIsRobotAreaHovered(false);
    setMouseClientPos({ x: null, y: null });
  };

  const getRobotMaskStyle = (imageRef, isActive) => {
    if (
      isActive &&
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

  const robots = [
    {
      id: 1,
      src: Robot1,
      alt: 'Robot 1 - Hero Section',
      ref: robot1ImageRef,
      opacity: robot1Opacity,
    },
    {
      id: 2,
      src: Robot2,
      alt: 'Robot 2 - Features Section',
      ref: robot2ImageRef,
      opacity: robot2Opacity,
    },
    {
      id: 3,
      src: Robot3,
      alt: 'Robot 3 - About Us Section',
      ref: robot3ImageRef,
      opacity: robot3Opacity,
    },
    {
      id: 4,
      src: Robot4,
      alt: 'Robot 4 - Contact Section',
      ref: robot4ImageRef,
      opacity: robot4Opacity,
    },
  ];

  return (
    <div className="w-full flex justify-center md:justify-end items-start mb-2 md:mb-12 md:mb-0 md:order-2 order-1 lg:relative absolute">
      <div className="relative w-64 sm:w-72 md:w-96 lg:w-[500px] h-64 sm:h-72 md:h-96 lg:h-[600px]">
        {robots.map((robot) => (
          <motion.img
            key={robot.id}
            ref={robot.ref}
            src={robot.src}
            alt={robot.alt}
            onMouseMove={handleRobotMouseMove}
            onMouseLeave={handleRobotMouseLeave}
            style={{
              ...getRobotMaskStyle(robot.ref, activeRobot.id === robot.id),
              display: activeRobot.id === robot.id ? 'block' : 'none',
              // Map opacity (0 to 1) to rotateY (90° to 0°)
              rotateY: 90 - robot.opacity * 90,
            }}
            className="absolute inset-0 w-full h-full object-contain cursor-pointer"
            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}