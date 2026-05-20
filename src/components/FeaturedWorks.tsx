"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MobiusCover from "../../public/img/Mobius/Cover.png";
import IxdHeroCover from "../../public/img/IxDHero/Cover.png";
import RevolverCover from "../../public/img/Revolver/Cover.png";
import ColorPancakeCover from "../../public/img/ColorPancake/Cover.png";
import DrKiwiCover from "../../public/img/DrKiwi/Cover.png";
import MIDICover from "../../public/img/MIDI_Doc/Cover.png";
import GitHubIcon from "../../public/icon/brandIcon/github.svg";
import YouTubeIcon from "../../public/icon/brandIcon/youtube.svg";
import NotionIcon from "../../public/icon/brandIcon/notion.svg";
import otherLinkIcon from "../../public/icon/brandIcon/external-link.svg";
import detailIcon from "../../public/icon/brandIcon/dots.svg";

export default function FeaturedWorks() {
    const featured = [
        {
            id: 1,
            title: "《超聲體：人魚重奏》",
            role: "NTUT XRLab, Mobius 莫比斯圓環創作公社 - Unity程式設計師",
            desc: (
                <>
                    前台表演者使用VR進行表演；後台使用MIDI控制器、毫米波感測等技術配合之創新演出<br />
                    後台與表演者配戴之VR裝置進行通訊與控制做出互動式表演<br />
                    主要製作內容：以Unity開發的表演專用專案，可使用MIDI控制器、毫米波感測等技術演出背景動畫
                </>
            ),
            tags: ["Unity", "C#", "MIDI Controller"],
            img: MobiusCover.src,
            relatedLinks: [
                { icon: otherLinkIcon, name: "官方介紹", hoverColor: "group-hover/btn:bg-[#8BC24A]", url: "https://www.mobiusstriptheatre.com/2025241801229836229328823963665306201543977037325228631229924180242303506920316.html" },
                { icon: detailIcon, name: "Detail", btnColor: "bg-[#8BC24A]", textColor: "text-black", hoverColor: "group-hover/btn:bg-neutral-300", url: "#Mobius" }
            ]
        },
        {
            id: 2,
            title: "學分勇者",
            role: "Project Manager/Leader, Game Developer",
            desc: (
                <>
                    以Unity製作之2D純軟體遊戲，玩家扮演互動設計系學生，透過滑鼠打擊"魔化"老師與專題大魔王拯救互動系。<br />
                    主要製作內容：專案主導、遊戲整體開發<br />
                    <span className="text-[#8BC24A]">獎項：北科大互動設計系程式設計入門課程遊戲專案競賽 最佳作品獎(Best-In-Show)
                    </span>
                </>

            ),
            tags: ["Unity", "C#", "2D", "Game Development"],
            img: IxdHeroCover.src,
            relatedLinks: [
                { icon: GitHubIcon, name: "Repository", hoverColor: "group-hover/btn:bg-white-500", url: "https://github.com/misosir00177/IxDHero/tree/master" },
                { icon: YouTubeIcon, name: "Demo影片", hoverColor: "group-hover/btn:bg-red-500", url: "https://www.youtube.com/watch?v=xe0fl6z8tOU" },
                { icon: detailIcon, name: "Detail", btnColor: "bg-[#8BC24A]", textColor: "text-black", hoverColor: "group-hover/btn:bg-neutral-300", url: "#IxDHero" }
            ]
        },
        {
            id: 3,
            title: "REVOLVER",
            role: "Project Manager/Leader, Hardware Engineer",
            desc: (
                <>
                    使用硬體槍枝以及Unity開發、互動。<br />以俄羅斯輪盤為基底玩法，配合「普通」、「中毒」、「回復」等多種子彈種類構成之雙人互動遊戲。<br />
                    可旋轉彈匣打亂順序、也可基於目前子彈狀態推測未來。<br />
                    主要製作內容：專案主導、硬體開發
                </>

            ),
            tags: ["Unity", "C#", "2D", "Hardware", "Arduino", "REST API"],
            img: RevolverCover.src,
            relatedLinks: [
                { icon: detailIcon, name: "Detail", btnColor: "bg-[#8BC24A]", textColor: "text-black", hoverColor: "group-hover/btn:bg-neutral-300", url: "#Revolver" }
            ]
        },
        {
            id: 4,
            title: "Dr.Kiwi",
            role: "Project Manager/Leader, Lead MR Developer",
            desc: (
                <>
                    以Unity製作之混合實境(MR)遊戲，玩家化作水果攤老闆，透過不同手勢打擊各式各樣被感染的水果。<br />
                    主要製作內容：專案主導、遊戲MR開發
                </>
            ),
            tags: ["Unity", "C#", "MR"],
            img: DrKiwiCover.src,
            relatedLinks: [
                { icon: YouTubeIcon, name: "Demo影片", hoverColor: "group-hover/btn:bg-red-500", url: "https://www.youtube.com/watch?v=UoV-7OCeAl4" },
                { icon: GitHubIcon, name: "Repository", hoverColor: "group-hover/btn:bg-white-500", url: "https://github.com/misosir00177/DrKiwi_TheOwnerOfFruitStand" },
                { icon: detailIcon, name: "Detail", btnColor: "bg-[#8BC24A]", textColor: "text-black", hoverColor: "group-hover/btn:bg-neutral-300", url: "#DrKiwi" }
            ]
        },
        {
            id: 5,
            title: "Color Pancake",
            role: "Project Manager/Leader, Backend Developer",
            desc: (
                <>
                    以老人復健為主題配合斯特魯普效應，使用者透過畫面出題之文字顏色(而非背景顏色)踩對應位置發光地墊。<br />
                    本專案專注於後端串接，因此前端測試專用介面由AI輔助生成。<br />
                    主要製作內容：專案主導、後端串接、地墊模擬網頁製作
                </>
            ),
            tags: ["Javascript", "Firebase" , "Vibe Coding"],
            img: ColorPancakeCover.src,
            relatedLinks: [
                { icon: YouTubeIcon, name: "Demo影片", hoverColor: "group-hover/btn:bg-red-500", url: "https://www.youtube.com/watch?v=7nqj8jYlXoE" },
                { icon: GitHubIcon, name: "Repository", hoverColor: "group-hover/btn:bg-white-500", url: "https://github.com/misosir00177/ColorPancakeMatSide" },
                { icon: detailIcon, name: "Detail", btnColor: "bg-[#8BC24A]", textColor: "text-black", hoverColor: "group-hover/btn:bg-neutral-300", url: "#ColorPancake" }
            ]
        },
        {
            id: 6,
            title: "互動程式設計課程教材協助",
            role: "NTUT XRLab - Documentation Author, Demo Project Developer",
            desc: (
                <>
                    以Unity配合MIDI控制器、Timeline、Animation、VFX等效果之互動音樂MV Demo。<br />
                    屬於NTUT XRLab針對互動設計系113級程式設計入門教材之部分內容。<br />
                    主要製作內容：MIDI控制器部分開發、文檔製作協助
                </>
            ),
            tags: ["Unity", "C#", "MIDI", "Notion"],
            img: MIDICover.src,
            relatedLinks: [
                { icon: YouTubeIcon, name: "Demo影片", hoverColor: "group-hover/btn:bg-red-500", url: "https://www.youtube.com/watch?v=xe0fl6z8tOU" },
                { icon: GitHubIcon, name: "Repository", hoverColor: "group-hover/btn:bg-grey-500", url: "" },
                { icon: NotionIcon, name: "教材文檔", hoverColor: "group-hover/btn:bg-white-500", url: "https://www.notion.so/misosir00177/Unity-MIDI-Input-System-MINIS-Unity-MIDI-fb8a5004d5c6424e8b014da0e8be9c16?source=copy_link" },
                { icon: detailIcon, name: "Detail", btnColor: "bg-[#8BC24A]", textColor: "text-black", hoverColor: "group-hover/btn:bg-neutral-300", url: "#ColorPancake" }
            ]
        }
    ];

    return (
        <div className="py-20 relative bg-neutral-950">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-20 px-6 text-neutral-300">
                Featured Works /
            </h2>
            <div className="flex flex-col">
                {featured.map((item, i) => (
                    <WorkWidget key={item.id} item={item} index={i} />
                ))}
            </div>
        </div>
    );
}

