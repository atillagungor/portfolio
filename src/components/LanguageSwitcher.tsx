"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-2 text-sm">
      {["en", "tr"].map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={l === locale ? "font-bold underline" : "opacity-60"}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}