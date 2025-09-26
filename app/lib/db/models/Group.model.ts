import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    ownerId: { type: String, required: true }, // userId of creator
    members: [
        {
            userId: { type: String, required: false },
            email: { type: String, required: false },
            walletAddress: { type: String, required: true },
            joinedAt: { type: Date, default: Date.now },
        },
    ],
    currency: { type: String, default: "USD" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Group = models.Group || model("Group", groupSchema);
export default Group;
