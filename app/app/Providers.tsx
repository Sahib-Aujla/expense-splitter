"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { PrivyProvider } from "@privy-io/react-auth";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
    
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_APP_ID!}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Providers;
