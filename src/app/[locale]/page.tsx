import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Background from "@/components/Background";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import JsonLd from "@/components/JsonLd";
import Experience from "@/components/Experience";
import CommandPalette from "@/components/CommandPalette";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return (
    <>
      <JsonLd locale={locale} />
      <Intro />
      <Background />
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
