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

## 🚀 Deployment Status

✅ **DEPLOYED TO ONECHAIN TESTNET**

- **Package ID:** `0x8d3eb7a31ea0556530f86016db319c9f3bc7740932f8f8a2a1cc5dfa892b5be5`
- **Registry ID:** `0xaf2ead52c59352fa51b88b8c07a586ee5605f8f54fbc68d6842af1e85803a4d4`
- **Transaction:** `CcSWzdaynYMGryCfpPPEmpRiE4epp4KZbY4RyyNKdbMo`
- **Explorer:** [View on OneScan](https://onescan.cc/testnet/object/0x8d3eb7a31ea0556530f86016db319c9f3bc7740932f8f8a2a1cc5dfa892b5be5)
- **Network:** OneChain Testnet
- **Deployment Date:** March 27, 2026

## Installation & Setup

### 1. Setup OneChain CLI

```bash
git clone https://github.com/one-chain-labs/onechain.git
cd onechain
cargo install --path crates/one --locked --features tracing
one client new-env --alias testnet --rpc https://rpc-testnet.onelabs.cc:443
one client switch --env testnet
```

### 2. Run Frontend (Already Configured)

The frontend is already configured with the deployed contract addresses.

```bash
cd CertiChain/frontend
npm install
npm run dev
```

### 3. (Optional) Deploy Your Own Instance

```bash
cd CertiChain/contracts
one move build
one client publish --gas-budget 50000000 .
```

Then update `frontend/.env` with your Package ID and Registry ID.

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
