import React from "react";
import { ABOUT_US_HEADING, FULL_ABOUT_US_TEXT } from "./Constants";

export default function AboutUsSection({ show, typedText }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "opacity 0.3s ease-in-out",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
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
          {typedText}
          {typedText !== FULL_ABOUT_US_TEXT && <span className="animate-pulse">|</span>}
        </p>
        {typedText.length === FULL_ABOUT_US_TEXT.length && (
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
  );
}