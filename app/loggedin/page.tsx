"use client";
import MobileNav from "@/components/nav/mobileNav";
import { Sidebar } from "@/components/nav/sideBar";
import Tasks from "@/components/workIt/tasks";
import UserProfile from "@/components/workIt/UserProfile";

const LoggedIn = () => {
  return (
    <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
      </div>
    </main>
  );
};
export default LoggedIn;
