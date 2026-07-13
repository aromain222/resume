import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import WhatImBuilding from "@/components/WhatImBuilding";
import Experience from "@/components/Experience";
import Ideas from "@/components/Ideas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f7f4] text-[#0f0f0f]">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <WhatImBuilding />
      <Experience />
      <Ideas />
      <Contact />
      <Footer />
    </main>
  );
}
