"use client";
import MobileNav from "@/components/nav/mobileNav";
import { Sidebar } from "@/components/nav/sideBar";
import TodoList from "@/components/uiPages/todoList";

const LoggedIn = () => {
  return (
    <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <TodoList />
      </div>
    </main>
  );
};
export default LoggedIn;
