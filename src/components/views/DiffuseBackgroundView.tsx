import type { ReactNode } from "react";

export function DiffuseBackgroundView({
  children,
  variant = "home",
}: {
  children: ReactNode;
  variant?: "home" | "library" | "designer" | "subtle";
}) {
  return (
    <div className={`diffuse-shell variant-${variant}`}>
      <div className="diffuse-orbs" aria-hidden="true">
        {variant === "home" ? (
          <>
            <span className="orb orb-pink orb-home-a" />
            <span className="orb orb-blue orb-home-b" />
            <span className="orb orb-mint orb-home-c" />
            <span className="orb orb-lavender orb-home-d" />
          </>
        ) : null}
        {variant === "library" ? (
          <>
            <span className="orb orb-lavender orb-library-a" />
            <span className="orb orb-pink orb-library-b" />
          </>
        ) : null}
        {variant === "designer" ? (
          <>
            <span className="orb orb-pink orb-designer-a" />
            <span className="orb orb-blue orb-designer-b" />
          </>
        ) : null}
        {variant === "subtle" ? <span className="orb orb-pink orb-subtle-a" /> : null}
      </div>
      <div className="noise-layer" aria-hidden="true" />
      <div className="diffuse-content">{children}</div>
    </div>
  );
}
