"use client";

import {
  useWallets,
  getEmbeddedConnectedWallet,
  usePrivy,
} from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Users,
  Coins,
  CreditCard,
  Divide,
  Wallet,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Dashboard() {
  const { wallets } = useWallets();
  const { logout, authenticated } = usePrivy();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const wallet = getEmbeddedConnectedWallet(wallets);
  console.log({ wallets });
  
  useEffect(() => {
    if (!authenticated) {
      router.replace("/");
    }
  }, [authenticated]);

  useEffect(() => {
    const createOrUpdateUser = async () => {
      if (authenticated && wallets.length > 0) {
        const w = wallets[0];

        try {
          const resp = await fetch("/api/users/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              privyUserId: null, // if available from usePrivy, pass it here
              email: null, // if signed in with email
              embeddedWallet: wallet,
              address: w.address,
              walletClientType: w.walletClientType,
            }),
          });
          const data = await resp.json();
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      }
    };
    createOrUpdateUser();
  }, [authenticated, wallets]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg sticky top-0 z-50 transition-colors duration-300">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Split It
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow hover:shadow-lg transition cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
          </button>

          <button
            onClick={logout}
            className=" cursor-pointer px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow hover:shadow-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center relative">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome,{" "}
          {wallets.length > 0 ? wallets[0].address.slice(0, 6) + "..." : "User"}
          !
        </motion.h1>
        <motion.p
          className="text-gray-700 dark:text-gray-300 text-lg md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Manage your groups, split expenses, and track payments seamlessly.
        </motion.p>
      </section>

      {/* Wallet Info */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <motion.div
          className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 mb-6 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-2">Connected Wallet</h2>
          {wallet ? (
            <p className="text-gray-700 dark:text-gray-300">{wallet.address}</p>
          ) : wallets.length > 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              {wallets[0].address}
            </p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No wallet connected
            </p>
          )}
        </motion.div>
      </section>

      {/* Features / Dashboard Actions */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Dashboard
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Create Group",
              icon: Users,
              desc: "Start a new group and invite friends to share expenses.",
            },
            {
              title: "Add Expense",
              icon: Coins,
              desc: "Quickly add and split expenses with your groups.",
            },
            {
              title: "Wallets",
              icon: Wallet,
              desc: "View and manage your connected wallets.",
            },
            {
              title: "Fiat On-Ramp",
              icon: CreditCard,
              desc: "Top-up wallets with your local currency easily.",
            },
            {
              title: "Split Evenly",
              icon: Divide,
              desc: "Automatically calculate how much each member owes.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 group hover:shadow-2xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white mb-4 shadow-lg group-hover:scale-110 transition">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
