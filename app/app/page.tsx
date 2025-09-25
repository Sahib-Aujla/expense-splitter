"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Users,
  Coins,
  LogIn,
  CreditCard,
  Divide,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();
  const { theme, toggleTheme } = useTheme();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (authenticated) {
      router.push("/dashboard");
    }
  }, [authenticated]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-hidden">
      {/* Radial Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            600px at ${mousePos.x}px ${mousePos.y}px,
            rgba(99, 102, 241, 0.15),
            transparent 80%
          )`,
        }}
      />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="z-20 absolute top-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow cursor-pointer hover:shadow-lg transition"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-500" />
        )}
      </button>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center h-screen text-center px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Split It
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          A next-gen expense splitting platform powered by{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            USDC
          </span>
          . Seamlessly split, pay, and settle group expenses with embedded
          wallets, social sign-in, and fiat on-ramps.
        </motion.p>
        <motion.button
          onClick={() => login()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-indigo-400/40 transition"
        >
          Get Started
        </motion.button>
      </section>

      {/* Features */}
      <section className="relative px-6 py-24 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Why Choose Split It?
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "USDC Payments",
              desc: "Send, receive, and split expenses using stable, reliable USDC coin.",
              icon: Coins,
            },
            {
              title: "Social Sign-In",
              desc: "Sign in with Google, crypto wallet or email — no crypto knowledge needed.",
              icon: LogIn,
            },
            {
              title: "Embedded Wallets",
              desc: "Get a secure wallet instantly on sign-up. No setup required.",
              icon: Wallet,
            },
            {
              title: "Fiat On-Ramp",
              desc: "Easily convert your local currency into crypto with integrated providers.",
              icon: CreditCard,
            },
            {
              title: "Group Invites",
              desc: "Invite friends, create groups, and track shared expenses effortlessly.",
              icon: Users,
            },
            {
              title: "Split Evenly",
              desc: "Optimized algorithm for seamless splitting.",
              icon: Divide,
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="relative p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-xl border border-gray-200 dark:border-gray-700 group hover:shadow-2xl transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white mb-4 shadow-lg group-hover:scale-110 transition">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-3xl shadow-2xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 dark:text-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Ready to Split Smarter?
        </motion.h2>
        <motion.button
          onClick={login}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-2xl bg-white dark:bg-gray-800 dark:text-white text-indigo-600 font-semibold shadow-lg hover:shadow-xl transition"
        >
          Join Now
        </motion.button>
      </section>
    </div>
  );
}
