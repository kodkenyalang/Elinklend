"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { CHART_DATA } from "@/lib/constants";

const chartConfig = {
  apy: {
    label: "APY",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function AssetChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market History</CardTitle>
        <CardDescription>Overall market APY trend over the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <AreaChart accessibilityLayer data={CHART_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}%`}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                content={<ChartTooltipContent 
                    formatter={(value) => [`${value}%`, 'APY']}
                    indicator="dot"
                />}
              />
              <Area type="monotone" dataKey="apy" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorApy)" />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
