"use client";

import { create } from "zustand";
import { createId } from "@/lib/id";
import { mockScenes } from "@/mock/scenes";
import { exportService } from "@/services/exportService";
import { handImageService } from "@/services/handImageService";
import { materialService } from "@/services/materialService";
import { sceneService } from "@/services/sceneService";
import { snapService } from "@/services/snapService";
import { storageService } from "@/services/storageService";
import type {
  CanvasElement,
  DesignDraft,
  HandImage,
  LocaleCode,
  Material,
  PreferencesState,
  ReorderDirection,
  Scene,
  StageSize,
} from "@/types";
import type Konva from "konva";

export interface EditorStoreState {
  locale: LocaleCode;
  exportPixelRatio: number;
  materials: Material[];
  scenes: Scene[];
  drafts: DesignDraft[];
  favorites: string[];
  recentMaterialIds: string[];
  search: string;
  selectedCategory: string;
  currentSceneId: string;
  currentHandImage: HandImage | null;
  elements: CanvasElement[];
  selectedElementId: string | null;
  currentDraftId: string | null;
  snapEnabled: boolean;
  isProcessingHand: boolean;
  hasHydrated: boolean;
  stageSize: StageSize;
  setLocale: (locale: LocaleCode) => void;
  setSearch: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  hydrate: () => void;
  toggleFavorite: (materialId: string) => void;
  onUploadHand: (file: File) => Promise<void>;
  onReplaceHand: (file: File) => Promise<void>;
  onResetHand: () => void;
  onAddMaterial: (materialId: string) => void;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, patch: Partial<CanvasElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (elementId: string) => void;
  onReorderElement: (elementId: string, direction: ReorderDirection) => void;
  onToggleLockElement: (elementId: string) => void;
  onChangeScene: (sceneId: string) => void;
  onSaveDraft: (coverUrl?: string) => DesignDraft | null;
  onLoadDraft: (draftId: string) => void;
  onDeleteDraft: (draftId: string) => void;
  onExport: (stage: Konva.Stage | null) => string | null;
  onToggleSnap: () => void;
  applyDesignerParams: (params: { materialId?: string | null; draftId?: string | null }) => void;
}

const buildPreferences = (state: EditorStoreState): PreferencesState => ({
  locale: state.locale,
  exportPixelRatio: state.exportPixelRatio,
  favorites: state.favorites,
  recentMaterialIds: state.recentMaterialIds,
});

const reorderElements = (
  elements: CanvasElement[],
  elementId: string,
  direction: ReorderDirection,
) => {
  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  const index = sorted.findIndex((item) => item.id === elementId);

  if (index < 0) return elements;

  const target = sorted[index];
  const move = (nextIndex: number) => {
    const clone = [...sorted];
    clone.splice(index, 1);
    clone.splice(nextIndex, 0, target);
    return clone.map((item, order) => ({ ...item, zIndex: order }));
  };

  switch (direction) {
    case "forward":
      return move(Math.min(sorted.length - 1, index + 1));
    case "backward":
      return move(Math.max(0, index - 1));
    case "front":
      return move(sorted.length - 1);
    case "back":
      return move(0);
    default:
      return elements;
  }
};

const createElementFromMaterial = (material: Material, zIndex: number): CanvasElement => ({
  id: createId("element"),
  materialId: material.id,
  type: "material",
  x: 660 + zIndex * 6,
  y: 160 + zIndex * 8,
  width: material.transformDefaults.width,
  height: material.transformDefaults.height,
  scaleX: material.transformDefaults.scaleX,
  scaleY: material.transformDefaults.scaleY,
  rotation: material.transformDefaults.rotation,
  opacity: material.transformDefaults.opacity,
  zIndex,
  locked: false,
  attachedFinger: null,
  attachedNail: null,
  styleOverrides: {},
});

