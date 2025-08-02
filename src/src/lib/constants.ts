import type { Asset } from './types';

export const ETHERLINK_TESTNET_URL = 'https://node.ghostnet.etherlink.com';
export const ETHERLINK_MAINNET_URL = 'https://node.mainnet.etherlink.com';

export const MOCK_ASSETS: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    supplyApy: 3.45,
    borrowApy: 4.25,
    walletBalance: 2.5,
    totalSupplied: 12000,
    totalBorrowed: 8000,
    poolUtilization: 66.67,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    supplyApy: 2.89,
    borrowApy: 3.91,
    walletBalance: 0.1,
    totalSupplied: 5000,
    totalBorrowed: 2500,
    poolUtilization: 50.00,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    supplyApy: 5.12,
    borrowApy: 6.87,
    walletBalance: 15000,
    totalSupplied: 25000000,
    totalBorrowed: 18000000,
    poolUtilization: 72.00,
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    supplyApy: 4.88,
    borrowApy: 6.55,
    walletBalance: 8000,
    totalSupplied: 15000000,
    totalBorrowed: 10000000,
    poolUtilization: 66.67,
  },
];

export const CHART_DATA = [
    { month: "Jan", apy: 4.53 },
    { month: "Feb", apy: 4.21 },
    { month: "Mar", apy: 5.12 },
    { month: "Apr", apy: 5.34 },
    { month: "May", apy: 5.87 },
    { month: "Jun", apy: 6.21 },
    { month: "Jul", apy: 6.05 },
    { month: "Aug", apy: 6.43 },
    { month: "Sep", apy: 7.11 },
    { month: "Oct", apy: 7.02 },
    { month: "Nov", apy: 7.56 },
    { month: "Dec", apy: 7.89 },
];
