"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">
            QurbaniHat 🐄
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            Buy healthy Qurbani animals easily online with trust and safety.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/animals">Animals</Link></li>
            <li><Link href="/profile">Profile</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* SOCIAL ICONS */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 mt-2">

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition"
            >
              <FaWhatsapp />
            </a>

            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition"
            >
              <FaYoutube />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-gray-500 text-sm">

        © {new Date().getFullYear()} QurbaniHat. All rights reserved.

      </div>

    </footer>
  );
}