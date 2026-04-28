import { Navbar }          from "@/components/layout/navbar";
import { Footer }          from "@/components/layout/footer";
import { Hero }            from "@/components/home/hero";
import { About }           from "@/components/home/about";
import { ProblemSolution } from "@/components/home/problem-solution";
import { Objectives }      from "@/components/home/objectives";
import { Technology }      from "@/components/home/technology";
import { Team }            from "@/components/home/team";
import { Vision }          from "@/components/home/vision";

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
