import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/db/mongoose";
import User from "@/lib/db/models/User.model";

export async function GET(req: Request) {
    try {
        await connectMongoDb();

        const url = new URL(req.url);
        const search = url.searchParams.get("search") || "";

        if (!search) return NextResponse.json([], { status: 200 });

        const regex = new RegExp(search, "i"); // case-insensitive

        const users = await User.find({
            $or: [
                { email: { $regex: regex } },
                { "externalWallets.address": { $regex: regex } },
                { embeddedWallet: { $regex: regex } },
            ],
        })
            .limit(5) // limit number of results
            .lean();
        const results = users.map((u) => ({
            id: u.userId,
            email: u.email || null,
            wallet: u.externalWallets?.[0]?.address || null,
        }));

        return NextResponse.json(results);
    } catch (err) {
        console.error("Error searching users:", err);
        return NextResponse.json({ error: "Failed to search users" }, { status: 500 });
    }
}
