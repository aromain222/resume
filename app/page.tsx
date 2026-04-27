import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatImBuilding from "@/components/WhatImBuilding";
import InProgress from "@/components/InProgress";
import Ideas from "@/components/Ideas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100">
      <Navbar />
      <Hero />
      <About />
      <WhatImBuilding />
      <InProgress />
      <Ideas />
      <Contact />
      <Footer />
    </main>
  );
}
