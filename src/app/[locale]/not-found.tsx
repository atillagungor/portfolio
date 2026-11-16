import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Background from "@/components/Background";
import Reveal from "@/components/Reveal";

const gradient =
  "bg-[linear-gradient(90deg,var(--accent),#22d3ee)] bg-clip-text text-transparent";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <Background />

      <Reveal>
        <p className="font-mono text-sm text-accent">{t("label")}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1
          className={`mt-4 text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-tighter ${gradient}`}
        >
          404
        </h1>
      </Reveal>
      <Reveal delay={0.2}>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-4 max-w-md text-white/70">{t("description")}</p>
      </Reveal>
      <Reveal delay={0.4}>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-105"
        >
          {t("home")}
        </Link>
      </Reveal>
    </main>
  );
}