export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-20 border-t border-neutral-800 flex flex-col items-center justify-center text-center">
      <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-8">( C O N T A C T )</h2>
      <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-12">
        Let's <br /> Make <br /> <span className="text-[#8BC24A]">Action</span>
      </h1>
      <p className="text-neutral-400 text-xl md:text-2xl mb-12">A</p>
      <a href="mailto:misosir00177@gmail.com" className="px-10 py-5 bg-white text-black text-lg font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
        Mail
      </a>
    </section>
  );
}