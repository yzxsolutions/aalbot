// src/components/BottomNavBar.jsx
import React from 'react'; // Remove useState as it's no longer managed internally
import { Home, Info, Wrench, Phone } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'About', icon: Info, href: '#' },
  { name: 'Services', icon: Wrench, href: '#' },
  { name: 'Contact', icon: Phone, href: '#' },
];

// Accept activeItem as a prop
const BottomNavBar = ({ activeItem }) => {
  // Remove the internal state:
  // const [activeItem, setActiveItem] = useState('Home');

  return (
    <nav
      className="fixed inset-x-0 bottom-4 z-50 mx-auto
                 w-[90%] md:w-[25%] lg:w-[25%] xl:w-[25%]
                 flex items-center justify-around px-2 py-2
                 rounded-full shadow-xl
                 border border-transparent
                 transition-all duration-300 ease-in-out
                 overflow-hidden
                "
      style={{
        backgroundColor: '#030d38',
        boxShadow: `
          0 0 10px 5px rgba(3, 13, 56, 0.6),
          0 0 20px 10px rgba(3, 13, 56, 0.4),
          0 0 40px 20px rgba(3, 13, 56, 0.2)
        `,
      }}
    >
      {/* Container for the animated glowing lines */}
      <div className="absolute inset-0 z-0 animate-border-glow-lines"></div>

      {navItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          // Remove onClick that sets internal state.
          // If you want buttons to navigate, you'd add scroll-to-section logic here.
          // For now, it will just follow scroll.
          // onClick={() => setActiveItem(item.name)}
          className={`
            relative flex flex-col items-center justify-center
            p-2 rounded-full
            text-gray-400 hover:text-white
            transition-all duration-200 ease-in-out
            group
            ${activeItem === item.name ? 'text-white' : ''}
          `}
        >
          <item.icon
            className={`
              w-6 h-6 mb-1
              ${activeItem === item.name ? 'transform scale-110' : ''}
              transition-transform duration-200
            `}
          />

          <span
            className={`
              text-xs font-medium whitespace-nowrap
              overflow-hidden
              transition-all duration-300 ease-out
              pointer-events-none
              ${activeItem === item.name ? 'opacity-100 max-h-8' : 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-8'}
              ${activeItem === item.name ? 'block' : 'block'}
              ${activeItem === item.name ? 'text-white font-semibold' : 'text-gray-500'}
            `}
          >
            {item.name}
          </span>

          {/* Active Indicator */}
          {activeItem === item.name && (
            <div
              className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2
                         w-6 h-1 bg-white rounded-full
                         transition-all duration-300 ease-out
                         "
            ></div>
          )}
        </a>
      ))}
    </nav>
  );
};

export default BottomNavBar;