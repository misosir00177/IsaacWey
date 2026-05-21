import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import FeaturedWorks from "@/components/FeaturedWorks";
import AllWorks from "@/components/AllWorks";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Isaac Wey - Portfolio',
  description: 'Question it, Action it. That\'s my Wey.',
}

export default function Home() {
  return (
    <main className="bg-neutral-950 text-neutral-200 min-h-screen font-sans selection:bg-neutral-200 selection:text-neutral-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <FeaturedWorks />
      <AllWorks />
      <Contact />
      <Footer />
    </main>
  );
}
