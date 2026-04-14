import { CalendarClock, Layers3 } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { DraftListViewProps } from "@/types/view-props";

export function MyDesignsPageView({
  title,
  emptyState,
  openLabel,
  deleteLabel,
  drafts,
  onOpenDraft,
  onDeleteDraft,
}: DraftListViewProps) {
  return (
    <section className="stack gap-md">
      <div className="section-heading">
        <h2>{title}</h2>
      </div>
      {drafts.length === 0 ? (
        <div className="empty-card">{emptyState}</div>
      ) : (
        <div className="draft-grid">
          {drafts.map((draft) => (
            <GlassPanelView key={draft.id} className="draft-card">
              <img src={draft.coverUrl} alt={draft.name} className="draft-cover" />
              <div className="draft-card-body">
                <div>
                  <h3>{draft.name}</h3>
                  <p>{draft.sceneName}</p>
                  <p className="draft-meta"><CalendarClock size={14} /> {draft.updatedAt}</p>
                  <p className="draft-meta"><Layers3 size={14} /> {draft.elementCount} elements</p>
                </div>
                <div className="material-actions">
                  <button type="button" className="primary-button small" onClick={() => onOpenDraft(draft.id)}>
                    {openLabel}
                  </button>
                  <button type="button" className="danger-button small" onClick={() => onDeleteDraft(draft.id)}>
                    {deleteLabel}
                  </button>
                </div>
              </div>
            </GlassPanelView>
          ))}
        </div>
      )}
    </section>
  );
}
