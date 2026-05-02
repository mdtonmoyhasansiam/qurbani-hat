"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>My Profile</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}