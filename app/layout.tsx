import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "LOCKIN - закрой день",
  description:
    "Социальная игра-челлендж с ежедневными реальными квестами, XP, streak и командным прогрессом.",
  applicationName: "LOCKIN",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LOCKIN",
  },
};

export const viewport: Viewport = {
  themeColor: "#050711",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
