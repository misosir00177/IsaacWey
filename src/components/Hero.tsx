"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mobiusImg from "../../public/img/Mobius/MobiusCover.jpg";

export default function Hero() {
  const slides = [
    { id: 1, text: "[ Hero Image / Video 1 ]" , image: mobiusImg.src },
    { id: 2, text: "[ Hero Image / Video 2 ]" , image: "" },
    { id: 3, text: "[ Hero Image / Video 3 ]" , image: "" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Variables to control auto play behavior:
  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex, slides.length]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-40 pb-20 md:pb-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85]">
            魏直彦 <br /> <span className="text-neutral-500">Isaac <span className="text-[#8BC24A]">Wey</span></span>
          </h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-right mt-8 md:mt-0 max-w-xl text-sm text-neutral-400 tracking-wide"
        >
                  <p>國立臺北科技大學互動設計系三年級<br />
                      前端軟硬體開發、專案企劃、策畫領導<br />
                      NTUT XRLab - Meta Punch Duel 前端軟體開發<br />
                      NTUT XRLab, Mobius 莫比斯圓環創作公社 - 《超聲體：人魚重奏》Unity程式設計師<br />
                      JLPT N1 / TOEIC 760</p>
        </motion.div>
      </div>
      
      <div className="flex flex-col gap-4 mt-8 w-full group">
        <div className="flex items-center gap-2 md:gap-4 w-full h-[50vh] md:h-[80vh]">
          {/* Left Arrow */}
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(-1); }}
            className="flex-shrink-0 flex w-10 h-10 md:w-12 md:h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full items-center justify-center text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 ml-[-2px]" />
          </button>

          <div className="flex-1 h-full bg-neutral-900 rounded-3xl overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) paginate(1); // 向左滑，下一張
                  else if (info.offset.x > 50) paginate(-1); // 向右滑，上一張
                }}
                className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600 font-mono cursor-grab active:cursor-grabbing"
              >
                {slides[currentIndex].image ? (
                  <img src={slides[currentIndex].image} alt={`slides[currentIndex].text`} className="w-full h-full object-cover" />
                ) : (
                  <span>{slides[currentIndex].text}</span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={(e) => { e.stopPropagation(); paginate(1); }}
            className="flex-shrink-0 flex w-10 h-10 md:w-12 md:h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full items-center justify-center text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 mr-[-2px]" />
          </button>
        </div>

        {/* Carousel Indicators / Progress Bars */}
        <div className="flex justify-center items-center gap-2">
          {slides.map((_, idx) => (
            <motion.div 
              key={idx} 
              layout
              className={`h-2 bg-neutral-700/50 backdrop-blur-md overflow-hidden rounded-full cursor-pointer flex-shrink-0 transition-all duration-300 ${idx === currentIndex ? 'w-12' : 'w-2'}`}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            >
              {idx === currentIndex && (
                <motion.div
                  key={`progress-${currentIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-white"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}