import React from "react";
import { FEATURES_DATA } from "./constants";

export default function FeaturesSection({ show, isMobile, currentFeatureIndex, animationProgress }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "opacity 0.7s ease-in-out",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto" role="list">
          {FEATURES_DATA.slice(currentFeatureIndex, currentFeatureIndex + 2).map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-600/20 hover:border-blue-600/30 hover:bg-gray-800/70 transition-all duration-700 transform opacity-0 scale-95"
              style={{
                animation: `fadeInScale 0.7s ease-in-out ${index * 0.3}s forwards`,
              }}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto md:mx-0" role="list">
          {FEATURES_DATA.map((feature, index) => {
            const delay = index * 0.2;
            const shouldShow = animationProgress > delay;
            const itemProgress = Math.max(0, Math.min(1, (animationProgress - delay) / 0.3));

            return (
              <div
                key={index}
                className={`bg-gray-900/50 backdrop-blur-md p-4 rounded-xl border border-blue-600/20 hover:bg-gray-800/30 hover:border-blue-600/30 transition-all duration-700 transform ${
                  shouldShow ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${delay}s`,
                  transform: `translateY(${(1 - itemProgress) * 48}px)`,
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
      {animationProgress > 0.8 && (
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
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}