"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePrivy, useWallets } from "@privy-io/react-auth";

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
      console.log("Group created:", data);
      router.push(`/groups/${data.group._id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors duration-300 p-6 max-w-3xl mx-auto">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Create New Group
      </motion.h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="space-y-2">
          <h3 className="font-semibold">
            Invite Members (wallet address or email)
          </h3>
          {members.map((m, i) => (
            <div key={i} className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder="Wallet or Email"
                value={m.address}
                onChange={(e) => handleMemberChange(i, e.target.value)}
                className="flex-1 p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => removeMember(i)}
                className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addMember}
            className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            Add Member
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-2xl shadow hover:shadow-lg transition"
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </div>
    </div>
  );
}
