export type Project = {
  key: string;
  tags: readonly string[];
  href: string;
  gradient: string;
  image?: string;
};

export const projects: Project[] = [
  {
    key: "pocketflow",
    tags: ["Next.js", "TypeScript", "Recharts", "Zustand"],
    href: "https://github.com/atillagungor/pocketflow",
    image: "/projects/pocketflow.png",
    gradient: "linear-gradient(135deg, #22c55e, #22d3ee)",
  },
  {
    key: "portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/atillagungor/portfolio",
    gradient: "linear-gradient(135deg, #7c5cff, #22d3ee)",
  },
  {
    key: "api",
    tags: ["C#", ".NET", "SQL"],
    href: "https://github.com/atillagungor",
    gradient: "linear-gradient(135deg, #22d3ee, #3b82f6)",
  },
  {
    key: "pipeline",
    tags: ["Docker", "CI/CD", "GitHub Actions"],
    href: "https://github.com/atillagungor",
    gradient: "linear-gradient(135deg, #34d399, #22d3ee)",
  },
];