"use client";

import { usePathname, useRouter } from "next/navigation";
import { buildNavItems } from "@/adapters/view-adapters";
import { AppFrameView } from "@/components/views/AppFrameView";
import { LibraryPageView } from "@/components/views/LibraryPageView";
import { createTranslator } from "@/i18n";
import { useHydrateStore } from "@/hooks/useHydrateStore";
import { useAppStore } from "@/store/useAppStore";

export function LibraryPageContainer() {
  useHydrateStore();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const search = useAppStore((state) => state.search);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setSearch = useAppStore((state) => state.setSearch);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const materials = useAppStore((state) => state.materials);
  const t = createTranslator(locale);

  return (
    <AppFrameView
      title={t("app.title")}
      subtitle={t("library.subtitle")}
      locale={locale}
      navItems={buildNavItems(locale, pathname)}
      onChangeLocale={setLocale}
      variant="library"
    >
      <LibraryPageView
        title={t("library.title")}
        subtitle={t("library.subtitle")}
        sidebar={{
          title: t("library.panelTitle"),
          searchPlaceholder: t("library.searchPlaceholder"),
          previewLabel: t("library.preview"),
          addLabel: t("library.add"),
          favoriteLabel: t("library.favorite"),
          unfavoriteLabel: t("library.unfavorite"),
          search,
          categories: [t("library.all"), ...new Set(materials.map((material) => material.category))],
          activeCategory: selectedCategory === "All" ? t("library.all") : selectedCategory,
          emptyState: t("library.empty"),
          onSearchChange: setSearch,
          onSelectCategory: (category) => setSelectedCategory(category === t("library.all") ? "All" : category),
          materials: materials
            .filter(
              (material) =>
                ((selectedCategory === t("library.all") || selectedCategory === "All") ||
                  material.category === selectedCategory) &&
                [material.name, material.category, ...material.tags, ...material.styleKeywords]
                  .join(" ")
                  .toLowerCase()
                  .includes(search.toLowerCase()),
            )
            .map((material) => ({
              id: material.id,
              name: material.name,
              thumbnail: material.thumbnail,
              category: material.category,
              tags: material.tags,
              isFavorite: favorites.includes(material.id),
              onAdd: () => router.push(`/designer?materialId=${material.id}`),
              onToggleFavorite: () => toggleFavorite(material.id),
              onPreview: () => window.alert(`${material.name}\n${material.tags.join(", ")}`),
            })),
        }}
      />
    </AppFrameView>
  );
}
