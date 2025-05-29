 import React from "react";
import { motion } from "framer-motion";
import { CONTACT_METHODS } from "./constants";

export default function ContactSection({
  showCards,
  showForm,
  cardsAnimationProgress,
  formAnimationProgress,
  formData,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "opacity 0.7s ease-out",
        opacity: showCards || showForm ? 1 : 0,
        pointerEvents: showCards || showForm ? "auto" : "none",
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
          Contact
        </span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed text-center md:text-left max-w-md mx-auto md:mx-0">
        Ready to transform your decision-making? Get in touch with us to explore how our AI/ML can revolutionise business strategy.
      </p>
      {showCards && (
        <div className="space-y-4 max-w-sm md:mx-0  mb-8">
          {CONTACT_METHODS.map((info, index) => {
            const delay = index * 0.2;
            const shouldShow = cardsAnimationProgress > delay;
            const itemProgress = Math.max(0, Math.min(1, (cardsAnimationProgress - delay) / 0.3));

            return (
              <motion.div
                key={index}
                className="flex items-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20"
                initial={{ opacity: 0, y: 20 }}
                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay }}
              >
                <span className="text-2xl mr-4">{info.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400">{info.label}:</h3>
                  <p className="text-base text-white">{info.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto md:mx-0 w-full">
          {["name", "email", "message"].map((field, index) => {
            const delay = index * 0.2;
            const shouldShow = formAnimationProgress > delay;
            const itemProgress = Math.max(0, Math.min(1, (formAnimationProgress - delay) / 0.3));

            return (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay }}
              >
                {field === "message" ? (
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full bg-transparent border border-gray-500/50 p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all duration-300"
                    required
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={field === "name" ? "Your Full Name" : "Your Email"}
                    className="w-full bg-transparent border border-gray-500/50 p-3 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all duration-300"
                    required
                  />
                )}
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formAnimationProgress > 0.5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button type="submit" className="w-full sm:w-auto gradient-button">
              Send
            </button>
          </motion.div>
        </form>
      )}
    </div>
  );
}