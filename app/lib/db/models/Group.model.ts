import { Schema, model, models } from "mongoose";
import { nanoid } from "nanoid";
const groupSchema = new Schema(
  {
    groupId: {
      type: String,
      uniqdue: true,
      default: ()=>`grp_${nanoid(10)}`,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // references User model
      required: true,
    },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Group = models.Group || model("Group", groupSchema);
export default Group;
