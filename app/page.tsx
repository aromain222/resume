import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatImBuilding from "@/components/WhatImBuilding";
import Experience from "@/components/Experience";
import Ideas from "@/components/Ideas";
import Contact from "@/components/Contact";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="grain min-h-screen bg-stage text-bone">
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <WhatImBuilding />
      <Experience />
      <Ideas />
      <Contact />
    </main>
  );
}
