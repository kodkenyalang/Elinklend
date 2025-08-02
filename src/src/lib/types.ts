import type { Address } from 'thirdweb';

export type AssetSymbol = 'ETH' | 'USDC' | 'DAI' | 'WBTC';

export interface Asset {
  symbol: AssetSymbol;
  name: string;
  supplyApy: number;
  borrowApy: number;
  walletBalance: number;
  totalSupplied: number;
  totalBorrowed: number;
  poolUtilization: number;
}

export type LoanStatus = 'Open' | 'Funded' | 'Repaid' | 'Defaulted';

export interface P2PLoan {
    id: string;
    borrower: Address;
    lender?: Address;
    amount: number; // in USDC for simplicity
    interest: number; // percentage
    duration: number; // in days
    collateralAmount: number;
    collateralAsset: 'ETH' | 'WBTC'; // for simplicity
    status: LoanStatus;
}
