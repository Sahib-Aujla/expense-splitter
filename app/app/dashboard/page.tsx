"use client";
import { useWallets ,getEmbeddedConnectedWallet} from "@privy-io/react-auth";
export default function Dashboard() {
  const { wallets } = useWallets();
  const wallet=getEmbeddedConnectedWallet(wallets);
  console.log({ wallets });
  return (
    <div className="p-4">
      <h1>dashboard </h1>
      {wallets?.map((a) => (
        <p>{a.address}</p>
      ))}
      <p>{wallet ? wallet.address:"lol"}</p>
    </div>
  );
}
