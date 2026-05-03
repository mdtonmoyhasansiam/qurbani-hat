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

  const profileRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Animals", path: "/animals" },
    { name: "Profile", path: "/profile" },
  ];

  // close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    signOut();
    setProfileOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-green-700 hover:text-green-800 transition"
        >
          🐄 QurbaniHat
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {!session ? (
            <Link
              href="/login"
              className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative flex items-center gap-2" ref={profileRef}>
              
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow-sm"
              >
                <img
                  src={
                    session.user.image ||
                    `https://ui-avatars.com/api/?name=${session.user.name}`
                  }
                  className="w-8 h-8 rounded-full"
                  alt="user"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-44 bg-white rounded-xl shadow-xl overflow-hidden">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    👤 Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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

          {!session ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-green-600 font-semibold"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
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