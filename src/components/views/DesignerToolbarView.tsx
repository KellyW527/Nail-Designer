import { Download, Magnet, Save, Sparkles } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { DesignerToolbarProps } from "@/types/view-props";

export function DesignerToolbarView({
  title,
  draftName,
  isSnapEnabled,
  saveLabel,
  exportLabel,
  clearSelectionLabel,
  snapLabel,
  onSaveDraft,
  onExport,
  onClearSelection,
  onToggleSnap,
}: DesignerToolbarProps) {
  return (
    <GlassPanelView className="panel toolbar-panel" intensity="strong">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Workspace</p>
          <h3>{title}</h3>
          <p className="muted-text">{draftName}</p>
        </div>
        <span className="panel-token">
          <Sparkles size={14} />
          {isSnapEnabled ? "Snap on" : "Snap off"}
        </span>
      </div>
      <div className="toolbar-actions">
        <button type="button" className="primary-button" onClick={onSaveDraft}>
          <Save size={14} />
          {saveLabel}
        </button>
        <button type="button" className="primary-button" onClick={onExport}>
          <Download size={14} />
          {exportLabel}
        </button>
        <button type="button" className="secondary-button" onClick={onClearSelection}>
          {clearSelectionLabel}
        </button>
        <button
          type="button"
          className={isSnapEnabled ? "secondary-button active" : "secondary-button"}
          onClick={onToggleSnap}
        >
          <Magnet size={14} />
          {snapLabel}
        </button>
      </div>
    </GlassPanelView>
  );
}
