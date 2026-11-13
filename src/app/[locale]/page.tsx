import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");

  return (
    <main className="p-8">
      <LanguageSwitcher />
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </main>
  );
}