import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import WhatImBuilding from "@/components/WhatImBuilding";
import InProgress from "@/components/InProgress";
import Focused from "@/components/Focused";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100">
      <Navbar />
      <Hero />
      <HowIThink />
      <WhatImBuilding />
      <InProgress />
      <Focused />
      <Contact />
      <Footer />
    </main>
  );
}
