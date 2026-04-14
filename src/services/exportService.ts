import type { ExportOptions } from "@/types";
import type Konva from "konva";

export const exportService = {
  exportStageToPng(stage: Konva.Stage | null, options: ExportOptions = {}) {
    if (!stage) return null;

    const fileName = options.fileName ?? "nail-design.png";
    const pixelRatio = options.pixelRatio ?? 2;
    const dataUrl = stage.toDataURL({ pixelRatio });

    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();
    }

    return dataUrl;
  },
};
