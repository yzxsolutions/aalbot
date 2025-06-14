// src/components/Header.jsx
import React from 'react';
import textLogo from "../assets/img/textLogo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 flex justify-center bg-transparent bg-opacity-50 ">
      <div className="w-full max-w-7xl flex items-center ml-2 justify-start ">
        <div className="text-white text-2xl font-bold font-poppins">
          <img src={textLogo} alt="Company Logo" className="h-12 md:h-18" />
        </div>
      </div>
    </header>
  );
}