import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventAI Portal",
  description: "Infosys Internship Event Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
