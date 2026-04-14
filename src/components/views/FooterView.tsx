import Link from "next/link";

export function FooterView() {
  return (
    <footer className="footer-shell">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Nail Designer</p>
          <p className="footer-text">
            Upload your hand, preview nail looks in real scenes, and keep the logic layer stable
            even when the visual layer keeps evolving.
          </p>
        </div>

        <div>
          <p className="footer-title">Product</p>
          <div className="footer-links">
            <Link href="/designer">Designer</Link>
            <Link href="/library">Library</Link>
            <Link href="/my-designs">My Designs</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Workflow</p>
          <div className="footer-links">
            <span>Upload hand photo</span>
            <span>Compose materials</span>
            <span>Export PNG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
