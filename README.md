# 🎓 CertiChain - AI-Powered Certification Platform

CertiChain is a decentralized certification platform built on OneChain that leverages artificial intelligence to enhance the validation and verification of credentials.

## Features

- **Tamper-Proof Certificates**: NFT-based certificates permanently recorded on-chain
- **AI Validation**: Automated fraud detection and credential verification
- **Issuer Registry**: Verified institutions and credential issuers
- **Metadata Analysis**: AI analyzes certificate patterns and detects inconsistencies

## Project Structure

```
CertiChain/
├── contracts/          # Move smart contracts
│   ├── Move.toml
│   └── sources/
│       └── certichain.move
└── frontend/           # React TypeScript frontend
    ├── src/
    │   ├── App.tsx
    │   ├── App.css
    │   └── main.tsx
    └── .env
```

## Prerequisites

- Rust (stable)
- Node.js 18+
- OneChain CLI installed
- OneChain wallet with testnet ONE tokens

## Installation & Deployment

### 1. Setup OneChain CLI

```bash
git clone https://github.com/one-chain-labs/onechain.git
cd onechain
cargo install --path crates/one --locked --features tracing
one client new-env --alias testnet --rpc https://rpc-testnet.onelabs.cc:443
one client switch --env testnet
```

### 2. Build & Deploy Contract

```bash
cd CertiChain/contracts
one move build
one client publish --gas-budget 50000000 .
```

Save the Package ID and Registry ID.

### 3. Configure Frontend

Update `frontend/.env`:
```
VITE_PACKAGE_ID=0x<your_package_id>
VITE_REGISTRY_ID=0x<your_registry_id>
```

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Connect your OneChain wallet
2. Register as a certificate issuer
3. Issue certificates to recipients
4. Recipients receive NFT certificates
5. AI validates certificate authenticity
6. Anyone can verify certificates on-chain

## Smart Contract Functions

- `register_issuer`: Register as a certificate issuer
- `issue_certificate`: Issue a new certificate NFT
- `verify_certificate`: AI-powered verification
- `get_certificate_info`: View certificate details
- `is_verified`: Check verification status

## Technology Stack

- **Blockchain**: OneChain (Move language)
- **Frontend**: React + TypeScript + Vite
- **Styling**: Custom CSS with geometric patterns
- **Wallet Integration**: @onelabs/dapp-kit

## License

MIT License
