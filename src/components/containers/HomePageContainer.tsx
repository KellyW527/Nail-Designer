"use client";

import { usePathname } from "next/navigation";
import { buildNavItems } from "@/adapters/view-adapters";
import { AppFrameView } from "@/components/views/AppFrameView";
import { HomePageView } from "@/components/views/HomePageView";
import { createTranslator } from "@/i18n";
import { useHydrateStore } from "@/hooks/useHydrateStore";
import { useAppStore } from "@/store/useAppStore";

export function HomePageContainer() {
  useHydrateStore();

  const pathname = usePathname();
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const t = createTranslator(locale);

  return (
    <AppFrameView
      title={t("app.title")}
      subtitle={t("app.subtitle")}
      locale={locale}
      navItems={buildNavItems(locale, pathname)}
      onChangeLocale={setLocale}
      variant="home"
    >
      <HomePageView
        title={t("home.title")}
        subtitle={t("home.subtitle")}
        ctaLabel={t("home.cta")}
        secondaryLabel={t("home.secondary")}
        cards={[
          {
            title: t("home.cards.libraryTitle"),
            description: t("home.cards.libraryDescription"),
            href: "/library",
          },
          {
            title: t("home.cards.designerTitle"),
            description: t("home.cards.designerDescription"),
            href: "/designer",
          },
          {
            title: t("home.cards.draftsTitle"),
            description: t("home.cards.draftsDescription"),
            href: "/my-designs",
          },
        ]}
      />
    </AppFrameView>
  );
}
