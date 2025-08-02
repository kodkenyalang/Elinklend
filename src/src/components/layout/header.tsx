"use client";

import Link from "next/link";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Link as LinkIcon } from "lucide-react";
import { defineChain } from "thirdweb/chains";
import { P2PIcon } from "../ui/asset-icon";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { client } from "@/lib/thirdweb";

const wallets = [
  createWallet("io.metamask"),
  inAppWallet(),
];

export const etherlinkTestnet = defineChain({
  id: 128123,
  name: "Etherlink Testnet",
  rpc: "https://node.ghostnet.etherlink.com",
  nativeCurrency: {
    name: "Tezos",
    symbol: "XTZ",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Etherlink Testnet Explorer",
      url: "https://testnet-explorer.etherlink.com",
    },
  ],
});

export default function Header() {
  const pathname = usePathname();
  const account = useActiveAccount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <LinkIcon className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">ELinkLend</span>
          </Link>
          <nav className="flex items-center gap-4">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Pools
              </Link>
              <Link
                href="/p2p"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/p2p" ? "text-primary" : "text-muted-foreground"
                )}
              >
                <P2PIcon className="h-4 w-4" />
                P2P Loans
              </Link>
            </nav>
        </div>
        <div className="flex items-center gap-4">
            <ConnectButton
              client={client}
              wallets={wallets}
              chain={etherlinkTestnet}
              theme={"dark"}
              connectModal={{
                size: "compact",
              }}
            />
        </div>
      </div>
    </header>
  );
}
