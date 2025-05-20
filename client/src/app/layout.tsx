import { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Train Schedule App",
  description: "Track your trains",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header>
          <Header />
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
