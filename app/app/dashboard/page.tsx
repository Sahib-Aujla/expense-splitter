"use client";
import {
  useWallets,
  getEmbeddedConnectedWallet,
  usePrivy,
} from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { wallets } = useWallets();
  const router = useRouter();
  const { logout, authenticated } = usePrivy();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/");
    }
  }, [authenticated]);
  const wallet = getEmbeddedConnectedWallet(wallets);
  console.log({ wallets });
  return (
    <div className="p-4">
      <h1>dashboard </h1>
      {wallets?.map((a) => (
        <p>{a.address}</p>
      ))}
      <p>{wallet ? wallet.address : "lol"}</p>

      <button className="w-40 h-20 bg-red-300 cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
