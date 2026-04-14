import { DEFAULT_HAND_BOUNDS } from "@/mock/constants";
import { createId } from "@/lib/id";
import type { CropMeta, HandImage, NailAnchor, SegmentationMeta } from "@/types";

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const buildCropMeta = (): CropMeta => ({
  wristLineY: DEFAULT_HAND_BOUNDS.y + DEFAULT_HAND_BOUNDS.height - 24,
  boundingBox: { ...DEFAULT_HAND_BOUNDS },
});

const buildSegmentationMeta = (): SegmentationMeta => ({
  confidence: 0.89,
  method: "mock-segmentation-v1",
});

const buildNailAnchors = (): NailAnchor[] => {
  const { x, y, width, height } = DEFAULT_HAND_BOUNDS;

  return [
    { id: "thumb", label: "Thumb", x: x + width * 0.12, y: y + height * 0.62, radius: 34 },
    { id: "index", label: "Index", x: x + width * 0.38, y: y + height * 0.2, radius: 28 },
    { id: "middle", label: "Middle", x: x + width * 0.54, y: y + height * 0.12, radius: 30 },
    { id: "ring", label: "Ring", x: x + width * 0.68, y: y + height * 0.2, radius: 28 },
    { id: "pinky", label: "Pinky", x: x + width * 0.82, y: y + height * 0.3, radius: 24 },
  ];
};

const buildHandImage = async (file: File): Promise<HandImage> => {
  const originalUrl = await readFileAsDataUrl(file);
  const cropMeta = buildCropMeta();
  const segmentationMeta = buildSegmentationMeta();
  const nailAnchors = buildNailAnchors();

  return {
    id: createId("hand"),
    originalUrl,
    processedUrl: originalUrl,
    cutoutUrl: originalUrl,
    cropMeta,
    segmentationMeta,
    handSide: "left",
    fingerAnchors: nailAnchors.map(({ radius: _radius, ...anchor }) => anchor),
    nailAnchors,
  };
};

export const handImageService = {
  uploadLocalFile(file: File) {
    return buildHandImage(file);
  },

  async detectHand(input: File) {
    return buildHandImage(input);
  },

  async cropAtWrist(input: File) {
    return {
      url: await readFileAsDataUrl(input),
      cropMeta: buildCropMeta(),
    };
  },

  async removeBackground(input: File) {
    return {
      url: await readFileAsDataUrl(input),
      segmentationMeta: buildSegmentationMeta(),
    };
  },

  async detectNails(_input: File) {
    return {
      handSide: "left" as const,
      fingerAnchors: buildNailAnchors().map(({ radius: _radius, ...anchor }) => anchor),
      nailAnchors: buildNailAnchors(),
    };
  },
};
