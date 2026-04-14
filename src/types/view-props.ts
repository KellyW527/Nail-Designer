import type { ReactNode, RefObject } from "react";
import type Konva from "konva";
import type { CanvasElement, LocaleCode, Material, Scene } from "@/types";

export interface NavLinkItem {
  href: string;
  label: string;
  active?: boolean;
}

export interface AppFrameViewProps {
  title: string;
  subtitle?: string;
  locale: LocaleCode;
  navItems: NavLinkItem[];
  onChangeLocale: (locale: LocaleCode) => void;
  children: ReactNode;
  actions?: ReactNode;
  variant?: "home" | "library" | "designer" | "subtle";
  showFooter?: boolean;
}

export interface MaterialCardProps {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  onAdd: () => void;
  onToggleFavorite: () => void;
  onPreview: () => void;
}

export interface MaterialSidebarViewProps {
  title: string;
  searchPlaceholder: string;
  previewLabel: string;
  addLabel: string;
  favoriteLabel: string;
  unfavoriteLabel: string;
  search: string;
  categories: string[];
  activeCategory: string;
  materials: MaterialCardProps[];
  emptyState: string;
  onSearchChange: (value: string) => void;
  onSelectCategory: (category: string) => void;
}

export interface UploadHandProps {
  title: string;
  description: string;
  previewUrl: string | null;
  isProcessing: boolean;
  uploadLabel: string;
  replaceLabel: string;
  resetLabel: string;
  helperText: string;
  onUploadHand: (file: File) => void | Promise<void>;
  onResetHand: () => void;
}

export interface SceneSwitcherProps {
  title: string;
  scenes: Scene[];
  activeSceneId: string;
  onChangeScene: (sceneId: string) => void;
}

export interface PropertyPanelProps {
  title: string;
  emptyState: string;
  labels: {
    opacity: string;
    rotation: string;
    scale: string;
    lock: string;
    unlock: string;
    duplicate: string;
    bringForward: string;
    sendBackward: string;
    bringToFront: string;
    sendToBack: string;
    delete: string;
  };
  selectedElement: CanvasElement | null;
  material: Material | null;
  onUpdateElement: (elementId: string, patch: Partial<CanvasElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onDuplicateElement: (elementId: string) => void;
  onToggleLockElement: (elementId: string) => void;
  onReorderElement: (elementId: string, direction: "forward" | "backward" | "front" | "back") => void;
}

export interface DesignerToolbarProps {
  title: string;
  draftName: string;
  isSnapEnabled: boolean;
  saveLabel: string;
  exportLabel: string;
  clearSelectionLabel: string;
  snapLabel: string;
  onSaveDraft: () => void | Promise<void>;
  onExport: () => void | Promise<void>;
  onClearSelection: () => void;
  onToggleSnap: () => void;
}

export interface DesignerCanvasViewProps {
  stageTitle: string;
  sceneUrl: string | null;
  handImageUrl: string | null;
  emptyState: string;
  stageRef: RefObject<Konva.Stage | null>;
  handNailAnchors: { id: string; x: number; y: number; radius: number }[];
  materials: Material[];
  elements: CanvasElement[];
  selectedElementId: string | null;
  showAnchors: boolean;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, patch: Partial<CanvasElement>) => void;
}

export interface HomePageViewProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  secondaryLabel: string;
  cards: Array<{
    title: string;
    description: string;
    href: string;
  }>;
}

export interface DraftListViewProps {
  title: string;
  emptyState: string;
  openLabel: string;
  deleteLabel: string;
  drafts: Array<{
    id: string;
    name: string;
    coverUrl: string;
    updatedAt: string;
    sceneName: string;
    elementCount: number;
  }>;
  onOpenDraft: (id: string) => void;
  onDeleteDraft: (id: string) => void;
}

export interface LibraryPageViewProps {
  title: string;
  subtitle: string;
  sidebar: MaterialSidebarViewProps;
}
