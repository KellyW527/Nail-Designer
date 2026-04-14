"use client";

import { UploadHandView } from "@/components/views/UploadHandView";
import { createTranslator } from "@/i18n";
import { useAppStore } from "@/store/useAppStore";

export function UploadHandContainer() {
  const locale = useAppStore((state) => state.locale);
  const currentHandImage = useAppStore((state) => state.currentHandImage);
  const isProcessingHand = useAppStore((state) => state.isProcessingHand);
  const onUploadHand = useAppStore((state) => state.onUploadHand);
  const onResetHand = useAppStore((state) => state.onResetHand);
  const t = createTranslator(locale);

  return (
    <UploadHandView
      title={t("designer.uploadTitle")}
      description={t("designer.uploadDescription")}
      previewUrl={currentHandImage?.originalUrl ?? null}
      isProcessing={isProcessingHand}
      uploadLabel={t("designer.upload")}
      replaceLabel={t("designer.replace")}
      resetLabel={t("designer.reset")}
      helperText={t("designer.helper")}
      onUploadHand={onUploadHand}
      onResetHand={onResetHand}
    />
  );
}
