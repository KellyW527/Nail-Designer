import type { CanvasElement, HandImage, NailAnchor } from "@/types";

const distance = (ax: number, ay: number, bx: number, by: number) => Math.hypot(ax - bx, ay - by);

const getElementCenter = (element: CanvasElement) => ({
  x: element.x + (element.width * element.scaleX) / 2,
  y: element.y + (element.height * element.scaleY) / 2,
});

export const snapService = {
  findNearestNailAnchor(element: CanvasElement, handImage: HandImage | null) {
    if (!handImage) return null;

    const center = getElementCenter(element);
    const nearest = handImage.nailAnchors.reduce<{ anchor: NailAnchor | null; distance: number }>(
      (acc, anchor) => {
        const nextDistance = distance(center.x, center.y, anchor.x, anchor.y);

        if (nextDistance < acc.distance) {
          return { anchor, distance: nextDistance };
        }

        return acc;
      },
      { anchor: null, distance: Number.POSITIVE_INFINITY },
    );

    if (!nearest.anchor || nearest.distance > nearest.anchor.radius + 24) {
      return null;
    }

    return nearest.anchor;
  },
};
