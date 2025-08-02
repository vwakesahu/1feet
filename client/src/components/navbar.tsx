"use client";
import Image from "next/image";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
