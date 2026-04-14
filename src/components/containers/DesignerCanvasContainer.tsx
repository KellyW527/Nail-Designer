"use client";

import type { RefObject } from "react";
import type Konva from "konva";
import { useMemo } from "react";
import { DesignerCanvasView } from "@/components/views/DesignerCanvasView";
import { createTranslator } from "@/i18n";
import { sceneService } from "@/services/sceneService";
import { useAppStore } from "@/store/useAppStore";

export function DesignerCanvasContainer({
  stageRef,
}: {
  stageRef: RefObject<Konva.Stage | null>;
}) {
  const locale = useAppStore((state) => state.locale);
  const currentSceneId = useAppStore((state) => state.currentSceneId);
  const currentHandImage = useAppStore((state) => state.currentHandImage);
  const materials = useAppStore((state) => state.materials);
  const elements = useAppStore((state) => state.elements);
  const selectedElementId = useAppStore((state) => state.selectedElementId);
  const snapEnabled = useAppStore((state) => state.snapEnabled);
  const onSelectElement = useAppStore((state) => state.onSelectElement);
  const onUpdateElement = useAppStore((state) => state.onUpdateElement);
  const t = createTranslator(locale);

  const scene = useMemo(() => sceneService.getSceneById(currentSceneId), [currentSceneId]);

  return (
    <DesignerCanvasView
      stageTitle={t("designer.stage")}
      sceneUrl={scene?.backgroundUrl ?? null}
      handImageUrl={currentHandImage?.processedUrl ?? null}
      emptyState={t("designer.canvasEmpty")}
      stageRef={stageRef}
      handNailAnchors={currentHandImage?.nailAnchors ?? []}
      materials={materials}
      elements={elements}
      selectedElementId={selectedElementId}
      showAnchors={snapEnabled}
      onSelectElement={onSelectElement}
      onUpdateElement={onUpdateElement}
    />
  );
}
