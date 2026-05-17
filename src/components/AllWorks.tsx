"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ProjectMedia = {
  type: 'image' | 'youtube';
  url: string; // for image: src url, for youtube: video ID
};

type Project = { 
  id: string; 
  internalId: string; 
  title: string; 
  brief: string; 
  role: string;
  tags: string[]; 
  detail: string; 
  media?: ProjectMedia[]; 
};
type Gallery = Record<string, Project[]>;

// ProjectModal Component to handle its own carousel state
function ProjectModal({ selected, onClose }: { selected: Project; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaList = selected.media || [{ type: 'image', url: "" }]; // Default empty media if none provided
  const currentMedia = mediaList[currentIndex];

  const isYoutube = currentMedia.type === 'youtube';

  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => (prev + newDirection + mediaList.length) % mediaList.length);
  };

  useEffect(() => {
    if (isYoutube) return; // When Content type is Youtube, disable auto play

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentIndex, isYoutube, mediaList.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors text-white z-50"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6">{selected.title}</h2>
        <p className=" text-neutral-300 font-mono text-xs md:text-lg mb-2 md:mb-5">{selected.role}</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {selected.tags.map(tag => (
            <span key={tag} className="text-sm border border-neutral-700 bg-neutral-800 px-4 py-1 rounded-full text-neutral-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Modal Carousel */}
        <div className="flex flex-col gap-4 mb-10 w-full group">
          <div className="flex items-center gap-2 md:gap-4 w-full h-64 md:h-[450px]">
            {mediaList.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                className="flex-shrink-0 flex w-10 h-10 md:w-12 md:h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 ml-[-2px]" />
              </button>
            )}

            <div className="flex-1 h-full border border-neutral-800 bg-neutral-950 rounded-2xl relative overflow-hidden text-neutral-600">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  drag={isYoutube ? false : "x"} // if it's a youtube video, disable dragging, cause dragging might interfere with video controls
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    if (isYoutube) return;
                    if (info.offset.x < -50) paginate(1);
                    else if (info.offset.x > 50) paginate(-1);
                  }}
                  className="absolute inset-0 bg-neutral-800 flex items-center justify-center font-mono cursor-grab active:cursor-grabbing"
                >
                  {currentMedia.type === 'youtube' ? (
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${currentMedia.url}?rel=0`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen 
                    />
                  ) : currentMedia.url ? (
                    <img src={currentMedia.url} alt={`media-${currentIndex}`} className="w-full h-full object-cover" />
                  ) : (
                    <span>[ Project Media Placeholder ]</span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {mediaList.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="flex-shrink-0 flex w-10 h-10 md:w-12 md:h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-full items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 mr-[-2px]" />
              </button>
            )}
          </div>

          {/* Carousel Indicators */}
          {mediaList.length > 1 && (
            <div className={`flex justify-center items-center gap-2 ${isYoutube ? 'pointer-events-none' : ''}`}>
              {mediaList.map((_, idx) => (
                <motion.div 
                  key={idx} 
                  layout
                  className={`h-2 bg-neutral-700/50 backdrop-blur-md overflow-hidden rounded-full cursor-pointer flex-shrink-0 transition-all duration-300 pointer-events-auto ${idx === currentIndex ? 'w-12' : 'w-2'}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                >
                  {idx === currentIndex && !isYoutube && (
                    <motion.div
                      key={`progress-${currentIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-white"
                    />
                  )}
                  {idx === currentIndex && isYoutube && (
                      <div className="h-full bg-white w-full" />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        <div className="prose prose-invert max-w-none text-neutral-300 text-lg leading-relaxed">
          <p>{selected.detail}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AllWorks() {
  const galleryData: Gallery = {
    "NTUT XRLab": [
      {
        id: "x1", internalId: "Mobius",
        title: "《超聲體：人魚重奏》",
        role: "NTUT XRLab, Mobius 莫比斯圓環創作公社 - Unity程式設計師",
        brief: "以Unity開發後台控制系統，可利用MIDI裝置與前台表演者之VR裝置通訊並進行互動式演出",
        tags: ["Unity", "C#", "MIDI Controller"],
        detail: "A complete recruitment platform...",
        media: [{ type: 'image', url: '/img/Mobius/MobiusCover.jpg' }]
      },
      {
        id: "x2", internalId: "MIDI",
        title: "Unity MIDI控制器教材",
        role: "NTUT XRLab - Unity程式設計教材開發",
        brief: "互動程式設計課程之「MIDI控制器」部分教材開發、製作",
        tags: ["Unity", "C#", "MIDI Controller", "Notion", "教材"],
        detail: "A complete recruitment platform...",
        media: [{ type: 'image', url: '/img/IxDHero/IxDHeroCover.jpg' }]
      }
    ],
    "Software": [
      {
        id: "s1", internalId: "Matcha",
        title: "Matcha Web",
        brief: "以抹茶為載體的管理網站Demo",
        role: "Web前端開發",
        tags: ["HTML", "CSS", "Java Script"],
        detail: "A",
        media: [{ type: 'image', url: '/img/MetaCardDuel/MetaCardDuel.jpg' }, { type: 'youtube', url: 'dQw4w9WgXcQ' }]
      },
      {
        id: "s2", internalId: "IxDHero",
        title: "學分勇者 IxD Hero",
        brief: "純2D遊戲",
        role: "Unity程式設計師",
        tags: ["Unity", "C#"],
        detail: "A complete recruitment platform...",
        media: [{ type: 'image', url: '/img/Mobius/MobiusCover.jpg' }]
      }
    ],
    "Interactive / Hardware": [
      {
        id: "h1", internalId: "IxDHero2",
        title: "IxD Hero -Cost of 2nd Year-",
        brief: "A",
        role: "Unity程式設計師",
        tags: ["Arduino", "Unity", "C#", "C++", "Accelerometer", "LED Strip", "IR Sensor"],
        detail: "A"
      },
      { id: "h2", internalId: "Revolver", title: "RevolveR", brief: "A", role: "Unity程式設計師", tags: ["Unity", "ESP32", "REST API", "Node.js"], detail: "A" },
      { id: "h3", internalId: "PeeLusion", title: "PeeLusion", brief: "A", role: "Unity程式設計師", tags: ["Unity", "Raspberry Pi", "REST API", "Node.js"], detail: "A" },
      { id: "h4", internalId: "Dr.Kiwi", title: "Meta Card Duel", brief: "A", role: "Unity程式設計師", tags: ["Unity", "C#", "WebSocket", "Node.js"], detail: "A" }
    ],
    "Vibe Coding": [
      { id: "v1", internalId: "ColorPancake", title: "Color Pancake", brief: "A", role: "Unity程式設計師", tags: ["HTML", "CSS", "JavaScript", "Firebase", "Google AI Studio"], detail: "A" },
      { id: "v2", internalId: "CalculatedSmash", title: "心算羽球王", brief: "A", role: "Unity程式設計師", tags: ["HTML", "CSS", "JavaScript"], detail: "A" },
    ]
  };

  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = "" };
  }, [selected]);

  return (
    <div className="py-20 px-6 md:px-20 border-t border-neutral-800">
      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-20 text-neutral-300">
        All Works / Gallery
      </h2>

      <div className="flex flex-col gap-20">
        {Object.entries(galleryData).map(([section, items]) => (
          <div key={section}>
            <h3 className="text-xl text-neutral-500 uppercase tracking-widest mb-10 border-b border-neutral-800 pb-4">
              {section}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map(item => (
                <motion.div 
                  key={item.id}
                  id={ item.internalId }
                  whileHover={{ y: -10 }}
                  onClick={() => setSelected(item)}
                  className="p-6 md:p-8 bg-neutral-900 border border-neutral-800 rounded-3xl cursor-pointer hover:bg-neutral-800 transition-colors flex flex-col group relative overflow-hidden"
                >
                  {/* Card Cover Image */}
                  {item.media && item.media.length > 0 && (
                    <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl bg-neutral-950 relative border border-neutral-800/50 flex-shrink-0">
                      <img 
                        src={item.media[0].type === 'youtube' ? `https://img.youtube.com/vi/${item.media[0].url}/hqdefault.jpg` : item.media[0].url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-white text-neutral-200 transition-colors uppercase tracking-tight">{item.title}</h4>
                  <p className="text-[#8BC24A] font-mono text-xs md:text-sm mb-2 md:mb-5">{item.role}</p>
                  <p className="text-neutral-400 mb-8 flex-grow">{item.brief}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs bg-neutral-950 px-3 py-1 rounded-full text-neutral-500 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal selected={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}