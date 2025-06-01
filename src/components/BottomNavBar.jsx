import React from 'react';
import { Link } from 'react-scroll';
import { Home, Info, Wrench, Phone } from 'lucide-react';

const navItems = [
  { name: 'hero', label: 'Home', icon: Home },
  { name: 'features', label: 'Features', icon: Wrench },
  { name: 'about', label: 'About', icon: Info },
  { name: 'contact', label: 'Contact', icon: Phone },
];

export default function BottomNavBar({ activeItem, handleSectionChange }) {
  return (
    <>
      <style>
        {`
          @keyframes border-glow-lines {
            0% { background-position: 0% 50%; }
            100% { background-position: 400% 50%; }
          }
          .animate-border-glow-lines {
            position: absolute;
            inset: -2px;
            border-radius: 9999px;
            background-size: 400% 100%;
            animation: border-glow-lines 8s linear infinite;
            z-index: -1;
            pointer-events: none;
          }
        `}
      </style>
      <nav
        className={`
          fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-50
          w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] max-w-[1200px]
          flex items-center justify-around
          px-2 sm:px-4 py-2 sm:py-3
          rounded-full shadow-xl
          border border-transparent
          transition-all duration-300 ease-in-out
          overflow-hidden
        `}
        style={{
          backgroundColor: '#030d38',
          boxShadow: `
            0 0 10px 5px rgba(3, 13, 56, 0.6),
            0 0 20px 10px rgba(3, 13, 56, 0.4),
            0 0 40px 20px rgba(3, 13, 56, 0.2)
          `,
        }}
      >
        <div className="animate-border-glow-lines" />
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.name}
            smooth={true}
            duration={1000}
            offset={-100}
            spy={true}
            hashSpy={true}
            activeClass="active"
            onSetActive={() => handleSectionChange(item.name)} // Use handleSectionChange
            onClick={() => handleSectionChange(item.name)} // Use handleSectionChange
            className={`
              relative flex flex-col items-center justify-center
              p-2 sm:p-3 rounded-full
              text-gray-400 hover:text-white
              transition-all duration-200 ease-in-out
              group cursor-pointer
              ${activeItem === item.name ? 'text-white' : ''}
            `}
            role="button"
            aria-label={`Navigate to ${item.label} section`}
            aria-current={activeItem === item.name ? 'true' : 'false'}
          >
            <item.icon
              className={`
                w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1
                ${activeItem === item.name ? 'transform scale-110' : ''}
                transition-transform duration-200
              `}
            />
            <span
              className={`
                text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap
                transition-all duration-300 ease-out
                pointer-events-none
                ${
                  activeItem === item.name
                    ? 'opacity-100 max-h-8'
                    : 'opacity-0 max-h-0 sm:group-hover:opacity-100 sm:group-hover:max-h-8'
                }
                ${activeItem === item.name ? 'block text-white font-semibold' : 'block text-gray-500'}
              `}
            >
              {item.label}
            </span>
            {activeItem === item.name && (
              <div
                className="
                  absolute -bottom-1 left-1/2 transform -translate-x-1/2
                  w-4 sm:w-6 h-0.5 sm:h-1 bg-white rounded-full
                  transition-all duration-300 ease-out"
              />
            )}
          </Link>
        ))}
      </nav>
    </>
  );
}