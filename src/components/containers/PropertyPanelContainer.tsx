"use client";

import { PropertyPanelView } from "@/components/views/PropertyPanelView";
import { createTranslator } from "@/i18n";
import { materialService } from "@/services/materialService";
import { useAppStore } from "@/store/useAppStore";

export function PropertyPanelContainer() {
  const locale = useAppStore((state) => state.locale);
  const selectedElementId = useAppStore((state) => state.selectedElementId);
  const elements = useAppStore((state) => state.elements);
  const onUpdateElement = useAppStore((state) => state.onUpdateElement);
  const onDeleteElement = useAppStore((state) => state.onDeleteElement);
  const onDuplicateElement = useAppStore((state) => state.onDuplicateElement);
  const onToggleLockElement = useAppStore((state) => state.onToggleLockElement);
  const onReorderElement = useAppStore((state) => state.onReorderElement);
  const t = createTranslator(locale);

  const selectedElement = elements.find((element) => element.id === selectedElementId) ?? null;
  const material = selectedElement ? materialService.getMaterialById(selectedElement.materialId) : null;

  return (
    <PropertyPanelView
      title={t("designer.properties")}
      emptyState={t("designer.propertyEmpty")}
      labels={{
        opacity: t("designer.opacity"),
        rotation: t("designer.rotation"),
        scale: t("designer.scale"),
        lock: t("designer.lock"),
        unlock: t("designer.unlock"),
        duplicate: t("designer.duplicate"),
        bringForward: t("designer.bringForward"),
        sendBackward: t("designer.sendBackward"),
        bringToFront: t("designer.moveFront"),
        sendToBack: t("designer.moveBack"),
        delete: t("designer.delete"),
      }}
      selectedElement={selectedElement}
      material={material}
      onUpdateElement={onUpdateElement}
      onDeleteElement={onDeleteElement}
      onDuplicateElement={onDuplicateElement}
      onToggleLockElement={onToggleLockElement}
      onReorderElement={onReorderElement}
    />
  );
}
