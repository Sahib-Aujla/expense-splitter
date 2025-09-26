"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Search, Plus, Trash, UserPlus } from "lucide-react";

export default function CreateGroup() {
  const { wallets } = useWallets();
  const { user } = usePrivy();
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([{ address: "" }]);
  const [loading, setLoading] = useState(false);

  const addMember = () => setMembers([...members, { address: "" }]);
  const removeMember = (index: number) =>
    setMembers(members.filter((_, i) => i !== index));
  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index].address = value;
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    if (!groupName) return alert("Group name required!");
    setLoading(true);
    if (!user) {
      console.log("user not defined");
      return;
    }
    try {
      const resp = await fetch("/api/groups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: groupName,
          description,
          ownerId: user.id,
          members: [
            { walletAddress: wallets[0]?.address, userId: user.id },
            ...members
              .filter((m) => m.address)
              .map((m) => ({ walletAddress: m.address })),
          ],
        }),
      });
      const data = await resp.json();
      router.push(`/groups/${data.group._id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors duration-300 p-6 max-w-4xl mx-auto">
      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Create New Group
      </motion.h1>

      {/* Group Info */}
      <div className="space-y-5 mb-8">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
      </div>

      {/* Members Section */}
      <div className="space-y-4 mb-8">
        <h3 className="font-semibold text-lg">Invite Members</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Type wallet address or email to invite.
        </p>

        {members.map((m, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-900 p-3 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <UserPlus className="w-5 h-5 text-indigo-500" />
            <input
              type="text"
              placeholder="Wallet or Email"
              value={m.address}
              onChange={(e) => handleMemberChange(i, e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-200"
            />
            <button
              onClick={() => removeMember(i)}
              className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add Member Button */}
        <button
          onClick={addMember}
          className="flex items-center justify-center space-x-2 px-5 py-2 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600 transition"
        >
          <Plus size={18} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl transition text-lg"
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </div>
  );
}
