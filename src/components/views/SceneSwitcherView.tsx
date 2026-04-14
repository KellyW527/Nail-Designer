import { Image } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { SceneSwitcherProps } from "@/types/view-props";

export function SceneSwitcherView({ title, scenes, activeSceneId, onChangeScene }: SceneSwitcherProps) {
  return (
    <GlassPanelView className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Scenes</p>
          <h3>{title}</h3>
        </div>
        <span className="panel-token">
          <Image size={14} />
          {scenes.length}
        </span>
      </div>
      <div className="scene-grid">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            type="button"
            className={scene.id === activeSceneId ? "scene-card active" : "scene-card"}
            onClick={() => onChangeScene(scene.id)}
          >
            <img src={scene.preview} alt={scene.name} />
            <span>{scene.name}</span>
          </button>
        ))}
      </div>
    </GlassPanelView>
  );
}
