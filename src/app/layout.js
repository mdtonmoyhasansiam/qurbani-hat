import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-50 via-white to-green-50 text-gray-800">

        <Providers>
          <Navbar />

          <main className="min-h-screen px-4 py-6">
            {children}
          </main>

          <Footer />
          <Toaster position="top-right" />

        </Providers>

      </body>
    </html>
  );
}