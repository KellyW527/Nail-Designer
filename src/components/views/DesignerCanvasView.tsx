"use client";

import { useEffect, useMemo, useRef } from "react";
import { Image as KonvaImage, Layer, Rect, Stage, Transformer } from "react-konva";
import type Konva from "konva";
import { useImageAsset } from "@/hooks/useImageAsset";
import type { DesignerCanvasViewProps } from "@/types/view-props";

function CanvasScene({ src }: { src: string | null }) {
  const image = useImageAsset(src);
  if (!image) return <Rect width={1024} height={768} fill="#f8fafc" />;
  return <KonvaImage image={image} width={1024} height={768} listening={false} />;
}

function CanvasHand({ src }: { src: string | null }) {
  const image = useImageAsset(src);
  if (!image) return null;
  return (
    <KonvaImage
      image={image}
      x={220}
      y={110}
      width={340}
      height={500}
      cornerRadius={40}
      listening={false}
    />
  );
}

export function DesignerCanvasView({
  stageTitle,
  sceneUrl,
  handImageUrl,
  emptyState,
  stageRef,
  handNailAnchors,
  materials,
  elements,
  selectedElementId,
  showAnchors,
  onSelectElement,
  onUpdateElement,
}: DesignerCanvasViewProps) {
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const nodeRefs = useRef<Record<string, Konva.Image | null>>({});

  const materialMap = useMemo(
    () => Object.fromEntries(materials.map((material) => [material.id, material])),
    [materials],
  );

  useEffect(() => {
    const transformer = transformerRef.current;
    const node = selectedElementId ? nodeRefs.current[selectedElementId] : null;

    if (transformer) {
      transformer.nodes(node ? [node] : []);
      transformer.getLayer()?.batchDraw();
    }
  }, [selectedElementId, elements]);

  return (
    <section className="panel canvas-panel">
      <div className="panel-header">
        <h3>{stageTitle}</h3>
      </div>

      <div className="canvas-shell">
        {!handImageUrl && elements.length === 0 ? <div className="canvas-empty-overlay">{emptyState}</div> : null}
        <Stage
          width={1024}
          height={768}
          ref={stageRef}
          onMouseDown={(event) => {
            if (event.target === event.target.getStage()) {
              onSelectElement(null);
            }
          }}
        >
          <Layer>
            <CanvasScene src={sceneUrl} />
          </Layer>
          <Layer>
            <CanvasHand src={handImageUrl} />
          </Layer>
          <Layer>
            {elements
              .slice()
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((element) => (
                <MaterialNode
                  key={element.id}
                  element={element}
                  src={materialMap[element.materialId]?.assetUrl ?? null}
                  selected={selectedElementId === element.id}
                  onSelect={() => onSelectElement(element.id)}
                  onUpdate={(patch) => onUpdateElement(element.id, patch)}
                  registerNode={(node) => {
                    nodeRefs.current[element.id] = node;
                  }}
                />
              ))}
            <Transformer ref={transformerRef} rotateEnabled enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]} />
          </Layer>
          {showAnchors ? (
            <Layer listening={false}>
              {handNailAnchors.map((anchor) => (
                <Rect
                  key={anchor.id}
                  x={anchor.x - anchor.radius}
                  y={anchor.y - anchor.radius}
                  width={anchor.radius * 2}
                  height={anchor.radius * 2}
                  cornerRadius={anchor.radius}
                  stroke="#0f766e"
                  dash={[6, 6]}
                  opacity={0.45}
                />
              ))}
            </Layer>
          ) : null}
        </Stage>
      </div>
    </section>
  );
}

function MaterialNode({
  element,
  src,
  selected,
  onSelect,
  onUpdate,
  registerNode,
}: {
  element: DesignerCanvasViewProps["elements"][number];
  src: string | null;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (patch: Partial<DesignerCanvasViewProps["elements"][number]>) => void;
  registerNode: (node: Konva.Image | null) => void;
}) {
  const image = useImageAsset(src);

  if (!image) return null;

  return (
    <KonvaImage
      ref={registerNode}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      scaleX={element.scaleX}
      scaleY={element.scaleY}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable={!element.locked}
      stroke={selected ? "#0f766e" : undefined}
      strokeWidth={selected ? 2 : 0}
      shadowBlur={selected ? 14 : 0}
      shadowOpacity={selected ? 0.18 : 0}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(event) => onUpdate({ x: event.target.x(), y: event.target.y() })}
      onTransformEnd={(event) => {
        const node = event.target;
        onUpdate({
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scaleX: node.scaleX(),
          scaleY: node.scaleY(),
        });
      }}
    />
  );
}
