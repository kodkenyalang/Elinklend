import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CreateLoan from "@/components/p2p/create-loan";
import LoanList from "@/components/p2p/loan-list";
import { P2PIcon } from "@/components/ui/asset-icon";

export default function P2PPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex items-center gap-4">
            <P2PIcon className="h-10 w-10 text-primary" />
            <div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                P2P Lending
              </h1>
              <p className="text-muted-foreground mt-2">
                Create and fund peer-to-peer loan requests.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LoanList />
            </div>
            <div className="lg:col-span-1">
              <CreateLoan />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
