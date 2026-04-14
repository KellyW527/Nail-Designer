import { DesignerWorkspace } from "@/features/designer/DesignerWorkspace";

const normalizeSearchParam = (value: string | string[] | undefined) => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] ?? null;
  return null;
};

export default async function DesignerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <DesignerWorkspace
      materialId={normalizeSearchParam(params.materialId)}
      draftId={normalizeSearchParam(params.draftId)}
    />
  );
}
