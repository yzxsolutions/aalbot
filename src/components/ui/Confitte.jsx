"use client";
 
import React, { useRef } from "react";
import { cn } from "../../lib/utils";
import confetti from "canvas-confetti";
 
export function ConfettiButton({
  className,
  children,
  angle = 90,
  particleCount = 75,
  startVelocity = 35,
  spread = 70,
  onClick,
  ...props
}) {
  const buttonRef = useRef(null);
 
  const handleClick = (event) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      confetti({
        particleCount,
        startVelocity,
        angle,
        spread,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }
    if (onClick) {
      onClick(event);
    }
  };
 
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        " h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}