export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-20 border-t border-neutral-800 flex flex-col md:flex-row justify-between text-sm text-neutral-500 uppercase tracking-widest">
      <div className="flex gap-8 mb-8 md:mb-0">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#works" className="hover:text-white transition-colors">Works</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <div className="flex gap-8 mb-8 md:mb-0">
        <a href="https://www.linkedin.com/in/zunedaalim/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a>
        <a href="https://github.com/zunedaalim" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
      </div>
      <div>
        <span>Isaac Wey 魏直彦 作品集網站</span>
      </div>
    </footer>
  );
}