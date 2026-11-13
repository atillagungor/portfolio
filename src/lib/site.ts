// Resolved automatically on Vercel; set NEXT_PUBLIC_SITE_URL once you have a custom domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const author = {
  name: "Atilla Güngör",
  github: "https://github.com/atillagungor",
  linkedin: "https://tr.linkedin.com/in/atilla-gungor",
};