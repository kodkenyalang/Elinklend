```markdown
# ElinkLend  
> Vue.js + Solidity + Rust + Goldsky

A **peer-to-peer** and **pools** lending dApp modernised for **Etherlink**.

---

## 🚀 Features
- Borrowers lock ERC-20 collateral and request loans  
- Lenders fund any amount of a loan; once 100 % filled the loan becomes **Active**  
- Borrowers repay principal + interest on-chain  
- Automatic liquidation if repayment deadline is missed  
- Real-time dashboard powered by **Goldsky Subgraph**  
- Gas-optimised contracts (< 0.02 XTZ per loan creation)

---

## 🏗️ Tech Stack
| Layer        | Tech                                                                 |
|--------------|----------------------------------------------------------------------|
| Smart Contracts | Solidity 0.8.24, Foundry                                         |
| Frontend     | Vue 3, Vite, ethers.js v6                                            |
| Backend      | Rust 1.79, Axum, ethers-rs                                           |
| Indexer      | Goldsky Subgraph (GraphQL)                                           |
| Network      | Etherlink Ghostnet (ChainId 128123)                                  |

---

## 📦 Quick Start
# ELinkLend - A Decentralized Lending Platform

This is a Next.js starter project for a decentralized lending and borrowing platform called ELinkLend, built to run on the Etherlink network. The application demonstrates both pool-based lending and peer-to-peer (P2P) loan functionalities.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your Thirdweb client ID:
    ```
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

Here is an overview of the key files and directories in the project:


.
├── contracts/
│   ├── P2PLending.sol      # Main Solidity contract for P2P loans.
│   └── SafeMath.sol        # Utility contract for safe math operations.
│
├── public/                 # Static assets (images, fonts, etc.).
│
├── src/
│   ├── app/                # Next.js App Router pages and layouts.
│   │   ├── (main)/         # Main application pages.
│   │   │   ├── page.tsx    # Dashboard homepage.
│   │   │   └── p2p/page.tsx # P2P lending page.
│   │   ├── layout.tsx      # Root layout for the application.
│   │   ├── globals.css     # Global styles and Tailwind CSS theme variables.
│   │   └── app-provider.tsx # Client-side provider setup (e.g., Thirdweb).
│   │
│   ├── components/         # Reusable React components.
│   │   ├── dashboard/      # Components for the main dashboard (Market Overview, etc.).
│   │   ├── layout/         # Site-wide layout components (Header, Footer).
│   │   ├── p2p/            # Components for P2P lending (Create Loan, Loan List).
│   │   └── ui/             # ShadCN UI components (Button, Card, Input, etc.).
│   │
│   ├── lib/                # Core application logic, constants, and utilities.
│   │   ├── abi.ts          # (Placeholder) ABI for the smart contract.
│   │   ├── constants.ts    # Application-wide constants and mock data.
│   │   ├── contracts.ts    # Functions for interacting with smart contracts via Thirdweb.
│   │   ├── thirdweb.ts     # Thirdweb client initialization.
│   │   ├── types.ts        # TypeScript type definitions for the app.
│   │   └── utils.ts        # Utility functions (e.g., `cn` for classnames).
│   │
│   └── hooks/              # Custom React hooks.
│       └── use-toast.ts    # Hook for managing toast notifications.
│
├── next.config.ts          # Next.js configuration file.
├── tailwind.config.ts      # Tailwind CSS configuration file.
└── tsconfig.json           # TypeScript configuration file.


### Key Technologies

-   **Next.js:** React framework for building the user interface.
-   **Thirdweb:** SDK for interacting with the Etherlink blockchain and smart contracts.
-   **ShadCN UI & Tailwind CSS:** For styling and building the component library.
-   **Solidity:** Language for writing the smart contracts.
-   **Etherlink:** The target blockchain network for the dApp.

### 1. Prerequisites

| Tool         | Install Command |
|--------------|-----------------|
| Node.js ≥ 18 | `brew install node` (macOS) or [nodejs.org](https://nodejs.org) |
| Foundry      | `curl -L https://foundry.paradigm.xyz | bash` |
| Rust         | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` |
| Goldsky CLI  | `npm i -g @goldskycom/cli` && `goldsky login` |

### 2. Clone & Install

```bash
# Fork and clone
git clone https://github.com/<your-username>/p2p-lending-etherlink.git
cd p2p-lending-etherlink

# Contracts
cd contracts
forge install

# Frontend
cd ../frontend
npm i

# Backend
cd ../backend
cargo build --release
```

### 3. Environment Variables

Copy the template files and fill in your keys:

```bash
cp contracts/.env.example contracts/.env
cp backend/.env.example backend/.env
```

Required variables  
```
PRIVATE_KEY=0x...          # deployer key (Ghostnet faucet below)
GOLDSKY_API_KEY=gsk_...
RPC_URL=https://node.ghostnet.etherlink.com
```

---

## 🛠️ Local Development

### Contracts

```bash
cd contracts
source .env
forge test               # unit tests
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast --verify -vvv
```

Save the printed contract address — you’ll need it for frontend/backend.

### Backend

```bash
cd backend
source .env
cargo run
# API now on http://localhost:3000
```

### Frontend

```bash
cd frontend
cp .env.example .env
# set VITE_CONTRACT_ADDRESS=<deployed address>
npm run dev
# Visit http://localhost:5173
```

Connect MetaMask to **Etherlink Ghostnet** (add network if needed):
- RPC: `https://node.ghostnet.etherlink.com`
- ChainId: `128123`
- Symbol: tXTZ
- Faucet: [Ghostnet Faucet](https://faucet.ghostnet.etherlink.com)

---

## 📊 Goldsky Subgraph

1. Install CLI (see prerequisites)  
2. Deploy:

```bash
cd subgraph
goldsky subgraph deploy p2p-lending-ghostnet/v0.1
```

3. Query endpoint:  
```
https://api.goldsky.com/api/public/project_<id>/subgraphs/p2p-lending-ghostnet/v0.1/gn
```

---

## 🧪 Testing

| Suite              | Command                        |
|--------------------|--------------------------------|
| Solidity unit       | `forge test`                   |
| Rust unit           | `cargo test`                   |
| Frontend e2e        | `npm run test:e2e` (Cypress)   |

---

## 📁 Repository Layout

```
├── contracts/           # Foundry project
├── subgraph/            # Goldsky manifest & mappings
├── backend/             # Rust Axum API
├── frontend/            # Vue 3 app
├── docker-compose.yml   # local stack (optional)
└── README.md
```

---


---

## 📄 License

MIT – see [LICENSE](LICENSE).

---

## 🔗 Links

- [Product Requirements Doc (PRD)](./docs/PRD.md)  
- [Live Demo (Staging)](https://staging-p2p.etherlink.app)  
- Etherlink Docs: https://docs.etherlink.com  
- Goldsky Docs: https://docs.goldsky.com
```
