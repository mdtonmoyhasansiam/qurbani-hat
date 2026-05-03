"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <SessionProvider>

          <Navbar />

          <div className="min-h-screen p-4">
            {children}
          </div>

          <Footer />
          <Toaster />

        </SessionProvider>

      </body>
    </html>
  );
}