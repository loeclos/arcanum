'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Component } from "@/components/animated-menu"; // Your imported component
import { navigationItems, fullScreenVariants } from "./animated-menu-constants";
import { Button } from './button'; 
// Assuming the constants are in the same directory

export default function FullScreenAnimatedMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {/* --- Toggle Button (Fixed on screen) --- */}
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          zIndex: 1000, 
          padding: '10px 15px',
          background: 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {isOpen ? "Close X" : "Menu ☰"}
      </Button>

      {/* --- AnimatePresence handles mounting and unmounting --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={fullScreenVariants}
            initial="closed"
            animate="open"
            exit="closed"
            
            // --- 🔑 KEY STYLING FOR FULL SCREEN OVERLAY ---
            style={{
              position: 'fixed', // Pin to the viewport
              top: 0,
              left: 0,
              width: '100vw', // Cover full width
              height: '100vh', // Cover full height
              backgroundColor: 'rgba(0, 0, 0, 0.95)', // Dark overlay background
              zIndex: 900, // Ensure it's above site content but below the button
              margin: 0,
              padding: 0,
              // Other layout styles
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}

            // --- Your Original Menu Styles ---
            // Note: I replaced your original complex Tailwind classes 
            // with these simple flexbox styles for clarity. 
            // If you need the backdrop-blur, you would add it here 
            // (e.g., using a background-filter CSS property).
          >
            {navigationItems.map((item, index) => (
              <li
                className="relative flex cursor-pointer flex-col items-center overflow-visible"
                key={index}
              >
                <div className="relative flex items-start">
                  {/* Your animated component is preserved */}
                  <Component
                    center
                    className="text-6xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-7xl text-white"
                  >
                    {item.name}
                  </Component>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}