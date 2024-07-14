"use client";
import Tasks from "@/components/workIt/tasks";
import UserProfile from "@/components/workIt/UserProfile";

const LoggedIn = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Work-It</h1>
      <UserProfile />
      <Tasks />
    </main>
  );
};
export default LoggedIn;
