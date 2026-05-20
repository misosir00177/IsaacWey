export default function Skills() {
  const skillset = {
    "Languages & Tools": [ "C#", "HTML", "CSS","Python", "C++", "Typescript", "JavaScript", "Postman","MySQL", "Firebase","Git", "GitHub"],
    "Frameworks & Libraries": ["React.js", "Node.js", "Next.js", "TailwindCSS", "Framer Motion"],
    "Softwares": ["Arduino", "Raspberry Pi","Unity","Visual Studio",  "Visual Studio Code","Notion", "Miro", "Adobe Premiere Pro", "Adobe Audition", "KiCAD", "EAGLE"],
    "Communication": ["REST API","Web Socket","Bluetooth", "I2C", "SPI", "UART"],
  };

  return (
    <section className="py-32 px-6 md:px-20 border-t border-neutral-800">
      <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20">Developer / Creator / Project Manager</h2>
      
      <div className="grid md:grid-cols-4 gap-16">
        {Object.entries(skillset).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold uppercase tracking-tight text-neutral-400 mb-8 border-b border-neutral-800 pb-4">{category}</h3>
            <ul className="flex flex-wrap gap-4">
              {skills.map(skill => (
                <li key={skill} className="px-4 py-2 bg-neutral-900 text-neutral-300 text-sm rounded-full border border-neutral-800 tracking-widest">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}