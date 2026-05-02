"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    login("user@mail.com");
    router.push("/");
  };

  return (
    <form onSubmit={handleLogin} className="p-4">
      <h1>Login</h1>
      <input placeholder="Email" className="border p-2 w-full" />
      <input type="password" className="border p-2 w-full" />
      <button className="bg-green-600 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}