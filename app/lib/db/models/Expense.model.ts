import { Schema, model, models } from "mongoose";
import { nanoid } from "nanoid";
const expenseSchema = new Schema(
    {
        expenseId: {
            type: String,
            unique: true,
            default: () => `exp_${nanoid(10)}`,
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // who added the expense
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "USD",
        },
        splitType: {
            type: String,
            enum: ["equal", "percentage", "custom"],
            default: "equal",
        },
        participants: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User", required: true },
                share: { type: Number, required: true }, // how much this user owes
                paid: { type: Number, default: 0 }, // how much they have paid
            },
        ],
    },
    { timestamps: true }
);

const Expense = models.Expense || model("Expense", expenseSchema);
export default Expense;
