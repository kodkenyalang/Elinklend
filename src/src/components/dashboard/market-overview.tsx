"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_ASSETS } from "@/lib/constants";
import type { Asset, AssetSymbol } from "@/lib/types";
import { AssetIcon } from "@/components/ui/asset-icon";
import { useToast } from '@/hooks/use-toast';

type ActionType = "Supply" | "Withdraw" | "Borrow" | "Repay";

function ActionModal({
  isOpen,
  onClose,
  asset,
  actionType,
}: {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  actionType: ActionType | null;
}) {
  const { toast } = useToast();

  if (!asset || !actionType) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = (e.currentTarget.elements.namedItem('amount') as HTMLInputElement).value;
    toast({
        title: `${actionType} Successful`,
        description: `You have successfully ${actionType.toLowerCase}ed ${amount} ${asset.symbol}.`,
        variant: "default",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>{actionType} {asset.name}</DialogTitle>
                <DialogDescription>
                    Enter the amount you wish to {actionType.toLowerCase()}. Your available balance is {asset.walletBalance.toFixed(2)} {asset.symbol}.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                        Amount
                    </Label>
                    <Input id="amount" name="amount" type="number" step="any" placeholder="0.00" className="col-span-3" required />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">{actionType}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


function MarketTable({ assets, onActionClick, type }: { assets: Asset[]; onActionClick: (asset: Asset, action: ActionType) => void; type: "supply" | "borrow" }) {
    const isSupply = type === 'supply';
    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead className="text-right">APY</TableHead>
                        <TableHead className="text-right">Wallet</TableHead>
                        <TableHead className="text-right">Utilization</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assets.map((asset) => (
                        <TableRow key={asset.symbol}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <AssetIcon symbol={asset.symbol as AssetSymbol} className="h-8 w-8" />
                                    <div>
                                        <p>{asset.symbol}</p>
                                        <p className="text-xs text-muted-foreground">{asset.name}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-mono text-primary">{isSupply ? asset.supplyApy.toFixed(2) : asset.borrowApy.toFixed(2)}%</TableCell>
                            <TableCell className="text-right font-mono">{asset.walletBalance.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-mono">{asset.poolUtilization.toFixed(2)}%</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="sm" onClick={() => onActionClick(asset, isSupply ? "Supply" : "Borrow")}>{isSupply ? "Supply" : "Borrow"}</Button>
                                <Button size="sm" variant="outline" onClick={() => onActionClick(asset, isSupply ? "Withdraw" : "Repay")}>{isSupply ? "Withdraw" : "Repay"}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}


export default function MarketOverview() {
    const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
    const [modalState, setModalState] = useState<{ isOpen: boolean; asset: Asset | null; actionType: ActionType | null }>({
        isOpen: false,
        asset: null,
        actionType: null,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setAssets(prevAssets =>
                prevAssets.map(asset => ({
                    ...asset,
                    supplyApy: asset.supplyApy * (1 + (Math.random() - 0.49) * 0.02),
                    borrowApy: asset.borrowApy * (1 + (Math.random() - 0.49) * 0.02),
                    poolUtilization: Math.max(0, Math.min(100, asset.poolUtilization + (Math.random() - 0.5))),
                }))
            );
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleActionClick = (asset: Asset, actionType: ActionType) => {
        setModalState({ isOpen: true, asset, actionType });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, asset: null, actionType: null });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Markets</CardTitle>
                <CardDescription>All available assets for supplying and borrowing.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="supply">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="supply">Supply</TabsTrigger>
                        <TabsTrigger value="borrow">Borrow</TabsTrigger>
                    </TabsList>
                    <TabsContent value="supply">
                        <MarketTable assets={assets} onActionClick={handleActionClick} type="supply" />
                    </TabsContent>
                    <TabsContent value="borrow">
                        <MarketTable assets={assets} onActionClick={handleActionClick} type="borrow" />
                    </TabsContent>
                </Tabs>
            </CardContent>
            <ActionModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                asset={modalState.asset}
                actionType={modalState.actionType}
            />
        </Card>
    );
}