function WorkWidget({ item, index }: { item: any; index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);


    const { scrollYProgress: entryProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const borderRadius = useTransform(entryProgress, [0, 0.5], ["32px", "0px"]);
    const scale = useTransform(entryProgress, [0, 0.5], [0.85, 1]);


    const { scrollYProgress: stickyProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"]
    });


    const textTranslateY = useTransform(stickyProgress, [0, 0.3], ["100%", "0%"]);
    const textOpacity = useTransform(stickyProgress, [0, 0.3], [0, 1]);


    return (
        <div ref={containerRef} className="h-[200vh] w-full relative mb-12 md:mb-0">
            <div className="sticky top-0 h-[120dvh] md:h-screen w-full overflow-hidden flex flex-col md:block">

                {/* Image Section */}
                <motion.div
                    style={{
                        borderRadius,
                        scale,
                    }}
                    className="relative flex-1 md:absolute md:top-0 md:left-0 w-full h-full md:h-full bg-neutral-800 flex items-center justify-center transform origin-top mx-auto overflow-hidden rounded-t-3xl md:rounded-none mt-20 md:mt-0"
                >

                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </motion.div>

                {/* Text Section */}
                <motion.div
                    style={{
                        y: textTranslateY,
                        opacity: textOpacity,
                    }}
                    className="relative md:absolute md:bottom-0 md:left-0 w-full h-auto lg:h-[50vh] md:h-[65vh] p-6 pt-10 md:p-16 flex flex-col justify-start md:justify-center border-t border-neutral-800 z-10 bg-neutral-950 md:bg-neutral-950/30 md:backdrop-blur transition-all duration-500 md:hover:bg-neutral-950 md:hover:backdrop-blur-none cursor-default rounded-b-3xl md:rounded-b-none"
                >
                    <div className="max-w-4xl mx-auto w-full group/text">
                        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tighter">{item.title}</h3>

                        {/* PC Non-Hover */}
                        <div className="relative inline-block mb-2">
                            <span className="relative z-10 text-neutral-300 font-mono text-xs md:text-sm tracking-widest block py-1 px-2">
                                {item.role}
                            </span>
                            {/* Hover / Non-Hover Transition */}
                            <span className="absolute inset-0 bg-neutral-800 z-0 transition-all duration-500 ease-out origin-left group-hover/text:w-0 w-full hidden md:block"></span>
                            {/* Phone: Constant Background */}
                            <span className="absolute inset-0 bg-neutral-800 z-0 w-full md:hidden"></span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 mt-2 md:py-5">
                            {Object.values(item.tags).map(tag => (
                                <span key={tag as string} className="px-4 py-2 bg-neutral-900 text-neutral-300 text-sm rounded-full border border-neutral-800 uppercase tracking-widest">
                                    {tag as string}
                                </span>
                            ))}
                            {item.relatedLinks && item.relatedLinks.map((link: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target={link.url.startsWith('#') || link.url.startsWith('/') ? '_self' : '_blank'}
                                    rel={link.url.startsWith('#') || link.url.startsWith('/') ? '' : 'noopener noreferrer'}
                                    className={`group/btn px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-colors ${link.btnColor || 'bg-neutral-800'} ${link.textColor || 'text-neutral-300'} ${link.btnHoverColor || 'hover:bg-neutral-700'} ${link.textHoverColor || 'hover:text-white'}`}
                                >
                                    <span
                                        className={`w-4 h-4 transition-colors ${link.iconColor || 'bg-neutral-300'} ${link.hoverColor || 'group-hover/btn:bg-white'}`}
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
                                    <span className="hidden md:inline">{link.name}</span>
                                </a>
                            ))}
                        </div>
                        <div className="text-neutral-300 leading-relaxed text-lg">
                            {item.desc}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}