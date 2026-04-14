"use client";

import { useMemo } from "react";
import { DesignerToolbarView } from "@/components/views/DesignerToolbarView";
import { createTranslator } from "@/i18n";
import { useAppStore } from "@/store/useAppStore";

export function DesignerToolbarContainer({
  onSaveDraft,
  onExport,
}: {
  onSaveDraft: () => void;
  onExport: () => void;
}) {
  const locale = useAppStore((state) => state.locale);
  const currentDraftId = useAppStore((state) => state.currentDraftId);
  const snapEnabled = useAppStore((state) => state.snapEnabled);
  const onSelectElement = useAppStore((state) => state.onSelectElement);
  const onToggleSnap = useAppStore((state) => state.onToggleSnap);
  const drafts = useAppStore((state) => state.drafts);
  const t = createTranslator(locale);

  const draftName = useMemo(
    () =>
      drafts.find((draft) => draft.id === currentDraftId)?.name ?? t("designer.draftName"),
    [currentDraftId, drafts, t],
  );

  return (
    <DesignerToolbarView
      title={t("designer.toolbarTitle")}
      draftName={draftName}
      isSnapEnabled={snapEnabled}
      saveLabel={t("designer.save")}
      exportLabel={t("designer.export")}
      clearSelectionLabel={t("designer.clearSelection")}
      snapLabel={t("designer.snap")}
      onSaveDraft={onSaveDraft}
      onExport={onExport}
      onClearSelection={() => onSelectElement(null)}
      onToggleSnap={onToggleSnap}
    />
  );
}
