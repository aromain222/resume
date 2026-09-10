import SiteTabs from "@/components/SiteTabs";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="grain min-h-screen bg-stage text-bone">
      <CustomCursor />
      <ScrollProgress />
      <SiteTabs />
    </main>
  );
}
