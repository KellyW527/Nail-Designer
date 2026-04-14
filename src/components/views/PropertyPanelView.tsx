import { Copy, Layers, Lock, RotateCw, Scaling, Trash2 } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { PropertyPanelProps } from "@/types/view-props";

export function PropertyPanelView({
  title,
  emptyState,
  labels,
  selectedElement,
  material,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement,
  onToggleLockElement,
  onReorderElement,
}: PropertyPanelProps) {
  if (!selectedElement || !material) {
    return (
      <GlassPanelView className="panel">
        <div className="panel-header">
          <div>
            <p className="panel-kicker">Properties</p>
            <h3>{title}</h3>
          </div>
        </div>
        <div className="empty-card">{emptyState}</div>
      </GlassPanelView>
    );
  }

  return (
    <GlassPanelView className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Properties</p>
          <h3>{title}</h3>
          <p className="muted-text">{material.name}</p>
        </div>
      </div>

      <label className="form-field">
        <span className="field-label"><span>{labels.opacity}</span><span>{Math.round(selectedElement.opacity * 100)}%</span></span>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.01"
          value={selectedElement.opacity}
          onChange={(event) =>
            onUpdateElement(selectedElement.id, { opacity: Number(event.target.value) })
          }
        />
      </label>

      <label className="form-field">
        <span className="field-label"><RotateCw size={14} /> <span>{labels.rotation}</span></span>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={selectedElement.rotation}
          onChange={(event) =>
            onUpdateElement(selectedElement.id, { rotation: Number(event.target.value) })
          }
        />
      </label>

      <label className="form-field">
        <span className="field-label"><Scaling size={14} /> <span>{labels.scale}</span></span>
        <input
          type="range"
          min="0.3"
          max="3"
          step="0.05"
          value={selectedElement.scaleX}
          onChange={(event) => {
            const scale = Number(event.target.value);
            onUpdateElement(selectedElement.id, { scaleX: scale, scaleY: scale });
          }}
        />
      </label>

      <div className="stack gap-sm">
        <button
          type="button"
          className="secondary-button"
          onClick={() => onToggleLockElement(selectedElement.id)}
        >
          <Lock size={14} />
          {selectedElement.locked ? labels.unlock : labels.lock}
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => onDuplicateElement(selectedElement.id)}
        >
          <Copy size={14} />
          {labels.duplicate}
        </button>
      </div>

      <div className="button-grid">
        <button type="button" className="secondary-button small" onClick={() => onReorderElement(selectedElement.id, "forward")}>
          <Layers size={14} />
          {labels.bringForward}
        </button>
        <button type="button" className="secondary-button small" onClick={() => onReorderElement(selectedElement.id, "backward")}>
          <Layers size={14} />
          {labels.sendBackward}
        </button>
        <button type="button" className="secondary-button small" onClick={() => onReorderElement(selectedElement.id, "front")}>
          <Layers size={14} />
          {labels.bringToFront}
        </button>
        <button type="button" className="secondary-button small" onClick={() => onReorderElement(selectedElement.id, "back")}>
          <Layers size={14} />
          {labels.sendToBack}
        </button>
      </div>

      <button type="button" className="danger-button" onClick={() => onDeleteElement(selectedElement.id)}>
        <Trash2 size={14} />
        {labels.delete}
      </button>
    </GlassPanelView>
  );
}
