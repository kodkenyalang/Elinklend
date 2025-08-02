import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MarketOverview from "@/components/dashboard/market-overview";
import UserPortfolio from "@/components/dashboard/user-portfolio";
import AssetChart from "@/components/dashboard/asset-chart";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Supply and borrow assets from liquidity pools on the Etherlink network.
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            <div className="xl:col-span-2">
              <MarketOverview />
            </div>
            <div className="xl:col-span-1 space-y-6 lg:space-y-8">
              <UserPortfolio />
              <AssetChart />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
