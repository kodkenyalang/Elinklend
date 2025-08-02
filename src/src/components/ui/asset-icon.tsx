import { type SVGProps } from "react";
import { type AssetSymbol } from "@/lib/types";

export const P2PIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.72c0 .27.16.58.67.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z"/>
    </svg>
);


// A simple map for demonstration. In a real app, these would be more robust.
const ICONS: Record<AssetSymbol, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  ETH: (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
      <path d="M16 22.5834L9.25 16.6667L16 12.5L22.75 16.6667L16 22.5834Z" fill="#FFFFFF" fillOpacity="0.6"/>
      <path d="M16 22.5833L22.75 16.6667L16 12.5V22.5833Z" fill="#FFFFFF"/>
      <path d="M16 10.9917L9.25 15.1583L16 21.075L22.75 15.1583L16 10.9917Z" fill="#FFFFFF" fillOpacity="0.6"/>
      <path d="M16 21.075V10.9917L22.75 15.1583L16 21.075Z" fill="#FFFFFF"/>
    </svg>
  ),
  WBTC: (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#F7931A"/>
      <path d="M22.01,17.49H19.96v2.05h-1.9v-2.05H15.9v-1.92h2.16v-1.6c0-1.07.44-1.8,1.52-1.8.35,0,.68.03.96.08l-.29,1.86h-.4c-.2,0-.35.12-.35.38v1.08h2.09l-.24,1.92Z" fill="white"/>
      <path d="M13.23,17.49h-2.1v2.05h-1.9v-2.05H7.07v-1.92h2.16v-1.6c0-1.07.44-1.8,1.52-1.8.35,0,.68.03.96.08l-.29,1.86h-.4c-.2,0-.35.12-.35.38v1.08h2.09l-.24,1.92Z" fill="white" opacity="0.6"/>
    </svg>
  ),
  USDC: (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#2775CA"/>
      <path d="M16,24.5c-4.69,0-8.5-3.81-8.5-8.5s3.81-8.5,8.5-8.5,8.5,3.81,8.5,8.5S20.69,24.5,16,24.5Zm0-15c-3.58,0-6.5,2.92-6.5,6.5s2.92,6.5,6.5,6.5,6.5-2.92,6.5-6.5S19.58,9.5,16,9.5Z" fill="white"/>
      <path d="M17.47,19.24H14.71s-.13-1.42.06-2.09c.2-.67,1.02-1.12,2.15-1.37.52-.12,1-.26,1-.61s-.33-.63-1.09-.63c-.88,0-1.28.31-1.42.87l-2.03-.68c.27-1.44,1.75-2.26,3.48-2.26,1.99,0,3.22.92,3.22,2.44,0,1.13-.74,1.84-2.18,2.16-.5.11-.91.23-.91.54s.28.59,1.1.59c.98,0,1.48-.44,1.64-1.08l2.03.68c-.41,1.68-2.11,2.5-3.76,2.5Z" fill="white"/>
    </svg>
  ),
  DAI: (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#F4B731"/>
      <path d="M16 22L8 16l8-6v12z" fill="#fff"/>
      <path d="M16 22l8-6-8-6v12z" fill="#fff" opacity=".6"/>
    </svg>
  ),
};

export function AssetIcon({ symbol, className }: { symbol: AssetSymbol; className?: string }) {
  const Icon = ICONS[symbol];
  return Icon ? <Icon className={className} /> : null;
}
