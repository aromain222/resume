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
    <main className="min-h-screen bg-[#f4f7fb] text-[#0b1628]">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <WhatImBuilding />
      <Ideas />
      <Contact />
      <Footer />
    </main>
  );
}
