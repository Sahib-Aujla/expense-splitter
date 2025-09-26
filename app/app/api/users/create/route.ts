import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/db/mongoose";
import User from "@/lib/db/models/User.model";

export async function POST(req: Request) {
    try {
        await connectMongoDb();
        const { address, walletClientType, email, privyUserId } = await req.json();

        // prefer Privy userId if available, else wallet address
        const userId = privyUserId || address.toLowerCase();

        let user = await User.findOne({ userId });

        if (!user) {
            user = await User.create({
                userId,
                email: email || null,
                externalWallets: [
                    {
                        address: address.toLowerCase(),
                        type: walletClientType,
                        linkedAt: new Date(),
                    },
                ],
            });
        } else {
            // Update wallet info if it's new
            const hasWallet = user.externalWallets.some(
                (w: { address: string; }) => w.address.toLowerCase() === address.toLowerCase()
            );
            if (!hasWallet) {
                user.externalWallets.push({
                    address: address.toLowerCase(),
                    type: walletClientType,
                    linkedAt: new Date(),
                });
            }
            await user.save();
        }

        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error("Error saving user:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
