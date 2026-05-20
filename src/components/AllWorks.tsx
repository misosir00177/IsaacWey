"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import GitHubIcon from "../../public/icon/brandIcon/github.svg";
import YouTubeIcon from "../../public/icon/brandIcon/youtube.svg";
import NotionIcon from "../../public/icon/brandIcon/notion.svg";
import otherLinkIcon from "../../public/icon/brandIcon/external-link.svg";
import detailIcon from "../../public/icon/brandIcon/dots.svg";
import MobiusCover from "../../public/img/Mobius/Cover.png";
import IxdHeroCover from "../../public/img/IxDHero/Cover.png";
import RevolverCover from "../../public/img/Revolver/Cover.png";
import ColorPancakeCover from "../../public/img/ColorPancake/Cover.png";
import DrKiwiCover from "../../public/img/DrKiwi/Cover.png";
import MIDICover from "../../public/img/MIDI_Doc/Cover.png";

type ProjectMedia = {
  type: 'image' | 'youtube';
  url: string; // for image: src url, for youtube: video ID
};

type ProjectLink = {
  label: string;
  url: string;
  icon: { src: string };
  hoverColor: string;
  bgColor?: string;
  textColor?: string;
};

type Project = {
  id: string;
  internalId: string;
  title: string;
  brief: string;
  role: string;
  tags: string[];
  detail: string | React.ReactNode;
  media?: ProjectMedia[];
  links?: ProjectLink[];
};
type Gallery = Record<string, Project[]>;

