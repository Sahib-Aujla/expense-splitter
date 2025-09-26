import { Schema, model, models } from 'mongoose';
import { nanoid } from "nanoid";

const userSchema = new Schema(
    {
        userId: { type: String, default: () => `usr_${nanoid(10)}`, unique: true }, // internal unique ID

        email: { type: String, default: null }, // only if signed in with email/social

        embeddedWallet: { type: String, default: null }, // Privy auto-generated wallet

        externalWallets: [
            {
                address: { type: String, required: true },
                type: {
                    type: String,
                    enum: ["metamask", "walletconnect", "coinbase"],
                    required: true,
                },
                linkedAt: { type: Date, default: Date.now },
            },
        ],

        username: { type: String, default: null }, // optional nickname
    },
    { timestamps: true } // adds createdAt & updatedAt automatically
);

const User = models.User || model("User", userSchema);

export default User;
