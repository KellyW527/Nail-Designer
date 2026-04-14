import { ArrowRight, Eye, MoveRight, Palette, WandSparkles } from "lucide-react";
import Link from "next/link";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { HomePageViewProps } from "@/types/view-props";

export function HomePageView({ title, subtitle, ctaLabel, secondaryLabel, cards }: HomePageViewProps) {
  return (
    <section className="stack gap-md">
      <section className="hero-showcase">
        <div className="hero-copy">
          <span className="hero-pill">
            <Palette size={14} />
            Lovable UI + stable editor logic
          </span>
          <h2>{title}</h2>
          <p className="muted-text">{subtitle}</p>
          <div className="hero-actions">
            <Link href="/designer" className="primary-button">
              {ctaLabel}
            </Link>
            <Link href="/library" className="secondary-button">
              {secondaryLabel}
            </Link>
          </div>
        </div>

        <GlassPanelView className="hero-preview" intensity="strong">
          <div className="hero-preview-surface">
            <div className="hero-preview-hand">💅</div>
            <p>Preview your own hand-based nail collage here</p>
            <div className="preview-badges">
              <span><WandSparkles size={14} /> Snap</span>
              <span><Eye size={14} /> Scenes</span>
              <span><ArrowRight size={14} /> Export</span>
            </div>
          </div>
        </GlassPanelView>
      </section>

      <section className="feature-band">
        <GlassPanelView className="feature-highlight">
          <div className="feature-icon"><Palette size={20} /></div>
          <h3>Rich asset layering</h3>
          <p>Base gels, overlays, gems, pearls, stickers, and scene switching all live behind stable store actions.</p>
        </GlassPanelView>
        <GlassPanelView className="feature-highlight">
          <div className="feature-icon"><MoveRight size={20} /></div>
          <h3>UI can keep evolving</h3>
          <p>Containers own state and editor behavior. Lovable can keep replacing presentation components without breaking the workflow.</p>
        </GlassPanelView>
      </section>

      <div className="card-grid three">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="feature-card">
            <div className="feature-card-top">
              <span className="feature-card-dot" />
              <span>Ready</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