function LinkTag({ link, stopPropagation = false }: { link: ProjectLink; stopPropagation?: boolean }) {
  return (
    <a
      href={link.url}
      target={link.url.startsWith('#') || link.url.startsWith('/') ? '_self' : '_blank'}
      rel={link.url.startsWith('#') || link.url.startsWith('/') ? undefined : 'noopener noreferrer'}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      className={`group/btn inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-1.5 text-sm transition-colors ${link.bgColor || 'bg-neutral-800'} ${link.textColor || 'text-neutral-300'} hover:text-white`}
    >
      <span
        className={`h-4 w-4 shrink-0 bg-white transition-colors ${link.hoverColor}`}
        style={{
          WebkitMaskImage: `url(${link.icon.src})`,
          WebkitMaskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskImage: `url(${link.icon.src})`,
          maskPosition: 'center',
          maskRepeat: 'no-repeat',
          maskSize: 'contain'
        }}
      />
      <span>{link.label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
    </a>
  );
}

function createProjectLink(label: string, url: string): ProjectLink {
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
  const isGithub = url.includes('github.com');
  const isNotion = url.includes('notion.so');
  const isDetail = label.toLowerCase() === 'detail';

  return {
    label,
    url,
    icon: isYoutube ? YouTubeIcon : isGithub ? GitHubIcon : isNotion ? NotionIcon : isDetail ? detailIcon : otherLinkIcon,
    hoverColor: isYoutube
      ? 'group-hover/btn:bg-red-500'
      : isGithub
        ? 'group-hover/btn:bg-white'
        : isNotion
          ? 'group-hover/btn:bg-white'
          : isDetail
            ? 'group-hover/btn:bg-neutral-300'
            : 'group-hover/btn:bg-[#8BC24A]',
    bgColor: isDetail ? 'bg-[#8BC24A]' : 'bg-neutral-800',
    textColor: isDetail ? 'text-black' : 'text-neutral-300'
  };
}

// ProjectModal Component to handle its own carousel state
function ProjectModal({ selected, onClose }: { selected: Project; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const mediaList = selected.media || [{ type: 'image', url: "" }]; // Default empty media if none provided
  const currentMedia = mediaList[currentIndex];

  const isYoutube = currentMedia.type === 'youtube';

  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => (prev + newDirection + mediaList.length) % mediaList.length);
  };

  useEffect(() => {
    if (isYoutube) return; // When Content type is Youtube, disable auto play

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isYoutube, mediaList.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 overscroll-contain"
      onClick={onClose}
      onTouchMove={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) {
          e.preventDefault();
        }
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative max-h-[85vh] overflow-y-auto overscroll-contain"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors text-white z-50"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">{selected.title}</h2>
        <p className=" text-neutral-300 font-mono text-xs md:text-lg mb-2 md:mb-5">{selected.role}</p>
        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
          {selected.tags.map(tag => (
            <span key={tag} className="text-sm border border-neutral-700 bg-neutral-800 px-4 py-1 rounded-full text-neutral-300">
              {tag}
            </span>
          ))}
        </div>

        {selected.links && selected.links.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {selected.links.map((link) => (
              <LinkTag key={link.label} link={link} />
            ))}
          </div>
        )}

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
        detail: <>北科大XRLab與Mobius 莫比斯圓環創作公社合作之互動演出專案。<br />
          實際於2025/10/5在牯嶺街小劇場演出。<br />
          整體專案以Unity開發，包含MR、MIDI控制器串接、毫米波串接等開發內容，由數位程式設計師共同維護、開發，<br />
          本人主要負責MIDI控制系統開發，包含與MIDI裝置通訊、參數調整、數值監控等。<br />
          也需要配合前台表演者的VR裝置狀態與表演內容調整MIDI控制系統的邏輯與參數，以確保整體演出流程順暢且互動效果達到預期。<br />
          <br />
          <span className="text-[#8BC24A]">專案最大特點</span><br />
          高度的互動性與即時性，MIDI控制系統需要能夠即時反應後台控制的表演內容與VR裝置的狀態變化，也需要針對設備故障、連線異常等問題出現時演出代替方案。<br />
          <br />
          <span className="text-[#8BC24A]">學習機會</span><br />
          在此專案中，由於毫米波等設備會有連線異常之問題，因此會需要動用備用方案來控制演出內容，此時會需要知道專案內關鍵功能的開關、數值的狀態，因此我學習到在除錯以及監控上須考量到效能最大化與資源占用最小化的平衡，而不能為了開發者方便而將監控功能過度冗餘。<br />
        </>,
        media: [{ type: 'image', url: MobiusCover.src }],
        links: [
          createProjectLink('官方介紹', 'https://www.mobiusstriptheatre.com/2025241801229836229328823963665306201543977037325228631229924180242303506920316.html')
        ]
      },
      {
        id: "x2", internalId: "MIDI",
        title: "程式設計入門課程教材協助",
        role: "NTUT XRLab - Documentation Author, Demo Project Developer",
        brief: "互動程式設計課程之「MIDI控制器」部分教材開發、製作",
        tags: ["Unity", "C#", "MIDI Controller", "Notion", "教材"],
        detail: <>針對北科大XRLab於113級互動設計系之程式設計入門課程教材 - MIDI控制器部分之開發與文檔撰寫。<br />
          整體專案以Unity開發、教學文檔以Notion製作。<br />
          主要撰寫、開發、協助內容為MIDI控制器串接、鏡頭使用、Timeline使用、Animation使用、VFX使用等。<br />
          專案本身為互動式音樂MV，透過使用者在特定時機操控MIDI，可獲得多種不同視覺效果。<br />
          <br />
          <span className="text-[#8BC24A]">專案最大特點</span><br />
          除了需要展現MIDI控制器的多樣性與功能性介紹外， 同時須將Unity基本功能融合、納入教材。<br />
          <br />
          <span className="text-[#8BC24A]">學習機會</span><br />
          在此專案中，由於專注於音樂與視覺效果流程，而疏忽了模組化設計，因而了解在一教學專案上模組化的重要性。<br />
        </>,
        media: [{ type: 'image', url: MIDICover.src }, { type: 'youtube', url: 'dQw4w9WgXcQ' }],
        links: [
          createProjectLink('Demo影片', 'https://www.youtube.com/watch?v=xe0fl6z8tOU'),
          createProjectLink('Repository', 'https://github.com/misosir00177/MIDI_Example_URP_Designant'),
          createProjectLink('教材文檔', 'https://www.notion.so/misosir00177/Unity-MIDI-Input-System-MINIS-Unity-MIDI-fb8a5004d5c6424e8b014da0e8be9c16?source=copy_link')
        ]
      }
    ],
    "Software": [
      {
        id: "s1", internalId: "Matcha",
        title: "Matcha Web",
        brief: "以抹茶為載體的個人生產力提升網站Demo",
        role: "Project Manager/Leader, Frontend Developer",
        tags: ["HTML", "CSS", "Java Script"],
        detail: <>以抹茶為主要視覺元素以及載體的個人生產力提升網站Demo。<br />
          包含代辦清單、花費記錄、日誌等功能模組之Demo，並以抹茶相關的元素作為整體設計主軸。<br />
          <br />
          <span className="text-[#8BC24A]">專案最大特點</span><br />
          完全以純手工的方式開發HTML、CSS、JavaScript等前端技術。<br />
          <br />
          <span className="text-[#8BC24A]">學習機會</span><br />
          由於初次接觸前端開發，以HTML/CSS/JavaScript之基本技術為主要學習目標，並學習如何製作響應式(RWD)網頁。<br />
        </>,
        media: [{ type: 'image', url: '/img/MetaCardDuel/MetaCardDuel.jpg' }],
        links: [
          createProjectLink('Demo網站', 'https://misosir00177.github.io/MatchaResponsiveWeb/index.html'),
          createProjectLink('Repository', 'https://github.com/misosir00177/MatchaResponsiveWeb')
        ]
      },

      {
        id: "s2", internalId: "IxDHero",
        title: "學分勇者 IxD Hero",
        brief: "以Unity製作之2D純軟體遊戲，玩家扮演互動設計系學生，透過滑鼠打擊「魔化老師」與「專題大魔王」拯救互動系。以並將導師納入遊戲角色進行開發。",
        role: "Project Manager/Leader, Game Developer",
        tags: ["Unity", "C#", "2D Game"],
        detail: <>程式設計入門課程期末小組遊戲專案。<br />
          以Unity製作之2D純軟體遊戲，玩家扮演互動設計系學生，透過滑鼠打擊「魔化老師」與「專題大魔王」拯救互動系。<br />
          主要以系上特徵之專案導向(PBL)課程會擁有的分組、分工問題為發想基底，配合系上人氣專案教師(傅子恒老師)的特徵與許可而製作成遊戲角色，開發出一款以「專題大魔王」、「魔化老師」、「學分勇者」為主題的2D遊戲。<br />
          客群針對互動系學生，因此加入導師音檔、分組糾紛等特定元素增加共鳴。<br />
          <br />
          <span className="text-[#8BC24A]">獎項：北科大互動設計系程式設計入門課程遊戲專案競賽 最佳作品獎(Best-In-Show)<br />
            國立臺北科技大學互動設計系, 國立清華大學藝術學院科技藝術所, 不或娛樂評審團合頒
          </span><br />
          <br />
          <span className="text-[#8BC24A]">專案最大特點</span><br />
          針對目標客群的高度共鳴以及整體遊戲流暢度、競爭性。<br />
          <br />
          <span className="text-[#8BC24A]">學習機會</span><br />
          針對競爭性元素，使用者有高度參與，因此排行榜、快速進入遊玩等為加分要素。<br />
        </>,
    media: [{ type: 'image', url: IxdHeroCover.src }],
      links: [
        createProjectLink('Repository', 'https://github.com/misosir00177/IxDHero/tree/master'),
        createProjectLink('Demo影片', 'https://www.youtube.com/watch?v=xe0fl6z8tOU')
      ]
}
    ],
