"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-green-600 text-white px-6 py-3 flex items-center justify-between shadow-md">

      {/* LOGO */}
      <div className="text-xl font-bold">
        🐄 QurbaniHat
      </div>

      {/* CENTER MENU */}
      <div className="flex gap-6 font-medium">
        <Link href="/" className="hover:text-yellow-300">
          Home
        </Link>

        <Link href="/animals" className="hover:text-yellow-300">
          Animals
        </Link>
      </div>

      {/* RIGHT AUTH */}
      <div className="flex items-center gap-3">

        {!session ? (
          <Link
            href="/api/auth/signin"
            className="bg-white text-green-600 px-3 py-1 rounded font-semibold"
          >
            Login
          </Link>
        ) : (
          <>
            <img
              src={
                session.user.image ||
                "https://ui-avatars.com/api/?name=" +
                  session.user.name
              }
              className="w-8 h-8 rounded-full border"
            />

            <span className="text-sm">
              {session.user.name}
            </span>

            <Link
              href="/profile"
              className="bg-white text-green-600 px-2 py-1 rounded text-sm font-semibold"
            >
              Profile
            </Link>

            <button
              onClick={() => signOut()}
              className="bg-red-500 px-2 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}