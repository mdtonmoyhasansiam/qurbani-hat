"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div
      style={{
        background: "green",
        color: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>QurbaniHat 🐄</h2>

      <div>
        <Link href="/">Home</Link>{" | "}
        <Link href="/animals">Animals</Link>{" | "}

        {/* 🔐 যদি login না থাকে */}
        {!session ? (
          <button
            onClick={() => signIn("google")}
            style={{ marginLeft: "10px" }}
          >
            Login
          </button>
        ) : (
          <>
            {/* 👤 user name */}
            <span style={{ marginLeft: "10px" }}>
              {session.user.name}
            </span>

            {" | "}

            {/* 👤 profile */}
            <Link href="/profile">Profile</Link>

            {" | "}

            {/* 🚪 logout */}
            <button
              onClick={() => signOut()}
              style={{ marginLeft: "10px" }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}