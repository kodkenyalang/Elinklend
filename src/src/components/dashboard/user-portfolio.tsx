"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, HeartPulse } from "lucide-react";

const STATS = [
    { title: "Supply Balance", value: 42050.71, icon: TrendingUp, color: "text-green-400" },
    { title: "Borrow Balance", value: 18320.44, icon: TrendingDown, color: "text-red-400" },
    { title: "Net APY", value: 4.88, isPercentage: true, icon: TrendingUp, color: "text-green-400" },
];

export default function UserPortfolio() {
    const [stats, setStats] = useState(STATS);
    const [healthFactor, setHealthFactor] = useState(78);

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prevStats => prevStats.map(stat => ({
                ...stat,
                value: stat.value * (1 + (Math.random() - 0.5) * 0.01)
            })));
            setHealthFactor(prev => {
                const newHealth = prev + (Math.random() - 0.5);
                return Math.max(0, Math.min(100, newHealth));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>My Portfolio</CardTitle>
                <CardDescription>Your aggregated position on ELinkLend.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-md bg-secondary ${stat.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                </div>
                                <p className="font-semibold text-foreground">
                                    {stat.isPercentage 
                                        ? `${stat.value.toFixed(2)}%`
                                        : `$${stat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                    }
                                </p>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-4">
                 <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HeartPulse className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium text-muted-foreground">Health Factor</p>
                    </div>
                    <p className="font-semibold text-foreground">{healthFactor.toFixed(2)}%</p>
                </div>
                <Progress value={healthFactor} aria-label="Health Factor" />
            </CardFooter>
        </Card>
    );
}
