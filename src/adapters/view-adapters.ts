import { createTranslator } from "@/i18n";
import type { DesignDraft, LocaleCode, Material, Scene } from "@/types";
import type { DraftListViewProps, MaterialCardProps, NavLinkItem } from "@/types/view-props";

export const buildNavItems = (locale: LocaleCode, pathname: string): NavLinkItem[] => {
  const t = createTranslator(locale);

  return [
    { href: "/", label: t("app.nav.home"), active: pathname === "/" },
    { href: "/library", label: t("app.nav.library"), active: pathname.startsWith("/library") },
    { href: "/designer", label: t("app.nav.designer"), active: pathname.startsWith("/designer") },
    { href: "/my-designs", label: t("app.nav.myDesigns"), active: pathname.startsWith("/my-designs") },
  ];
};

export const mapMaterialToCardProps = (
  material: Material,
  isFavorite: boolean,
  handlers: Pick<MaterialCardProps, "onAdd" | "onToggleFavorite" | "onPreview">,
): MaterialCardProps => ({
  id: material.id,
  name: material.name,
  thumbnail: material.thumbnail,
  category: material.category,
  tags: material.tags,
  isFavorite,
  ...handlers,
});

export const mapDraftsToView = (
  drafts: DesignDraft[],
  scenes: Scene[],
  locale: LocaleCode,
): DraftListViewProps["drafts"] =>
  drafts.map((draft) => ({
    id: draft.id,
    name: draft.name,
    coverUrl: draft.coverUrl,
    updatedAt: new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(draft.updatedAt)),
    sceneName: scenes.find((scene) => scene.id === draft.sceneId)?.name ?? draft.sceneId,
    elementCount: draft.elements.length,
  }));
