"use client";
import { useLogin, usePrivy } from '@privy-io/react-auth';


export default function Home() {
   const { ready, authenticated} = usePrivy();
    const { login } = useLogin();
    // Disable login when Privy is not ready or the user is already authenticated
    const disableLogin = !ready || (ready && authenticated);
    if(disableLogin){
      return <>Loading...</>
    }

  return (
    <div className="p-4">
      <h1>Landing Page </h1>
      <button className=' bg-red cursor-pointer'  onClick={login}>
            Log in
        </button>
    </div>
  );
}
