"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Animals", path: "/animals" },
    { name: "Profile", path: "/profile" },
  ];

  // click outside close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b shadow-sm">

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-xl font-bold text-green-700">
          🐄 QurbaniHat
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">

          {navItems.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {!session ? (
            <Link
              href="/api/auth/signin"
              className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition shadow"
            >
              Login
            </Link>
          ) : (
            <div className="relative flex items-center gap-2">

              {/* PROFILE BUTTON */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow-sm hover:scale-105 transition"
              >
                <img
                  src={
                    session.user.image ||
                    "https://ui-avatars.com/api/?name=" +
                      session.user.name
                  }
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <div
                  ref={profileRef}
                  className="absolute right-0 top-12 w-44 bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in z-50"
                >

                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    👤 Profile
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                className="md:hidden text-2xl ml-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                ☰
              </button>
            </div>
          )}

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 py-3 flex flex-col gap-2">

          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`py-2 border-b ${
                pathname === item.path
                  ? "text-green-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {session && (
            <button
              onClick={() => {
                signOut();
                setMobileOpen(false);
              }}
              className="py-2 text-left text-red-500"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
}