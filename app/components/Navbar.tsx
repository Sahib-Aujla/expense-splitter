"use client";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

const Navbar = () => {
  const { logout } = usePrivy();
  const { theme, toggleTheme } = useTheme();
  return (
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
  );
};

export default Navbar;
