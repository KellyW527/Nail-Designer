"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { DiffuseBackgroundView } from "@/components/views/DiffuseBackgroundView";
import { FooterView } from "@/components/views/FooterView";
import { GlassPanelView } from "@/components/views/GlassPanelView";
import type { AppFrameViewProps } from "@/types/view-props";

export function AppFrameView({
  title,
  subtitle,
  locale,
  navItems,
  onChangeLocale,
  children,
  actions,
  variant = "subtle",
  showFooter = true,
}: AppFrameViewProps) {
  return (
    <DiffuseBackgroundView variant={variant}>
      <div className="app-shell">
        <GlassPanelView className="top-nav-shell" intensity="strong">
          <header className="top-nav">
            <Link href="/" className="brand-link">
              <span className="brand-badge">
                <Sparkles size={16} />
              </span>
              <span className="brand-text">Nail Designer</span>
            </Link>

            <nav className="nav-tabs">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.active ? "nav-tab active" : "nav-tab"}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="topbar-actions">
              <div className="locale-switch">
                <button
                  className={locale === "en" ? "locale-button active" : "locale-button"}
                  onClick={() => onChangeLocale("en")}
                  type="button"
                >
                  EN
                </button>
                <button
                  className={locale === "zh" ? "locale-button active" : "locale-button"}
                  onClick={() => onChangeLocale("zh")}
                  type="button"
                >
                  中文
                </button>
              </div>
              {actions}
            </div>
          </header>
        </GlassPanelView>

        <div className="page-intro">
          <p className="eyebrow">Logic-first frontend</p>
          <h1>{title}</h1>
          {subtitle ? <p className="muted-text intro-copy">{subtitle}</p> : null}
        </div>

        <main className="app-main">{children}</main>
        {showFooter ? <FooterView /> : null}
      </div>
    </DiffuseBackgroundView>
  );
}
