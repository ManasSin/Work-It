import LandingHome, {
  AISection,
  CTASection,
  Features,
  Testimonials,
} from "@/components/uiPages/LandingHome";
import { Spotlight } from "../components/ui/Spotlight";

export default function Home() {
  return (
    <main className="relative bg-black dark:bg-black-600 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="min-h-screen min-w-screen relative overflow-auto w-screen h-screen ">
        <LandingHome />
        <Features />
        <AISection />
        <Testimonials />
        <CTASection />
      </div>
    </main>
  );
}
