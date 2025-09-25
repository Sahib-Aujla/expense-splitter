"use client";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready;

  useEffect(() => {
    if (authenticated) {
      router.replace("/dashboard");
    }
  }, [authenticated, router]);

  if (disableLogin) {
    return <>Loading...</>;
  }

  return (
    <div className="p-4">
      <h1>Landing Page </h1>
      <button className=" bg-red cursor-pointer" onClick={login}>
        Log in
      </button>
    </div>
  );
}
