"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import type Konva from "konva";
import { buildNavItems } from "@/adapters/view-adapters";
import { AppFrameView } from "@/components/views/AppFrameView";
import { DesignerCanvasContainer } from "@/components/containers/DesignerCanvasContainer";
import { DesignerToolbarContainer } from "@/components/containers/DesignerToolbarContainer";
import { MaterialSidebarContainer } from "@/components/containers/MaterialSidebarContainer";
import { PropertyPanelContainer } from "@/components/containers/PropertyPanelContainer";
import { SceneSwitcherContainer } from "@/components/containers/SceneSwitcherContainer";
import { UploadHandContainer } from "@/components/containers/UploadHandContainer";
import { createTranslator } from "@/i18n";
import { useHydrateStore } from "@/hooks/useHydrateStore";
import { useAppStore } from "@/store/useAppStore";

interface DesignerWorkspaceProps {
  materialId?: string | null;
  draftId?: string | null;
}

export function DesignerWorkspace({ materialId = null, draftId = null }: DesignerWorkspaceProps) {
  useHydrateStore();

  const pathname = usePathname();
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const applyDesignerParams = useAppStore((state) => state.applyDesignerParams);
  const onSaveDraft = useAppStore((state) => state.onSaveDraft);
  const onExport = useAppStore((state) => state.onExport);
  const t = createTranslator(locale);
  const stageRef = useRef<Konva.Stage | null>(null);

  useEffect(() => {
    applyDesignerParams({
      materialId,
      draftId,
    });
  }, [applyDesignerParams, draftId, materialId]);

  const frameProps = useMemo(
    () => ({
      title: t("app.title"),
      subtitle: t("designer.title"),
      locale,
      navItems: buildNavItems(locale, pathname),
      onChangeLocale: setLocale,
    }),
    [locale, pathname, setLocale, t],
  );

  return (
    <AppFrameView {...frameProps} variant="designer" showFooter={false}>
      <div className="designer-toolbar-wrap">
        <DesignerToolbarContainer
          onSaveDraft={() => onSaveDraft(stageRef.current?.toDataURL({ pixelRatio: 1 }))}
          onExport={() => onExport(stageRef.current)}
        />
      </div>

      <div className="designer-layout">
        <aside className="left-rail">
          <UploadHandContainer />
          <SceneSwitcherContainer />
        </aside>

        <section className="center-stage">
          <DesignerCanvasContainer stageRef={stageRef} />
        </section>

        <aside className="right-rail">
          <MaterialSidebarContainer mode="designer" />
          <PropertyPanelContainer />
        </aside>
      </div>
    </AppFrameView>
  );
}
