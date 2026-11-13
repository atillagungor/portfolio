import { author, siteUrl } from "@/lib/site";

export default function JsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: locale === "tr" ? "Yazılım Geliştirici" : "Software Developer",
    url: `${siteUrl}/${locale}`,
    sameAs: [author.github, author.linkedin],
    knowsAbout: ["C#", "SQL", "Unity", "TypeScript", "DevOps"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}