import { ETHERLINK_TESTNET_URL, ETHERLINK_MAINNET_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 py-6 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for the Etherlink Network.
          </p>
          <div className="flex gap-4">
            <a
              href={ETHERLINK_TESTNET_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Testnet
            </a>
            <a
              href={ETHERLINK_MAINNET_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Mainnet
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
