"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { baseSepolia } from "viem/chains";
import { darkTheme } from "@rainbow-me/rainbowkit";
const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "Stealth Wallet",
  projectId: process.env.NEXT_PUBLIC_REOWN_APP_ID || "wallet-app-id",
  chains: [baseSepolia],
  ssr: true,
});

export const RainbowkitProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: "oklch(0.619 0.251 33.4)",
          // accentColorForeground: "oklch(0.985 0 0)",
        })}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
