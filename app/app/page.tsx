'use client';
import { signIn,signOut } from 'next-auth/react';


export default function Home() {
  return (
    <div className="p-4">
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign in with Google
      </button>
       <button
        onClick={() => signOut()}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Sign Out
      </button>
    </div>
  );
}