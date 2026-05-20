"use client";
import { motion } from "framer-motion";
import IssacImg from "../../public/img/Isaac/Isaac.png";

const tags = ["Full-Stack","C#", "Unity","Arduino","IOT", "Project Manager/Leader", "Bilingual"];

// Marker Effect
function HighlightText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block font-extrabold group cursor-default">
      <span className="text-neutral-300">{children}</span>
      {/* Phone: Automatic Fill when in View */}
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-0 top-0 text-[#8BC24A] overflow-hidden whitespace-nowrap md:!hidden"
      >
        {children}
      </motion.span>
      {/* PC: Hover Fill */}
      <span className="absolute left-0 top-0 text-[#8BC24A] overflow-hidden whitespace-nowrap w-0 transition-[width] duration-500 ease-out group-hover:w-full hidden md:block">
        {children}
      </span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-20 grid md:grid-cols-2 gap-2 border-t border-neutral-800">
      
      <div className="flex flex-col items-center justify-center gap-10">
        <p className="text-5xl md:text-10xl font-bold uppercase tracking-tighter leading-[0.85]">
            Question it, <br /> <span className="text-[#8BC24A]">Action</span> it.
          </p>
        <div className="w-[30vw] h-[40vw] md:w-[20vw] md:h-[26.66vw] bg-neutral-900 rounded-3xl overflow-hidden relative">
          <img src={IssacImg.src} alt="About Me Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="md:py-30 flex flex-col items-center justify-center">
          <h2 className="center text-sm uppercase tracking-widest text-neutral-500 mb-8 ">[ABOUT   ME]</h2>
          <ul className="flex flex-wrap gap-4 md:py-5">
          {Object.values(tags).map(tag => (
            <li key={tag} className="px-4 py-2 bg-neutral-900 text-neutral-300 text-sm rounded-full border border-neutral-800 uppercase tracking-widest">{tag}</li>
          ))}       
        </ul>
        <div className="py-10 md:py-5 flex flex-col justify-center gap-8 text-lg md:text-lg leading-relaxed text-neutral-300">
        <p>
            您好！我是魏直彦。<br />
            國立臺北科技大學互動設計系三年級學生，<br />
            專長於前端軟硬體開發、專案企劃與策畫領導。<br />
            因為「彦」字是日文常用漢字，常被系統顯示成問號，<br />
            所以朋友們也常叫我「魏直問號」。<br />
            我很喜歡這個綽號，象徵著好奇心與追求答案的精神。<br />
            我樂於幫助他人解決問題，無論是軟硬體專案、課堂或行政事務。<br />
            我擅長<HighlightText>用多語言的溝通、策畫領導能力</HighlightText>，使他人從「疑問」變為感到「驚嘆」，<br />
            因此有幸於<HighlightText>系上與國際專班合作之展覽擔任總召職位</HighlightText>。<br />
            我也經常在系上課堂專案、實驗室項目中擔任專案領導、軟硬體工程師的角色，<br />
            曾經帶領團隊製作「學分勇者」<br />奪得由北科大互動設計系、清華大學藝術學院科技藝術所、不或娛樂組成之<br />評審團合頒 - <HighlightText>最佳作品獎(Best-In-Show)</HighlightText>。<br />
            也經過師長認可，獲得加入<HighlightText>NTUT XRLab</HighlightText>的機會，協助研究生學長姐的專案開發。<br />
            我相信自己能<HighlightText>把人們的「問號」轉變成「驚嘆號」</HighlightText>，也希望自己能在適合的環境下發揮這樣的特質，帶來價值與驚喜。
        </p>
        
      </div>
        </div>
      
    </section>
  );
}