"Interactive / Hardware": [
  {
    id: "h1", internalId: "IxDHero2",
    title: "IxD Hero -Cost of 2nd Year-",
    brief: "學分勇者之二週年紀念專案，結合Arduino、Unity等技術的實體互動裝置",
    role: "Project Manager/Leader, Game Developer, Hardware Engineer",
    tags: ["Arduino", "Unity", "C#", "C++", "Accelerometer", "LED Strip", "IR Sensor"],
    detail: "A"
  },
  {
    id: "h2", internalId: "Revolver",
    title: "RevolveR",
    brief: "A",
    role: "Unity程式設計師",
    tags: ["Unity", "ESP32", "REST API", "Node.js"],
    media: [{ type: 'image', url: RevolverCover.src }],
    detail: "A"
  },
  {
    id: "h3", internalId: "PeeLusion",
    title: "PeeLusion",
    brief: "A",
    role: "Unity程式設計師",
    tags: ["Unity", "Raspberry Pi", "REST API", "Node.js"],
    detail: "A"
  },
  {
    id: "h4", internalId: "Dr.Kiwi",
    title: "Dr.Kiwi",
    brief: "A",
    role: "Unity程式設計師",
    tags: ["Unity", "C#", "WebSocket", "Node.js"],
    media: [{ type: 'image', url: DrKiwiCover.src }],
    detail: "A"
  }
],
  "Vibe Coding": [
    {
      id: "v1", internalId: "ColorPancake",
      title: "Color Pancake",
      brief: "A",
      role: "Unity程式設計師",
      tags: ["HTML", "CSS", "JavaScript", "Firebase", "Google AI Studio"],
      detail: "A",
      media: [{ type: 'image', url: ColorPancakeCover.src }],
      links: [
        createProjectLink('Demo影片', 'https://www.youtube.com/watch?v=7nqj8jYlXoE'),
        createProjectLink('Repository', 'https://github.com/misosir00177/ColorPancakeMatSide')
      ]
    },
    {
      id: "v2", internalId: "CalculatedSmash",
      title: "心算羽球王",
      brief: "A",
      role: "Unity程式設計師",
      tags: ["HTML", "CSS", "JavaScript"],
      detail: "A"
    },
  ],
    "Video Project": [
      {
        id: "v1", internalId: "ColorPancake",
        title: "Color Pancake",
        brief: "A",
        role: "Unity程式設計師",
        tags: ["HTML", "CSS", "JavaScript", "Firebase", "Google AI Studio"],
        detail: "A",
        media: [{ type: 'image', url: ColorPancakeCover.src }],
        links: [
          createProjectLink('Demo影片', 'https://www.youtube.com/watch?v=7nqj8jYlXoE'),
          createProjectLink('Repository', 'https://github.com/misosir00177/ColorPancakeMatSide')
        ]
      },
      {
        id: "v2", internalId: "CalculatedSmash",
        title: "心算羽球王",
        brief: "A",
        role: "Unity程式設計師",
        tags: ["HTML", "CSS", "JavaScript"],
        detail: "A"
      },
    ],
      "Award/Certificate/Other": [
        {
          id: "o1", internalId: "toeic",
          title: "TOEIC",
          brief: "英文能力證明",
          role: "TOEIC 760",
          tags: ["English", "TOEIC"],
          detail: "A",
          media: [{ type: 'image', url: ColorPancakeCover.src }],
        }

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
                id={item.internalId}
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

                <h4 className="text-2xl font-bold mb-3 group-hover:text-white text-neutral-200 transition-colors tracking-tight">{item.title}</h4>
                <p className="text-[#8BC24A] font-mono text-xs md:text-sm mb-2 md:mb-5">{item.role}</p>
                <p className="text-neutral-400 mb-8 flex-grow">{item.brief}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs bg-neutral-950 px-3 py-1 rounded-full text-neutral-500 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.links.map((link) => (
                      <LinkTag key={link.label} link={link} stopPropagation />
                    ))}
                  </div>
                )}
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