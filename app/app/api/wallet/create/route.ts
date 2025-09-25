import { getServerSession } from 'next-auth';
import { authOptions, session } from '@/lib/auth/authOptions';
import { connectMongoDb } from '@/lib/db/mongoose';
import User from '@/lib/db/models/User.model';
import { BiconomySmartAccountV2 } from '@biconomy/account';
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST(req: Request) {
    const oldSession = await getServerSession(authOptions);
    if (!oldSession?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const session: session = oldSession as session;
    await connectMongoDb();
    const user = await User.findOne({ userId: session.user.id });
    if (user.scaAddress) return NextResponse.json({ address: user.scaAddress });

    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_RPC_URL);
   
    const address = "mckd";

    await User.updateOne({ userId: session.user.id }, { $set: { scaAddress: address } });
    return NextResponse.json({ address });
}