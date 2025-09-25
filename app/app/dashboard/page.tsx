"use client";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="p-4">
      <h1>Landing Page </h1>
      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  );
}
