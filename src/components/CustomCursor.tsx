"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import themeData from "../content/theme.json";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Tracks the mouse moving across the screen
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Makes the cursor expand when hovering over links or buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Reads your CMS theme and applies the correct glowing color
  const themeColor = themeData.theme_color || "Cyan";
  const colorMap: Record<string, string> = {
    Cyan: "bg-cyan-500/30 border-cyan-500",
    Violet: "bg-violet-500/30 border-violet-500",
    Emerald: "bg-emerald-500/30 border-emerald-500",
    Ruby: "bg-rose-500/30 border-rose-500"
  };
  const activeColor = colorMap[themeColor];

  return (
    <>
      {/* The main glowing trailing orb */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[100] border-2 backdrop-blur-sm hidden md:flex items-center justify-center transition-colors duration-300 ${activeColor}`}
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      >
        {/* A tiny solid dot in the dead center */}
        <div className={`w-1 h-1 rounded-full ${activeColor.split(' ')[1].replace('border-', 'bg-')} ${isHovering ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`} />
      </motion.div>
    </>
  );
}