import MobileNav from "@/components/nav/mobileNav";
import { Sidebar } from "@/components/nav/sideBar";
import Today from "@/components/uiPages/today";
import Upcoming from "@/components/uiPages/upcoming";

export default function Home() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <Upcoming />
        </main>
      </div>
    </div>
  );
}
