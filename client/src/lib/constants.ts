// Type definitions
export interface Chain {
  id: number;
  name: string;
  icon: string;
}

export interface Token {
  id: number;
  symbol: string;
  icon: string;
  balance: string;
  value: string;
}

export const CHAINS: Chain[] = [
  { id: 1, name: "Ton", icon: "/chains/ton.svg" },
  {
    id: 2,
    name: "Optimism",
    icon: "/chains/optimism.svg",
  },
];

export const TOKENS: Record<number, Token[]> = {
  1: [
    {
      id: 1,
      symbol: "jWETH",
      icon: "/tokens/weth.svg",
      balance: "1.85",
      value: "$1950.00",
    },
    {
      id: 2,
      symbol: "jUSDC",
      icon: "/tokens/usdc.svg",
      balance: "5000",
      value: "$5000.00",
    },
    {
      id: 3,
      symbol: "USDT",
      icon: "/tokens/usdt.svg",
      balance: "3200",
      value: "$3200.00",
    },
  ],
  2: [
    // Optimism tokens
    {
      id: 4,
      symbol: "WETH",
      icon: "/tokens/weth.svg",
      balance: "1.85",
      value: "$1950.00",
    },
    {
      id: 5,
      symbol: "USDC",
      icon: "/tokens/usdc.svg",
      balance: "8500",
      value: "$8500.00",
    },
    {
      id: 6,
      symbol: "USDT",
      icon: "/tokens/usdt.svg",
      balance: "4600",
      value: "$4600.00",
    },
  ],
};
