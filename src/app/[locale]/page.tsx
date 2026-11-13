import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Background from "@/components/Background";

export default function Home() {
  return (
    <>
      <Intro />
      <Background />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}