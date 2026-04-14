import { Eye } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { LibraryPageViewProps } from "@/types/view-props";
import { MaterialSidebarView } from "@/components/views/MaterialSidebarView";

export function LibraryPageView({ title, subtitle, sidebar }: LibraryPageViewProps) {
  return (
    <section className="stack gap-md">
      <GlassPanelView className="section-heading section-heading-panel" intensity="light">
        <span className="hero-pill">
          <Eye size={14} />
          Asset browsing
        </span>
        <h2>{title}</h2>
        <p className="muted-text">{subtitle}</p>
      </GlassPanelView>
      <MaterialSidebarView {...sidebar} />
    </section>
  );
}
