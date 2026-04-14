export type LocaleCode = "en" | "zh";

export type AssetType = "sticker" | "texture" | "pattern" | "decal" | "base" | "overlay" | "decoration" | "set";
export type HandSide = "left" | "right";
export type LightingMode = "studio" | "soft-daylight" | "editorial" | "warm" | "natural" | "cool" | "night";
export type CanvasElementType = "material";
export type ReorderDirection = "forward" | "backward" | "front" | "back";

export interface TransformDefaults {
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
}

export interface Material {
  id: string;
  name: string;
  thumbnail: string;
  assetUrl: string;
  category: string;
  subcategory: string;
  tags: string[];
  colorFamily: string[];
  suitableSkinTones: string[];
  suitableOccasions: string[];
  styleKeywords: string[];
  recommendedNailShapes: string[];
  transformDefaults: TransformDefaults;
  assetType: AssetType;
}

export interface Scene {
  id: string;
  name: string;
  preview: string;
  backgroundUrl: string;
  lightingMode: LightingMode;
  tags: string[];
}

export interface CropMeta {
  wristLineY: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface SegmentationMeta {
  confidence: number;
  method: string;
}

export interface FingerAnchor {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface NailAnchor extends FingerAnchor {
  radius: number;
}

export interface HandImage {
  id: string;
  originalUrl: string;
  processedUrl: string;
  cutoutUrl: string;
  cropMeta: CropMeta;
  segmentationMeta: SegmentationMeta;
  handSide: HandSide;
  fingerAnchors: FingerAnchor[];
  nailAnchors: NailAnchor[];
}

export interface StyleOverrides {
  tint?: string;
  shadow?: boolean;
  blendMode?: string;
}

export interface CanvasElement {
  id: string;
  materialId: string;
  type: CanvasElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  locked: boolean;
  attachedFinger: string | null;
  attachedNail: string | null;
  styleOverrides: StyleOverrides;
}

export interface DesignDraft {
  id: string;
  name: string;
  handImageId: string | null;
  sceneId: string;
  elements: CanvasElement[];
  createdAt: string;
  updatedAt: string;
  coverUrl: string;
  handImage: HandImage | null;
}

export interface EditorSelection {
  elementId: string | null;
}

export interface FilterState {
  category: string;
  colorFamily: string[];
  suitableOccasions: string[];
  styleKeywords: string[];
}

export interface StageSize {
  width: number;
  height: number;
}

export interface ExportOptions {
  fileName?: string;
  pixelRatio?: number;
}

export interface PreferencesState {
  locale: LocaleCode;
  exportPixelRatio: number;
  favorites: string[];
  recentMaterialIds: string[];
}
