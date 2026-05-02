import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Navbar />
          <div className="min-h-screen p-4">{children}</div>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}