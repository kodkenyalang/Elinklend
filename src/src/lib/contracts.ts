
"use client";

import { getContract } from "thirdweb";
import { client } from "@/lib/thirdweb";
import { etherlinkTestnet } from "@/components/layout/header";
import { P2P_LENDING_ABI } from "./abi";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb/transaction";
import { type Account } from "thirdweb/wallets";
import { parseEther } from "ethers/lib/utils";


// TODO: Replace with your deployed contract address
export const P2P_LENDING_CONTRACT_ADDRESS = "0x...";

const isContractConfigured = P2P_LENDING_CONTRACT_ADDRESS && !P2P_LENDING_CONTRACT_ADDRESS.startsWith("0x...");

if (!isContractConfigured) {
    console.warn("P2P_LENDING_CONTRACT_ADDRESS is not set. Please update it in src/lib/contracts.ts");
}

export const p2pLendingContract = isContractConfigured ? getContract({
    client: client,
    chain: etherlinkTestnet,
    address: P2P_LENDING_CONTRACT_ADDRESS,
    abi: P2P_LENDING_ABI,
}) : null;

function checkContractConfiguration() {
    if (!p2pLendingContract) {
        throw new Error("Contract is not configured. Please update the contract address in src/lib/contracts.ts");
    }
    return p2pLendingContract;
}

// All amounts are handled in their smallest unit (e.g., wei for ETH, 6 decimals for USDC)

/**
 * Creates a loan request on the smart contract.
 * @param account The connected wallet account from thirdweb.
 * @param loanAmount The amount of USDC to borrow (e.g., 1000).
 * @param interestRate The interest rate in basis points (e.g., 5% is 500).
 * @param durationSeconds The loan duration in seconds.
 * @param collateralAssetAddress The address of the collateral token contract.
 * @param collateralAmount The amount of collateral token (e.g., 0.5 ETH).
 */
export async function createLoanRequest(
    account: Account,
    loanAmount: number,
    interestRate: number,
    durationSeconds: number,
    collateralAssetAddress: string,
    collateralAmount: number
) {
    const contract = checkContractConfiguration();
    // Assuming USDC has 6 decimals
    const loanAmountInSmallestUnit = BigInt(loanAmount * 1_000_000); 
    // Assuming collateral is ETH (18 decimals)
    const collateralAmountInWei = parseEther(collateralAmount.toString()).toBigInt();

    const transaction = prepareContractCall({
        contract: contract,
        method: "createLoanRequest",
        params: [
            loanAmountInSmallestUnit,
            interestRate * 100, // e.g., 5% -> 500 basis points
            durationSeconds,
            collateralAssetAddress,
            collateralAmountInWei
        ],
        value: collateralAmount > 0 ? collateralAmountInWei : 0n, // Sending ETH as collateral
    });

    const receipt = await sendAndConfirmTransaction({
        transaction,
        account,
    });

    return receipt;
}

/**
 * Funds an existing loan request.
 * @param account The connected wallet account from thirdweb.
 * @param loanId The ID of the loan to fund.
 */
export async function fundLoan(account: Account, loanId: string) {
    const contract = checkContractConfiguration();
    const transaction = prepareContractCall({
        contract: contract,
        method: "fundLoan",
        params: [loanId],
    });

    const receipt = await sendAndConfirmTransaction({
        transaction,
        account,
    });
    
    return receipt;
}

/**
 * Repays a funded loan.
 * @param account The connected wallet account from thirdweb.
 * @param loanId The ID of the loan to repay.
 */
export async function repayLoan(account: Account, loanId: string) {
    const contract = checkContractConfiguration();
    // Note: This assumes the borrower has approved the contract to spend their USDC.
    // In a real app, you would need an approval step first.
    const transaction = prepareContractCall({
        contract: contract,
        method: "repayLoan",
        params: [loanId],
    });

    const receipt = await sendAndConfirmTransaction({
        transaction,
        account,
    });
    
    return receipt;
}
