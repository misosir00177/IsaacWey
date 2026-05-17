export default function Experience() {
  const Experiences = [
    {
      id: "01",
      title: "經歷",
      description: "就讀 國立台北科技大學互動設計系媒體設計組",
      tags: ["總召, 專案組長, 學伴", "", ""]
    },
    {
      id: "02",
      title: "專長",
      description: "A",
      tags: ["Unity, C#", "HTML, CSS, JavaScript, Next.js", "Node.js, REST API, Web Socket"]
    },
    {
      id: "03",
      title: "證照與獎項",
      description: "A",
      tags: ["TOEIC, JLPT", "Best in Show", "數位電子乙級"]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 md:px-20 border-t border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between mb-20">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">W h a t   I   D o   /</h2>
        <p className="max-w-md mt-6 md:mt-0 text-neutral-400 leading-relaxed text-sm">
          A
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