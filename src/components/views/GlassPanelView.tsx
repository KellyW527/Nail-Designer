import type { ReactNode } from "react";

export function GlassPanelView({
  children,
  className = "",
  intensity = "medium",
}: {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "strong";
}) {
  return <div className={`glass-panel glass-${intensity} ${className}`.trim()}>{children}</div>;
}
