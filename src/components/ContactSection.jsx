import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { CONTACT_METHODS } from "./Constants";

export default function ContactSection({
  showCards,
  showForm,
  cardsAnimationProgress,
  formAnimationProgress,
  formData,
  handleInputChange,
  handleSubmit,
}) {
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useRef(null);

  // Validation function
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s-]+$/.test(value)) return "Name can only contain letters, spaces, or hyphens";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          return "Please enter a valid email address";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        if (value.length > 500) return "Message cannot exceed 500 characters";
        return "";
      default:
        return "";
    }
  };

  // Handle input changes with validation
  const handleChangeWithValidation = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Validate on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Check form validity
  const isFormValid = !Object.values(formErrors).some((error) => error) &&
                     Object.values(formData).every((value) => value.trim());

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    // Get button position
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsSubmitting(true);
  };

  // Reset form and show success
  const onAnimationComplete = () => {
    handleSubmit({ preventDefault: () => {} });
    setFormErrors({ name: "", email: "", message: "" });
    handleInputChange({ target: { name: "name", value: "" } });
    handleInputChange({ target: { name: "email", value: "" } });
    handleInputChange({ target: { name: "message", value: "" } });
    setShowSuccess(true);
    setIsSubmitting(false);
    setButtonRect(null);
    setTimeout(() => setShowSuccess(false), 3000);
  };

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
        <div className="space-y-4 max-w-sm md:mx-0 mb-8">
          {CONTACT_METHODS.map((info, index) => {
            const delay = index * 0.2;
            const shouldShow = cardsAnimationProgress > delay;
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
        <form onSubmit={handleFormSubmit} className="space-y-6 max-w-md mx-auto md:mx-0 w-full relative">
          {["name", "email", "message"].map((field, index) => {
            const delay = index * 0.2;
            const shouldShow = formAnimationProgress > delay;
            const isInvalid = !!formErrors[field];
            const isValid = formData[field]?.trim() && !formErrors[field];

            return (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay }}
                className="relative"
              >
                {field === "message" ? (
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChangeWithValidation}
                    onBlur={handleBlur}
                    placeholder="Your Message"
                    rows={5}
                    className={`
                      w-full bg-transparent border p-3 rounded-lg text-gray-200 placeholder-gray-500
                      focus:outline-none transition-all duration-300
                      ${isInvalid ? "border-red-500" : isValid ? "border-green-500" : "border-gray-500/50"}
                    `}
                    required
                    aria-invalid={isInvalid}
                    aria-describedby={`error-${field}`}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChangeWithValidation}
                    onBlur={handleBlur}
                    placeholder={field === "name" ? "Your Full Name" : "Your Email"}
                    className={`
                      w-full bg-transparent border p-3 rounded-lg text-gray-200 placeholder-gray-500
                      focus:outline-none transition-all duration-300
                      ${isInvalid ? "border-red-500" : isValid ? "border-green-500" : "border-gray-500/50"}
                    `}
                    required
                    aria-invalid={isInvalid}
                    aria-describedby={`error-${field}`}
                  />
                )}
                {isInvalid && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs mt-1 absolute left-0"
                    id={`error-${field}`}
                  >
                    {formErrors[field]}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formAnimationProgress > 0.5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative"
          >
            <button
              type="submit"
              ref={buttonRef}
              className={`w-full sm:w-auto gradient-button flex items-center justify-center gap-2 ${
                !isFormValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isFormValid || isSubmitting}
              aria-disabled={!isFormValid || isSubmitting}
              aria-busy={isSubmitting}
            >
              <Send className="w-5 h-5" />
              Send
            </button>
            <AnimatePresence>
              {isSubmitting && buttonRect && (
                <motion.svg
                  initial={{
                    x: buttonRect.x - 12, // Center on button
                    y: buttonRect.y - 12,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: window.innerWidth, // Top-right corner
                    y: -window.innerHeight,
                    scale: 2,
                    rotate: 45,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    times: [0, 0.8, 1],
                  }}
                  onAnimationComplete={onAnimationComplete}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className="absolute"
                  style={{ filter: "drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))" }}
                  aria-hidden="true"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </motion.svg>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-500 text-sm mt-2 text-center"
                  role="alert"
                >
                  Message sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </form>
      )}
    </div>
  );
}