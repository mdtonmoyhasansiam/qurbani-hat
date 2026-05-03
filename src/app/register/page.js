"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find((u) => u.email === email);

    if (exist) {
      setError("User already exists");
      return;
    }

    users.push({ name, email, photo, password });

    localStorage.setItem("users", JSON.stringify(users));

    router.push("/login");
  };

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Register
      </h1>

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          className="border p-2 w-full"
          required
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          required
        />

        <input
          name="photo"
          placeholder="Photo URL"
          className="border p-2 w-full"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button className="bg-green-600 text-white px-4 py-2 w-full cursor-pointer">
          Register
        </button>
      </form>

      <button
        onClick={handleGoogle}
        className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-300 bg-gray-100 hover:bg-white hover:shadow-md transition-all duration-200 py-2 rounded-md cursor-pointer"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />
        <span className="font-medium text-gray-700">
          Register with Google
        </span>
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600">
          Login
        </Link>
      </p>
    </div>
  );
}