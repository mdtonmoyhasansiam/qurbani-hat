"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{
      background: "green",
      color: "white",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>QurbaniHat 🐄</h2>

      <div>
        <Link href="/">Home</Link>{" | "}
        <Link href="/animals">Animals</Link>{" | "}
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}