"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "animate.css";

export default function UpdateProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");

  if (!session) {
    return (
      <div className="p-10 text-center">
        Please login first
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...session.user,
      name,
      image,
    };

    localStorage.setItem(
      "updatedUser",
      JSON.stringify(updatedUser)
    );

    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto p-5 animate__animated animate__fadeIn">

      <h1 className="text-2xl font-bold mb-4 text-center">
        Update Profile
      </h1>

      <form onSubmit={handleUpdate} className="space-y-3">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Name"
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full"
          placeholder="Image URL"
        />

        <button className="bg-green-600 text-white px-4 py-2 w-full hover:bg-green-700">
          Update Information
        </button>

      </form>

    </div>
  );
}