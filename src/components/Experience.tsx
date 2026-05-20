import { span } from "framer-motion/client";

export default function Experience() {
  const Experiences = [
    {
      id: "01",
      title: "經歷",
      description:
        <>
          <span className="text-[#8BC24A]">教育背景</span><br />
          ▮畢業於 臺中市立沙鹿工業高級中等學校電子科<br />
          ▮就讀於 112級國立台北科技大學互動設計系媒體設計組(三年級)<br />
          <br />
          <span className="text-[#8BC24A]">校內經歷</span><br />
          ▮曾任 互動設計系 112年度大一與國際專班聯合期末展演 - 總召(Cheif of Operator)<br />
          ▮曾任 半導體科技碩士學位學程 - 日文學伴<br />
          ▮曾任 互動設計系 XRLab - 互動程式設計課程教材編寫<br />
          ▮曾任 互動設計系 XRLab, Mobius 莫比斯圓環創作公社 - 《超聲體：人魚重奏》Unity程式設計師<br />
          <br />
          <span className="text-[#8BC24A]">工讀經歷</span><br />
          ▮曾任 育達補習班 基本電學/電子學/英文 - 輔導專員<br />
          ▮曾任 育達補習班 日文 - 輔導教師<br />
          ▮曾任 統一超商股份有限公司 - 門市店員<br />
        </>
      ,
      tags: ["電子科畢業, 互動設計系媒體設計組就讀中","總召, 專案組長, 學伴", "輔導專員"]
    },
    {
      id: "02",
      title: "專長",
      description: <>
        <span className="text-[#8BC24A]">前後端開發</span><br />
        ▮利用 React, Next.js, HTML/CSS/Javascript進行前端開發<br />
        ▮利用 Node.js, REST API, Web Socket進行後端開發<br />
        ▮利用 Firebase, MySQL 進行資料庫搭建、管理<br />
        <br />
        <span className="text-[#8BC24A]">Unity開發</span><br />
        ▮2D/3D/XR專案開發(C#)<br />
        ▮以有線/無線串接硬體功能<br />(Arduino, Raspberry Pi, Nintendo Joy-Con, MIDI Controller)<br />
        ▮動畫與視覺特效設計與控制<br />(Animation, Timeline, Particle System, VFX)<br />
        <br />
        <span className="text-[#8BC24A]">電子電路及硬體開發</span><br />
        ▮Arduino, Raspberry Pi開發<br />
        ▮有線通訊技術(I2C, SPI, UART)與無線通訊技術(IOT, Bluetooth)<br />
        ▮電路設計與分析(KiCAD, EAGLE)、PCB設計與印製(KiCAD, JLCPCB)<br />
        <br />
        <span className="text-[#8BC24A]">專案管理、展場規劃、文檔製作</span><br />
        ▮使用Notion之專案排程、文檔製作<br />
        ▮使用Miro之視覺化規劃、團隊討論<br />
        ▮展場電力規劃、動線規劃、空間分配<br />
        <br />
        <span className="text-[#8BC24A]">影音媒體製作</span><br />
        ▮使用Adobe Premiere Pro進行影片剪輯<br />
        ▮使用Adobe Audition 進行音訊剪輯與處理<br />
      </>,
      tags: ["Unity, C#", "HTML, CSS, JavaScript, Next.js, React", "Node.js, REST API, Web Socket","Notion, Miro"]
    },
    {
      id: "03",
      title: "證照與獎項",
      description: <>
          <span className="text-[#8BC24A]">語言證照</span><br />
          ▮日文 JLPT N1<br />
          ▮英文 TOEIC 760<br />
          <br />
          <span className="text-[#8BC24A]">中華民國技術士證照</span><br />
          ▮工業電子丙級<br />
          ▮數位電子乙級<br />
          <br />
          <span className="text-[#8BC24A]">獎項</span><br />
        ▮2024 北科大互動設計系程式設計入門課程遊戲專案競賽 最佳作品獎(Best-In-Show)<br />
        ▮113學年度第2學期 成績優異獎<br />
        </>,
      tags: ["TOEIC, JLPT", "數位電子乙級, 工業電子丙級", "Best-In-Show, 成績優異獎"]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-20 border-t border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between mb-20">
        <h2 className="text-4xl md:text-6xl font-bold uppercase">What    I    Do   /</h2>
        <p className="max-w-lg mt-6 md:mt-0 text-neutral-400 leading-relaxed text-sm">
          我經常擔任專案中的專案管理、前後端開發、Unity開發、硬體開發等多重角色。<br />
          具有跨領域的專業技能與協作經驗，也經常以日/英文擔任與外籍生的溝通橋樑。<br />
          能利用Notion和Miro進行專案管理與視覺化規劃，<br />
          多次以自學以及團隊合作的方式成功完成專案並獲得獎項與師長認可。<br />
      
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-neutral-300">
        {Experiences.map((experience) => (
          <div key={experience.id} className="flex flex-col gap-6 group">
            <div className="text-neutral-600 text-sm font-mono">{experience.id}</div>
            <h3 className="text-2xl font-semibold uppercase tracking-tight">{experience.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{experience.description}</p>
            <ul className="flex flex-col gap-2 mt-auto pt-6 border-t border-neutral-800">
              {experience.tags.map((tag, i) => (
                <li key={i} className="text-xs text-neutral-500 uppercase tracking-wider">{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}