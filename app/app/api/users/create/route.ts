import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/db/mongoose";
import User from "@/lib/db/models/User.model";
export async function POST(req: Request) {
  try {
    await connectMongoDb();
    const { privyUserId, email, wallets } = await req.json();

    if (!privyUserId) throw new Error("Missing Privy user ID");

    // find existing user
    let user = await User.findOne({ userId: privyUserId });

    // if not exists, create
    if (!user) {
      user = await User.create({
        userId: privyUserId,
        email: email || null,
        embeddedWallet: wallets.find((w: any) => w.walletClientType === "privy")?.address || null,
        externalWallets: wallets
          .filter((w: any) => w.walletClientType !== "privy")
          .map((w: any) => ({
            address: w.address.toLowerCase(),
            type: w.walletClientType,
            linkedAt: new Date(),
          })),
      });
    } else {
      // update embedded wallet if changed
      const embedded = wallets.find((w: any) => w.walletClientType === "privy");
      if (embedded && user.embeddedWallet !== embedded.address) {
        user.embeddedWallet = embedded.address;
      }

      // update external wallets
      for (const w of wallets.filter((w: any) => w.walletClientType !== "privy")) {
        if (!user.externalWallets.some((ew: any) => ew.address.toLowerCase() === w.address.toLowerCase())) {
          user.externalWallets.push({
            address: w.address.toLowerCase(),
            type: w.walletClientType,
            linkedAt: new Date(),
          });
        }
      }

      await user.save();
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Error saving user:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
