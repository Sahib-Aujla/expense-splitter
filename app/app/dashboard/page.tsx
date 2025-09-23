"use client";
import { constants } from "buffer";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    const getAccountData = async () => {
      if (session && session.user) {
        const resp = await fetch("/api/wallet/create", { method: "POST" });
        const d=await resp.json();
        console.log(d);
      }
    };
    getAccountData();
  }, [session]);
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
