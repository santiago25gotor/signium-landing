import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "SIGNIUM — Making hands speak",
  description:
    "SIGNIUM is a real-time Spanish Sign Language (LSE) translator powered by AI and computer vision, designed to remove communication barriers.",
  metadataBase: new URL("https://signium.app"),
  openGraph: {
    title: "SIGNIUM — Real-time AI sign language translation",
    description:
      "AI-powered mobile translator for Spanish Sign Language. Built for accessibility, inclusion and real-time communication.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
