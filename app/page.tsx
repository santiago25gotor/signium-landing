import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { Objectives } from "@/components/sections/objectives";
import { Technology } from "@/components/sections/technology";
import { Team } from "@/components/sections/team";
import { Vision } from "@/components/sections/vision";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="container pt-8 pb-4">
          <Hero />
        </div>
        <About />
        <ProblemSolution />
        <Objectives />
        <Technology />
        <Team />
        <Vision />
        <Footer />
      </main>
    </>
  );
}
