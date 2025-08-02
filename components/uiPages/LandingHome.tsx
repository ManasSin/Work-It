"use client";

import { SignInActon } from "@/actions/auth-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Spotlight } from "../ui/Spotlight";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import { navItems } from "@/utils";
import FloatingNavbar from "../ui/FloatingNavbar";
import {
  Brain,
  Calendar,
  CheckCircle2,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

type Props = {};

function LandingHome({}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (session !== null) {
    router.push("/loggedin");
  }

  return (
    <div className="min-h-screen w-full overflow-auto bg-gradient-to-b from-background to-background/95 relative">
      <FloatingNavbar
        navList={navItems}
        actionLable={`${session ? "Sign Out" : "Login"}`}
      />
      <Hero />
      <Features />
      <AISection />
      <Testimonials />
      <CTASection />
      <Spotlight />
    </div>
  );
}

function Hero() {
  return (
    <div className="relative isolate pt-14 dark:bg-gray-900">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/10 hover:ring-primary/20">
              Announcing our new AI-powered features{" "}
              <a href="#" className="font-semibold text-primary">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <TextGenerateEffect
            words="Transform Your Productivity with AI-Powered Task Management"
            className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          />
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Experience the future of task management. Let AI help you organize,
            prioritize, and accomplish more than ever before.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <form action={SignInActon}>
              <Button size="lg" className="rounded-full px-8">
                Get Started for Free
              </Button>
            </form>
            <Button variant="ghost" size="lg" className="rounded-full">
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      name: "AI-Powered Task Suggestions",
      description:
        "Get intelligent suggestions for task organization and prioritization.",
      icon: Brain,
    },
    {
      name: "Smart Project Management",
      description:
        "Organize tasks into projects with automated categorization.",
      icon: Target,
    },
    {
      name: "Real-time Collaboration",
      description:
        "Work together with your team in real-time with live updates.",
      icon: Users,
    },
    {
      name: "Intelligent Scheduling",
      description:
        "AI helps you schedule tasks at the optimal time for maximum productivity.",
      icon: Calendar,
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Boost Productivity
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage tasks effectively
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Work-It combines powerful task management features with cutting-edge
            AI to help you accomplish more.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group flex flex-col items-start p-6 bg-card hover:bg-card/60 rounded-xl shadow-lg transition-all duration-300 hover:shadow-primary/25"
              >
                <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20 shadow-sm group-hover:shadow-primary/20 transition-shadow">
                  <feature.icon
                    className="h-6 w-6 text-primary group-hover:text-primary/80"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold text-card-foreground">
                  {feature.name}
                </dt>
                <dd className="mt-2 leading-7 text-card-foreground/80">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function AISection() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">
                AI-Powered
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Smart Task Management
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Let artificial intelligence help you organize and prioritize
                your tasks more effectively than ever before.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                <div className="relative pl-9">
                  <dt className="inline font-semibold">
                    <Sparkles
                      className="absolute left-1 top-1 h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    Smart Suggestions
                  </dt>
                  <dd className="inline ml-1">
                    Get AI-powered suggestions for task organization and
                    priority.
                  </dd>
                </div>
                <div className="relative pl-9">
                  <dt className="inline font-semibold">
                    <Brain
                      className="absolute left-1 top-1 h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    Natural Language Processing
                  </dt>
                  <dd className="inline ml-1">
                    Add tasks using natural language and let AI understand and
                    categorize them.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-xl bg-card hover:bg-card/60 shadow-lg transition-all duration-300 hover:shadow-primary/25">
              <div className="p-8">
                {/* Placeholder for AI feature demonstration */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-card/50 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <span className="block text-card-foreground font-medium">
                        Meeting with design team tomorrow at 2 PM
                      </span>
                      <span className="block text-sm text-card-foreground/70 mt-1">
                        AI Suggestion: Added to "Design Project" and set high
                        priority
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-card/50 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <span className="block text-card-foreground font-medium">
                        Review Q3 marketing strategy
                      </span>
                      <span className="block text-sm text-card-foreground/70 mt-1">
                        AI Suggestion: Schedule for Monday morning, high impact
                        task
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-card/50 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <span className="block text-card-foreground font-medium">
                        Prepare sprint retrospective notes
                      </span>
                      <span className="block text-sm text-card-foreground/70 mt-1">
                        AI Suggestion: Added to "Sprint Planning" with medium
                        priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 text-primary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by productivity enthusiasts
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                placeholder: "/images/user-placeholder.png",
                name: "Sarah Chen",
                role: "Product Manager",
                text: "Work-It's AI features have revolutionized how I manage my projects. The smart suggestions are incredibly accurate!",
              },
              {
                placeholder: "/images/user-placeholder.png",
                name: "Mark Thompson",
                role: "Software Engineer",
                text: "The real-time collaboration features make it perfect for our remote team. Plus, the AI helps keep everything organized.",
              },
              {
                placeholder: "/images/user-placeholder.png",
                name: "Lisa Rodriguez",
                role: "Creative Director",
                text: "Finally, a todo app that understands how I work. The AI suggestions help me stay focused on what matters most.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="group rounded-2xl bg-card hover:bg-card/60 p-8 shadow-lg transition-all duration-300 hover:shadow-primary/25"
              >
                <div className="flex items-center space-x-4 mb-4 relative start-0 w-4 h-4 rounded-full">
                  <Image
                    src="/images/user-placeholder.png"
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-lg leading-7 text-card-foreground">
                    {testimonial.text}
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-card-foreground/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="relative isolate mt-16 px-6 py-24 sm:mt-32 sm:py-32 lg:px-8">
      <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
        <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary to-[#9089fc]" />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to transform your productivity?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Join thousands of users who are already experiencing the future of
          task management.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <form action={SignInActon}>
            <Button size="lg" className="rounded-full px-8">
              Get Started Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingHome;
