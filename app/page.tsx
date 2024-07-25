import LandingHome from "@/components/uiPages/LandingHome";

export default async function Home() {
  return (
    <main className="relative bg-black dark:bg-black-600 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="h-screen w-screen">
        <LandingHome />
      </div>
    </main>
  );
}
