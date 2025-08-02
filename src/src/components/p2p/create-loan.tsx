"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useActiveAccount } from "thirdweb/react";
import { createLoanRequest } from "@/lib/contracts";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const AssetSymbol = z.enum(["ETH", "WBTC"]);

// These are example addresses on a testnet. Replace with actual token addresses on Etherlink.
const COLLATERAL_ASSET_ADDRESSES = {
    ETH: "0x...", // Native ETH is usually represented by a specific address in contracts
    WBTC: "0x..." 
};

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  interest: z.coerce.number().min(0, "Interest rate cannot be negative").max(100, "Interest rate cannot exceed 100%"),
  duration: z.coerce.number().int().positive("Duration must be a positive number of days"),
  collateralAmount: z.coerce.number().positive("Collateral amount must be positive"),
  collateralAsset: AssetSymbol,
});

export default function CreateLoan() {
  const { toast } = useToast();
  const account = useActiveAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      interest: undefined,
      duration: 30,
      collateralAmount: undefined,
      collateralAsset: "ETH",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
        toast({ title: "Wallet not connected", description: "Please connect your wallet to create a loan request.", variant: "destructive" });
        return;
    }
    setIsSubmitting(true);
    try {
        const durationInSeconds = values.duration * 24 * 60 * 60;
        const collateralAddress = COLLATERAL_ASSET_ADDRESSES[values.collateralAsset];

        if (collateralAddress === '0x...') {
            throw new Error(`Placeholder address for ${values.collateralAsset}. Update in create-loan.tsx`);
        }

        console.log("Creating loan request with values:", values);
        
        const receipt = await createLoanRequest(
            account,
            values.amount,
            values.interest,
            durationInSeconds,
            collateralAddress,
            values.collateralAmount
        );

        console.log("Transaction receipt:", receipt);
        toast({
            title: "Loan Request Created Successfully!",
            description: `Your request for ${values.amount} USDC has been submitted. Tx: ${receipt.transactionHash.substring(0,10)}...`,
        });
        form.reset();
    } catch (error) {
        console.error("Failed to create loan request:", error);
        toast({
            title: "Error Creating Loan Request",
            description: (error as Error).message,
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Loan Request</CardTitle>
        <CardDescription>Request a loan by specifying your terms and putting up collateral.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount (USDC)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (days)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="space-y-2">
                <FormLabel>Collateral</FormLabel>
                <div className="flex gap-2">
                    <FormField
                    control={form.control}
                    name="collateralAmount"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                        <FormControl>
                            <Input type="number" placeholder="0.5" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="collateralAsset"
                    render={({ field }) => (
                        <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Asset" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="ETH">ETH</SelectItem>
                                <SelectItem value="WBTC">WBTC</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || !account}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Create Loan Request'}
            </Button>
            {!account && <p className="text-center text-xs text-muted-foreground mt-2">Connect your wallet to create a loan.</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
