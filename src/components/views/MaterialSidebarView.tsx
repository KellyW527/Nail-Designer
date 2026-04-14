import { Heart, Search, Sparkles } from "lucide-react";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { MaterialSidebarViewProps } from "@/types/view-props";

export function MaterialSidebarView({
  title,
  searchPlaceholder,
  previewLabel,
  addLabel,
  favoriteLabel,
  unfavoriteLabel,
  search,
  categories,
  activeCategory,
  materials,
  emptyState,
  onSearchChange,
  onSelectCategory,
}: MaterialSidebarViewProps) {
  return (
    <GlassPanelView className="panel">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Library</p>
          <h3>{title}</h3>
        </div>
        <span className="panel-token">
          <Sparkles size={14} />
          {materials.length}
        </span>
      </div>

      <div className="stack gap-sm">
        <label className="search-shell">
          <Search size={16} />
          <input
            className="text-input"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className="chip-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? "chip active" : "chip"}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="material-list">
        {materials.length === 0 ? (
          <div className="empty-card">{emptyState}</div>
        ) : (
          materials.map((material) => (
            <article key={material.id} className="material-card">
              <img src={material.thumbnail} alt={material.name} className="material-thumb" />
              <div className="material-card-body">
                <div>
                  <h4>{material.name}</h4>
                  <p>{material.category}</p>
                </div>
                <div className="chip-row">
                  {material.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="material-actions">
                  <button type="button" className="secondary-button small" onClick={material.onPreview}>
                    {previewLabel}
                  </button>
                  <button type="button" className="secondary-button small" onClick={material.onToggleFavorite}>
                    <Heart size={14} fill={material.isFavorite ? "currentColor" : "none"} />
                    {material.isFavorite ? unfavoriteLabel : favoriteLabel}
                  </button>
                  <button type="button" className="primary-button small" onClick={material.onAdd}>
                    {addLabel}
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </GlassPanelView>
  );
}
