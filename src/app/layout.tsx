import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nail Designer",
  description: "A logic-first nail collage editor with replaceable UI views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
