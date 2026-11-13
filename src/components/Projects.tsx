import { useTranslations } from "next-intl";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-40">
      <Reveal>
        <p className="mb-6 font-mono text-sm text-accent">{t("label")}</p>
      </Reveal>

      <div className="mb-16 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <Reveal delay={0.1}>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t("heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg text-white/70">{t("subtitle")}</p>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.key} delay={(i % 2) * 0.1} className="h-full">
            <ProjectCard
              index={i}
              title={t(`items.${project.key}.title`)}
              description={t(`items.${project.key}.description`)}
              tags={project.tags}
              href={project.href}
              gradient={project.gradient}
              viewLabel={t("view")}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}