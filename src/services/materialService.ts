import { mockMaterials } from "@/mock/materials";
import type { Material } from "@/types";

export interface MaterialFiltersInput {
  category?: string;
  search?: string;
}

const matchesQuery = (material: Material, search: string) => {
  const query = search.toLowerCase().trim();

  if (!query) return true;

  return [
    material.name,
    material.category,
    material.subcategory,
    ...material.tags,
    ...material.styleKeywords,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
};

export const materialService = {
  listMaterials(filters: MaterialFiltersInput = {}) {
    return mockMaterials.filter((material) => {
      const categoryPass =
        !filters.category || filters.category === "All" || material.category === filters.category;

      return categoryPass && matchesQuery(material, filters.search ?? "");
    });
  },

  getMaterialById(id: string) {
    return mockMaterials.find((material) => material.id === id) ?? null;
  },

  searchMaterials(query: string) {
    return materialService.listMaterials({ search: query });
  },
};
