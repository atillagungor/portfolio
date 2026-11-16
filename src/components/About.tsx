import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const groups = [
  {
    key: "backend",
    skills: [".NET Core", "C#", "Entity Framework", "SQL", "Redis", "RabbitMQ"],
  },
  {
    key: "frontend",
    skills: ["React", "TypeScript", "Next.js", "JavaScript", "HTML / CSS", "Tailwind CSS"],
  },
  {
    key: "devops",
    skills: ["CI/CD", "TeamCity", "Linux", "Git", "GitHub"],
  },
  {
    key: "practices",
    skills: ["Agile / Scrum", "Clean Code", "Design Patterns"],
  },
] as const;

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-40">
      <Reveal>
        <p className="mb-6 font-mono text-sm text-accent">{t("label")}</p>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.1}>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t("heading")}
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg leading-relaxed text-white/70">{t("body")}</p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-2">
        {groups.map((group, i) => (
          <Reveal key={group.key} delay={(i % 2) * 0.1} className="h-full">
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-accent/50">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                {t(`groups.${group.key}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}