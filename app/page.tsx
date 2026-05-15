import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import WhatImBuilding from "@/components/WhatImBuilding";
import InProgress from "@/components/InProgress";
import Ideas from "@/components/Ideas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FootballAnimation from "@/components/FootballAnimation";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f7f4] text-[#0f0f0f]">
      <ScrollProgress />
      <FootballAnimation />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <WhatImBuilding />
      <InProgress />
      <Ideas />
      <Contact />
      <Footer />
    </main>
  );
}
