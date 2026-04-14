"use client";

import { SceneSwitcherView } from "@/components/views/SceneSwitcherView";
import { createTranslator } from "@/i18n";
import { useAppStore } from "@/store/useAppStore";

export function SceneSwitcherContainer() {
  const locale = useAppStore((state) => state.locale);
  const scenes = useAppStore((state) => state.scenes);
  const currentSceneId = useAppStore((state) => state.currentSceneId);
  const onChangeScene = useAppStore((state) => state.onChangeScene);
  const t = createTranslator(locale);

  return (
    <SceneSwitcherView
      title={t("designer.scenes")}
      scenes={scenes}
      activeSceneId={currentSceneId}
      onChangeScene={onChangeScene}
    />
  );
}