export const useAppStore = create<EditorStoreState>((set, get) => ({
  locale: "zh",
  exportPixelRatio: 2,
  materials: materialService.listMaterials(),
  scenes: sceneService.listScenes(),
  drafts: [],
  favorites: [],
  recentMaterialIds: [],
  search: "",
  selectedCategory: "All",
  currentSceneId: mockScenes[0].id,
  currentHandImage: null,
  elements: [],
  selectedElementId: null,
  currentDraftId: null,
  snapEnabled: true,
  isProcessingHand: false,
  hasHydrated: false,
  stageSize: { width: 1024, height: 768 },

  setLocale(locale) {
    set({ locale });
    storageService.savePreferences(buildPreferences(get()));
  },

  setSearch(value) {
    set({ search: value });
  },

  setSelectedCategory(value) {
    set({ selectedCategory: value });
  },

  hydrate() {
    if (get().hasHydrated) return;

    const storedDrafts = storageService.listDrafts();
    const storedPreferences = storageService.loadPreferences();

    set({
      drafts: storedDrafts,
      locale: storedPreferences?.locale ?? get().locale,
      exportPixelRatio: storedPreferences?.exportPixelRatio ?? get().exportPixelRatio,
      favorites: storedPreferences?.favorites ?? [],
      recentMaterialIds: storedPreferences?.recentMaterialIds ?? [],
      hasHydrated: true,
    });
  },

  toggleFavorite(materialId) {
    const favorites = get().favorites.includes(materialId)
      ? get().favorites.filter((id) => id !== materialId)
      : [materialId, ...get().favorites];

    set({ favorites });
    storageService.savePreferences(buildPreferences(get()));
  },

  async onUploadHand(file) {
    set({ isProcessingHand: true });
    const handImage = await handImageService.uploadLocalFile(file);
    set({ currentHandImage: handImage, isProcessingHand: false });
  },

  async onReplaceHand(file) {
    await get().onUploadHand(file);
  },

  onResetHand() {
    set({ currentHandImage: null });
  },

  onAddMaterial(materialId) {
    const material = materialService.getMaterialById(materialId);
    if (!material) return;

    const nextElement = createElementFromMaterial(material, get().elements.length);
    const recentMaterialIds = [materialId, ...get().recentMaterialIds.filter((id) => id !== materialId)].slice(0, 8);

    set({
      elements: [...get().elements, nextElement],
      selectedElementId: nextElement.id,
      recentMaterialIds,
    });

    storageService.savePreferences(buildPreferences(get()));
  },

  onSelectElement(elementId) {
    set({ selectedElementId: elementId });
  },

  onUpdateElement(elementId, patch) {
    const currentHandImage = get().currentHandImage;
    const snapEnabled = get().snapEnabled;

    set({
      elements: get().elements.map((element) => {
        if (element.id !== elementId) return element;

        const nextElement = { ...element, ...patch };

        if (!snapEnabled || !currentHandImage) {
          return nextElement;
        }

        const anchor = snapService.findNearestNailAnchor(nextElement, currentHandImage);

        if (!anchor) {
          return { ...nextElement, attachedFinger: null, attachedNail: null };
        }

        return {
          ...nextElement,
          x: anchor.x - (nextElement.width * nextElement.scaleX) / 2,
          y: anchor.y - (nextElement.height * nextElement.scaleY) / 2,
          attachedFinger: anchor.id,
          attachedNail: anchor.id,
        };
      }),
    });
  },

  onDeleteElement(elementId) {
    const nextElements = get().elements.filter((element) => element.id !== elementId).map((element, index) => ({
      ...element,
      zIndex: index,
    }));
    set({
      elements: nextElements,
      selectedElementId: get().selectedElementId === elementId ? null : get().selectedElementId,
    });
  },

  onDuplicateElement(elementId) {
    const element = get().elements.find((item) => item.id === elementId);
    if (!element) return;

    const clone: CanvasElement = {
      ...element,
      id: createId("element"),
      x: element.x + 26,
      y: element.y + 18,
      zIndex: get().elements.length,
      attachedFinger: null,
      attachedNail: null,
    };

    set({
      elements: [...get().elements, clone],
      selectedElementId: clone.id,
    });
  },

  onReorderElement(elementId, direction) {
    set({
      elements: reorderElements(get().elements, elementId, direction),
    });
  },

  onToggleLockElement(elementId) {
    set({
      elements: get().elements.map((element) =>
        element.id === elementId ? { ...element, locked: !element.locked } : element,
      ),
    });
  },

  onChangeScene(sceneId) {
    set({ currentSceneId: sceneId });
  },

  onSaveDraft(coverUrl) {
    const state = get();
    const existingDraft = state.currentDraftId
      ? state.drafts.find((item) => item.id === state.currentDraftId) ?? null
      : null;
    const now = new Date().toISOString();
    const draft: DesignDraft = {
      id: state.currentDraftId ?? createId("draft"),
      name:
        existingDraft?.name ?? `${state.locale === "zh" ? "设计草稿" : "Design Draft"} ${state.drafts.length + 1}`,
      handImageId: state.currentHandImage?.id ?? null,
      sceneId: state.currentSceneId,
      elements: state.elements,
      createdAt: existingDraft?.createdAt ?? now,
      updatedAt: now,
      coverUrl: coverUrl ?? sceneService.getSceneById(state.currentSceneId)?.preview ?? "",
      handImage: state.currentHandImage,
    };

    const drafts = storageService.saveDraft(draft);
    set({ drafts, currentDraftId: draft.id });
    return draft;
  },

  onLoadDraft(draftId) {
    const draft = storageService.loadDraft(draftId);
    if (!draft) return;

    set({
      currentDraftId: draft.id,
      currentSceneId: draft.sceneId,
      currentHandImage: draft.handImage,
      elements: draft.elements,
      selectedElementId: null,
    });
  },

  onDeleteDraft(draftId) {
    const drafts = storageService.deleteDraft(draftId);
    set({
      drafts,
      currentDraftId: get().currentDraftId === draftId ? null : get().currentDraftId,
    });
  },

  onExport(stage) {
    return exportService.exportStageToPng(stage, {
      pixelRatio: get().exportPixelRatio,
      fileName: "nail-designer-export.png",
    });
  },

  onToggleSnap() {
    set({ snapEnabled: !get().snapEnabled });
  },

  applyDesignerParams(params) {
    const { materialId, draftId } = params;

    if (draftId) {
      get().onLoadDraft(draftId);
      return;
    }

    if (materialId && !get().elements.some((element) => element.materialId === materialId)) {
      get().onAddMaterial(materialId);
    }
  },
}));
