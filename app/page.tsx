import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatImBuilding from "@/components/WhatImBuilding";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100">
      <Navbar />
      <Hero />
      <WhatImBuilding />
      <Contact />
      <Footer />
    </main>
  );
}
