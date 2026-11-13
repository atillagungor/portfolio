import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Background from "@/components/Background";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
    </>
  );
}