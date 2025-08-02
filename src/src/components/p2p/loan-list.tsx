"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { P2PLoan } from "@/lib/types";
import { AssetIcon } from "../ui/asset-icon";
import { Badge } from "../ui/badge";
import { useActiveAccount } from "thirdweb/react";
import { fundLoan, repayLoan } from "@/lib/contracts";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// In a real app, this data would come from contract events or a subgraph.
const MOCK_LOANS: P2PLoan[] = [
    { id: '1', borrower: '0x1234567890123456789012345678901234567890', amount: 1000, interest: 5, duration: 30, collateralAmount: 0.5, collateralAsset: 'ETH', status: 'Open' },
    { id: '2', borrower: '0x456...def', amount: 5000, interest: 8, duration: 90, collateralAmount: 2, collateralAsset: 'ETH', status: 'Open' },
    { id: '3', borrower: '0x789...ghi', amount: 200, interest: 12, duration: 14, collateralAmount: 0.1, collateralAsset: 'WBTC', status: 'Funded', lender: '0xabc...123' },
    { id: '4', borrower: '0xabc...123', amount: 10000, interest: 6.5, duration: 60, collateralAmount: 3.5, collateralAsset: 'ETH', status: 'Repaid', lender: '0xdef...456' },
    { id: '5', borrower: '0xdef...456', amount: 750, interest: 7, duration: 30, collateralAmount: 0.4, collateralAsset: 'ETH', status: 'Open' },
];

export default function LoanList() {
    const { toast } = useToast();
    const account = useActiveAccount();
    const [loadingLoan, setLoadingLoan] = useState<string | null>(null);

    const handleFundLoan = async (loan: P2PLoan) => {
        if (!account) {
            toast({ title: "Wallet not connected", description: "Please connect your wallet to fund a loan.", variant: "destructive" });
            return;
        }
        setLoadingLoan(loan.id);
        try {
            await fundLoan(account, loan.id);
            toast({
                title: "Loan Funded!",
                description: `You have successfully funded the loan for ${loan.amount} USDC.`,
            });
            // Here you would re-fetch the list of loans to update the status
        } catch (error) {
            console.error("Failed to fund loan:", error);
            toast({
                title: "Error Funding Loan",
                description: (error as Error).message,
                variant: "destructive",
            });
        } finally {
            setLoadingLoan(null);
        }
    };

    const handleRepayLoan = async (loan: P2PLoan) => {
         if (!account) {
            toast({ title: "Wallet not connected", description: "Please connect your wallet to repay a loan.", variant: "destructive" });
            return;
        }
        setLoadingLoan(loan.id);
        try {
            await repayLoan(account, loan.id);
            toast({
                title: "Loan Repaid!",
                description: `You have successfully repaid your loan.`,
            });
            // Here you would re-fetch the list of loans to update the status
        } catch (error) {
             console.error("Failed to repay loan:", error);
            toast({
                title: "Error Repaying Loan",
                description: (error as Error).message,
                variant: "destructive",
            });
        } finally {
            setLoadingLoan(null);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Open Loan Requests</CardTitle>
                <CardDescription>Browse and fund open P2P loan requests. This is currently mock data.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Amount (USDC)</TableHead>
                                <TableHead>Interest</TableHead>

                                <TableHead>Duration</TableHead>
                                <TableHead>Collateral</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_LOANS.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell className="font-mono">${loan.amount.toLocaleString()}</TableCell>
                                    <TableCell className="font-mono">{loan.interest}%</TableCell>
                                    <TableCell>{loan.duration} days</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <AssetIcon symbol={loan.collateralAsset} className="h-6 w-6" />
                                            <span className="font-mono">{loan.collateralAmount} {loan.collateralAsset}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={loan.status === 'Open' ? 'secondary' : (loan.status === 'Funded' ? 'default' : 'outline')}>
                                            {loan.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {loan.status === 'Open' && (
                                            <Button size="sm" onClick={() => handleFundLoan(loan)} disabled={!account || !!loadingLoan}>
                                                {loadingLoan === loan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Fund Loan
                                            </Button>
                                        )}
                                        {loan.status === 'Funded' && account?.address === loan.borrower && (
                                            <Button size="sm" variant="outline" onClick={() => handleRepayLoan(loan)} disabled={!account || !!loadingLoan}>
                                                 {loadingLoan === loan.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Repay
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
