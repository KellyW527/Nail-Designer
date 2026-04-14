"use client";

import { useRouter, usePathname } from "next/navigation";
import { buildNavItems, mapDraftsToView } from "@/adapters/view-adapters";
import { AppFrameView } from "@/components/views/AppFrameView";
import { MyDesignsPageView } from "@/components/views/MyDesignsPageView";
import { createTranslator } from "@/i18n";
import { useHydrateStore } from "@/hooks/useHydrateStore";
import { useAppStore } from "@/store/useAppStore";

export function MyDesignsPageContainer() {
  useHydrateStore();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const drafts = useAppStore((state) => state.drafts);
  const scenes = useAppStore((state) => state.scenes);
  const onDeleteDraft = useAppStore((state) => state.onDeleteDraft);
  const t = createTranslator(locale);

  return (
    <AppFrameView
      title={t("app.title")}
      subtitle={t("drafts.title")}
      locale={locale}
      navItems={buildNavItems(locale, pathname)}
      onChangeLocale={setLocale}
      variant="subtle"
    >
      <MyDesignsPageView
        title={t("drafts.title")}
        emptyState={t("drafts.empty")}
        openLabel={t("drafts.open")}
        deleteLabel={t("drafts.delete")}
        drafts={mapDraftsToView(drafts, scenes, locale)}
        onOpenDraft={(id) => router.push(`/designer?draftId=${id}`)}
        onDeleteDraft={onDeleteDraft}
      />
    </AppFrameView>
  );
}
