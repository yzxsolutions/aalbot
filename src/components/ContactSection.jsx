import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { CONTACT_METHODS } from "./Constants";
import Robot4 from "../assets/img/robot/4.png";

export default function ContactSection({
  formData,
  handleInputChange,
  handleSubmit,
  setMouseClientPos,
  setIsRobotAreaHovered,
  mouseClientPos,
  isRobotAreaHovered,
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
  const robotImageRef = useRef(null);

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

  const handleChangeWithValidation = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const isFormValid =
    !Object.values(formErrors).some((error) => error) &&
    Object.values(formData).every((value) => value.trim());

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setIsSubmitting(true);
  };

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


  const scrollRef = useRef(null);

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full  min-h-[700px] md:min-h-[800px] animate-gradient-shift">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-xl mx-auto gap-20 md:gap-40 px-4 sm:px-6">
        {/* Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-3/5 flex flex-col items-center md:items-start"
        >
          <div className="mb-6 text-center md:text-left">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-700 text-white rounded-md">
              Connect Now
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 leading-tight text-center md:text-left">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-2 leading-relaxed text-center md:text-left max-w-lg">
            Ready to transform your decision-making? Get in touch with us to explore how our AI/ML can revolutionise business strategy.
          </p>
          {/* <div className="w-full max-w-lg ">
            <div
              className="flex flex-row space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {CONTACT_METHODS.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.2 }}
                  className="flex items-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20 hover:border-blue-400/30 hover:scale-105 hover:shadow-lg transition-all duration-300 flex-shrink-0 w-64 snap-center"
                >
                  <span className="text-2xl mr-4">{info.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400">{info.label}:</h3>
                    <p className="text-base text-white">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div> */}


          <div className="w-[600px] mx-auto">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        {CONTACT_METHODS.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.2,
            }}
            className="flex items-center bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20 hover:border-blue-400/30 hover:scale-105 hover:shadow-lg transition-all duration-300 flex-shrink-0 w-64 snap-center"
          >
            <span className="text-2xl mr-4">{info.icon}</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">
                {info.label}:
              </h3>
              <p className="text-base text-white">{info.value}</p>
            </div>
          </motion.div>
        ))}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
          <form onSubmit={handleFormSubmit} className="space-y-4 max-w-lg w-full min-h-[400px]">
            {["name", "email", "message"].map((field, index) => {
              const isInvalid = !!formErrors[field];
              const isValid = formData[field]?.trim() && !formErrors[field];
              return (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.2 }}
                  className="relative pb-6"
                >
                  {field === "message" ? (
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChangeWithValidation}
                      onBlur={handleBlur}
                      placeholder="Your Message"
                      rows={2}
                      className={`
                        w-full bg-transparent border p-3 rounded-lg text-gray-200 placeholder-gray-500 text-base
                        focus:outline-none focus:ring-2 focus:ring-blue-500 hover:-translate-y-1 hover:shadow-md transition-all duration-300
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
                        w-full bg-transparent border p-3 rounded-lg text-gray-200 placeholder-gray-500 text-base
                        focus:outline-none focus:ring-2 focus:ring-blue-500 hover:-translate-y-1 hover:shadow-md transition-all duration-300
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
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
              className="relative"
            >
              <button
                type="submit"
                ref={buttonRef}
                className={`
                  w-full sm:w-auto gradient-button flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                  ${!isFormValid || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:scale-105 transition-all duration-300"}
                `}
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
                      x: buttonRect.x - 12,
                      y: buttonRect.y - 12,
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: window.innerWidth,
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
        </motion.div>

        {/* Robot Image - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-2/5 flex justify-center mt-12 md:mt-0"
        >
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-[400px] h-64 sm:h-72 md:h-80 lg:h-[500px]">
            <motion.img
              ref={robotImageRef}
              src={Robot4}
              alt="Robot 4 - Contact Section"
              onMouseMove={handleRobotMouseMove}
              onMouseLeave={handleRobotMouseLeave}
              style={getRobotMaskStyle()}
              className="w-full h-full object-contain cursor-pointer"
              transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .animate-gradient-shift {
          animation: gradientShift 15s linear infinite;
        }
      `}</style>
    </div>
  );
}