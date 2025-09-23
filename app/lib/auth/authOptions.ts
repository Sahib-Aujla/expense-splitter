import { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectMongoDb } from '@/lib/db/mongoose';
import User from '@/lib/db/models/User.model';

export interface session extends Session {
    user: {
        id: string;
        image: string;
        email: string;
        name: string;
    };
}
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, token }) {
            const newSession: session = session as session;
            if (token) {
                newSession.user.id = token.sub as string;
            }
            return session;
        },
        async signIn({ user }) {
            await connectMongoDb();
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
                await User.create({ userId:user.id, email: user.email, scaAddress: null });
            }
            return true;
        }
    }
}