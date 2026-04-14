import { mockScenes } from "@/mock/scenes";

export const sceneService = {
  listScenes() {
    return mockScenes;
  },

  getSceneById(id: string) {
    return mockScenes.find((scene) => scene.id === id) ?? null;
  },
};
