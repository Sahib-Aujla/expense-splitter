"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading ....</div>;
  }
  console.log(session);
  return (
    <div className="p-4">
      <h1>DashBoard</h1>
      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}
