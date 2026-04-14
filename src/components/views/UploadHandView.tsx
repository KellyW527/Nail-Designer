import { useRef } from "react";
import { Camera, CheckCircle2, Hand, Upload } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { UploadHandProps } from "@/types/view-props";

export function UploadHandView({
  title,
  description,
  previewUrl,
  isProcessing,
  uploadLabel,
  replaceLabel,
  resetLabel,
  helperText,
  onUploadHand,
  onResetHand,
}: UploadHandProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerInput = () => inputRef.current?.click();

  return (
    <GlassPanelView className="panel" intensity="strong">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Hand Upload</p>
          <h3>{title}</h3>
        </div>
        <span className="panel-token">
          <Hand size={14} />
          AI-ready
        </span>
      </div>
      <p className="muted-text">{description}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUploadHand(file);
        }}
      />

      <div className="button-grid single-column">
        <button type="button" className="primary-button upload-cta" onClick={triggerInput}>
          <Upload size={16} />
          {previewUrl ? replaceLabel : uploadLabel}
        </button>
        <button type="button" className="secondary-button upload-cta" onClick={triggerInput}>
          <Camera size={16} />
          Camera Flow
        </button>
        <button type="button" className="secondary-button upload-cta" onClick={onResetHand}>
          {resetLabel}
        </button>
      </div>
      <p className="helper-text">{isProcessing ? "Processing..." : helperText}</p>

      {previewUrl ? (
        <div className="image-preview">
          <img src={previewUrl} alt="Hand preview" />
          <span className="success-chip">
            <CheckCircle2 size={14} />
            Ready for editing
          </span>
        </div>
      ) : (
        <div className="empty-card">Upload a hand photo to start.</div>
      )}
    </GlassPanelView>
  );
}
