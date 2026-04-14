"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { mapMaterialToCardProps } from "@/adapters/view-adapters";
import { MaterialSidebarView } from "@/components/views/MaterialSidebarView";
import { createTranslator } from "@/i18n";
import { materialService } from "@/services/materialService";
import { useAppStore } from "@/store/useAppStore";

export function MaterialSidebarContainer({ mode = "library" }: { mode?: "library" | "designer" }) {
  const router = useRouter();
  const locale = useAppStore((state) => state.locale);
  const favorites = useAppStore((state) => state.favorites);
  const search = useAppStore((state) => state.search);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setSearch = useAppStore((state) => state.setSearch);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const onAddMaterial = useAppStore((state) => state.onAddMaterial);
  const materials = useAppStore((state) => state.materials);
  const t = createTranslator(locale);

  const filteredMaterials = useMemo(
    () =>
      materialService.listMaterials({
        category: selectedCategory === t("library.all") ? "All" : selectedCategory,
        search,
      }),
    [search, selectedCategory, t],
  );

  const categories = useMemo(
    () => [t("library.all"), ...new Set(materials.map((material) => material.category))],
    [materials, t],
  );

  return (
    <MaterialSidebarView
      title={t("library.panelTitle")}
      searchPlaceholder={t("library.searchPlaceholder")}
      previewLabel={t("library.preview")}
      addLabel={t("library.add")}
      favoriteLabel={t("library.favorite")}
      unfavoriteLabel={t("library.unfavorite")}
      search={search}
      categories={categories}
      activeCategory={selectedCategory === "All" ? t("library.all") : selectedCategory}
      emptyState={t("library.empty")}
      onSearchChange={setSearch}
      onSelectCategory={(category) => setSelectedCategory(category === t("library.all") ? "All" : category)}
      materials={filteredMaterials.map((material) =>
        mapMaterialToCardProps(material, favorites.includes(material.id), {
          onAdd: () => {
            if (mode === "library") {
              router.push(`/designer?materialId=${material.id}`);
              return;
            }

            onAddMaterial(material.id);
          },
          onToggleFavorite: () => toggleFavorite(material.id),
          onPreview: () => window.alert(`${material.name}\n${material.tags.join(", ")}`),
        }),
      )}
    />
  );
}
