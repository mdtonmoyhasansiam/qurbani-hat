"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    const res = await signIn("credentials", {
      email: form.email.value,
      password: form.password.value,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Login
      </h1>

      <form onSubmit={handleCredentialsLogin} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          required
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

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 w-full cursor-pointer hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-300 bg-gray-100 hover:bg-white hover:shadow-md transition-all duration-200 py-2 rounded-md"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="Google"
        />
        <span className="font-medium text-gray-700">
          Login with Google
        </span>
      </button>

      <p className="mt-4 text-center text-sm">
        New here?{" "}
        <Link href="/register" className="text-green-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}