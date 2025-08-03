"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowUpDown, Settings } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import React, { useState } from "react";
import Image from "next/image";
import { CHAINS, TOKENS, type Chain, type Token } from "@/lib/constants";

const Page = () => {
  const [fromChain, setFromChain] = useState<Chain>(CHAINS[0]);
  const [toChain, setToChain] = useState<Chain>(CHAINS[1]);
  const [fromToken, setFromToken] = useState<Token>(TOKENS[1][0]);
  const [toToken, setToToken] = useState<Token>(TOKENS[2][0]);

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [fromAmount, setFromAmount] = useState("1");

  const handleAmountChange = (value: string) => {
    // Allow only numbers and one decimal point
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value) || value === "") {
      setFromAmount(value);
    }
  };

  const TokenSelector = ({
    chain,
    token,
    isOpen,
    onOpenChange,
    onSelect,
  }: {
    chain: Chain;
    token: Token;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (chain: Chain, token: Token) => void;
  }) => {
    const [chainSearch, setChainSearch] = useState("");
    const [tokenSearch, setTokenSearch] = useState("");
    const [activeChain, setActiveChain] = useState<Chain>(chain);

    const filteredChains = CHAINS.filter((c) =>
      c.name.toLowerCase().includes(chainSearch.toLowerCase())
    );

    const filteredTokens = TOKENS[activeChain.id].filter((t: Token) =>
      t.symbol.toLowerCase().includes(tokenSearch.toLowerCase())
    );

    return (
      <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
        <Popover.Trigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-3 h-auto p-0 hover:bg-transparent"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-background border border-border">
                <Image
                  src={token.icon}
                  alt={token.symbol}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 z-50">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-background border-2 border-background">
                  <Image
                    src={chain.icon}
                    alt={chain.name}
                    width={16}
                    height={16}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground font-medium">
                {token.symbol}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </Button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="w-[480px] bg-popover border border-border rounded-lg shadow-lg p-0 z-50"
            align="start"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              setActiveChain(chain);
              setChainSearch("");
              setTokenSearch("");
            }}
          >
            <div className="flex h-80">
              {/* Left side - Chains */}
              <div className="w-40 border-r border-border flex flex-col">
                <div className="px-3 py-2 text-xs text-muted-foreground border-b">
                  Chains
                </div>
                <div className="p-2">
                  <Input
                    placeholder="Search chains..."
                    value={chainSearch}
                    onChange={(e) => setChainSearch(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex-1 overflow-y-auto p-1">
                  {filteredChains.map((chainOption) => (
                    <div
                      key={chainOption.id}
                      onClick={() => {
                        setActiveChain(chainOption);
                        setTokenSearch("");
                      }}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-accent transition-colors ${
                        activeChain.id === chainOption.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-background border border-border">
                        <Image
                          src={chainOption.icon}
                          alt={chainOption.name}
                          width={20}
                          height={20}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{chainOption.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Tokens */}
              <div className="flex-1 flex flex-col">
                <div className="px-3 py-2 text-xs text-muted-foreground border-b flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full overflow-hidden bg-background border border-border">
                    <Image
                      src={activeChain.icon}
                      alt={activeChain.name}
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{activeChain.name} Tokens</span>
                </div>
                <div className="p-2">
                  <Input
                    placeholder="Search tokens..."
                    value={tokenSearch}
                    onChange={(e) => setTokenSearch(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex-1 overflow-y-auto p-1">
                  {filteredTokens.map((tokenOption: Token) => (
                    <div
                      key={tokenOption.id}
                      onClick={() => {
                        onSelect(activeChain, tokenOption);
                        onOpenChange(false);
                      }}
                      className="flex items-center justify-between p-3 rounded cursor-pointer hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-background border border-border">
                          <Image
                            src={tokenOption.icon}
                            alt={tokenOption.symbol}
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">
                          {tokenOption.symbol}
                        </span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">{tokenOption.balance}</div>
                        <div className="text-muted-foreground text-xs">
                          {tokenOption.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pb-20">
      <Card className="w-full max-w-md relative overflow-hidden bg-card/50 backdrop-blur-sm border shadow-2xl">
        {/* Background gradient positioned relative to the card */}
        <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--background))_40%,hsl(var(--primary)/0.3)_100%)] opacity-60"></div>

        {/* Content with relative positioning to stay above gradient */}
        <div className="relative z-10">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Swap</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-0">
            {/* FROM Section */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">FROM</span>
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <TokenSelector
                    chain={fromChain}
                    token={fromToken}
                    isOpen={fromOpen}
                    onOpenChange={setFromOpen}
                    onSelect={(selectedChain, selectedToken) => {
                      setFromChain(selectedChain);
                      setFromToken(selectedToken);
                    }}
                  />
                  <div className="text-right">
                    <Input
                      value={fromAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      placeholder="0"
                      className="!bg-transparent rounded-none border-none text-right !text-2xl font-bold text-foreground p-0 h-auto focus-visible:ring-0 focus:outline-none focus:ring-0 shadow-none"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Max</span>
                  <span className="text-sm text-muted-foreground">
                    {fromToken.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Swap Arrow - absolutely positioned and centered */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent rounded-full bg-card border shadow-lg"
                  onClick={() => {
                    // Swap chains
                    setFromChain(toChain);
                    setToChain(fromChain);

                    // Swap tokens - find corresponding tokens in the new chains
                    const fromTokens = TOKENS[toChain.id];
                    const toTokens = TOKENS[fromChain.id];

                    // Find tokens with similar symbols or default to first token
                    const newFromToken =
                      fromTokens.find((t) => t.symbol === toToken.symbol) ||
                      fromTokens[0];
                    const newToToken =
                      toTokens.find((t) => t.symbol === fromToken.symbol) ||
                      toTokens[0];

                    setFromToken(newFromToken);
                    setToToken(newToToken);
                  }}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* TO Section */}
            <div className="space-y-2">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <TokenSelector
                    chain={toChain}
                    token={toToken}
                    isOpen={toOpen}
                    onOpenChange={setToOpen}
                    onSelect={(selectedChain, selectedToken) => {
                      setToChain(selectedChain);
                      setToToken(selectedToken);
                    }}
                  />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      2,610.39
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Max</span>
                  <span className="text-sm text-muted-foreground">
                    {toToken.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="pt-4">
              <Button className="w-full rounded-full" size={"lg"}>
                Swap
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Page;
