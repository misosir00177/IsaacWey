"use client";
import { useState, useEffect, use } from "react";
import illustrationImg from "../../public/icon/illustration.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Observe scroll position and update isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      // Scroll over 50px from top will trigger the scrolled state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Subscribe to scroll events
    window.addEventListener("scroll", handleScroll);
    
    // Unsubscribe on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full px-6 py-4 flex justify-between items-center z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-neutral-950/80 backdrop-blur-md border-neutral-800 text-white" 
          : "mix-blend-difference text-white py-6"
      }`}
    >
    <img src={illustrationImg.src} alt="Logo" className="h-20 w-20" />
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
        <a href="#about" className="hover:text-neutral-400 transition-colors">About</a>
        <a href="#experience" className="hover:text-neutral-400 transition-colors">Experience</a>
        <a href="#works" className="hover:text-neutral-400 transition-colors">Works</a>
        <a href="#contact" className="hover:text-neutral-400 transition-colors">Contact</a>
      </div>
    </nav>
  );
}