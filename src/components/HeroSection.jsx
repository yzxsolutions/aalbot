import React from "react";
import { Modal, ModalTrigger, ModalBody, ModalContent } from "./ui/animated-modal";
import Video from "../assets/videos/robotVideo.mp4";

export default function HeroSection({ show }) {
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
      }}
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight text-center md:text-left">
        <span className="text-pink-400">Kammani</span>
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-6 leading-tight text-center md:text-left">
        A HOUSE ROBO
      </h2>
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight text-center md:text-left">
        Sleek, Smart, and Full of Personality
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
        It is designed to be both a high-tech helper and a source of joy in your home.
      </p>
      <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-button"
        >
          Contact on WhatsApp
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.1 3.9C17.9 1.7 15 0.5 12 0.5 5.6 0.5 0.5 5.6 0.5 12c0 2.1 0.7 4.1 1.9 5.8L0.9 23.5l5.8-1.9c1.6 1 3.4 1.5 5.3 1.5 6.4 0 11.5-5.1 11.5-11.5 0-3-1.2-5.9-3.4-8.1zm-8.1 17.1c-1.7 0-3.3-0.5-4.7-1.3l-0.4-0.2-3.4 1.1 1.1-3.4-0.2-0.4c-0.8-1.4-1.3-3-1.3-4.7 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7 0 5.2-4.2 9.4-9.4 9.4zm5.1-6.7c-0.3-0.1-1.7-0.9-1.9-1-0.3-0.1-0.5-0.1-0.7 0.1-0.2 0.2-0.7 1-0.9 1.2-0.2 0.2-0.4 0.3-0.6 0.1-0.6-0.2-2.5-0.8-3.5-2.5-0.8-1.3-1.3-2.7-1.5-3.1-0.2-0.4 0-0.6 0.2-0.8 0.2-0.2 0.4-0.5 0.6-0.7 0.2-0.2 0.3-0.4 0.4-0.6 0.1-0.2 0.1-0.4 0-0.6-0.1-0.2-0.7-1.6-1-2.2-0.3-0.6-0.5-0.5-0.7-0.5-0.2 0-0.4 0-0.6 0.1-0.6 0.2-1.3 0.9-1.3 1.9 0 1.1 0.8 2.2 0.9 2.3 0.1 0.2 1.6 3.4 3.9 4.6 0.6 0.3 1.1 0.5 1.5 0.7 0.6 0.2 1.2 0.2 1.7 0.1 0.5-0.1 1.6-0.7 1.8-1.4 0.2-0.6 0.2-1.3 0.1-1.4z"/>
          </svg>
        </a>
        <Modal>
          <ModalTrigger className="gradient-button-secondary">
            Watch Demo
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </ModalTrigger>
          <ModalBody className="bg-primary rounded-lg">
            <ModalContent>
              <h4 className="text-lg md:text-1xl  text-white font-bold text-center mb-4">
                Kammani Demo Video
              </h4>
              <div className="flex justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  controls
                  className="rounded-lg w-full max-w-2xl h-auto border-2 border-[#030d38]"
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
    </div>
  );
}