# Expense Splitter


## todo
- project setup ✅
- mongodb config ✅
- next auth setup ✅
- create Smart account ✅
- Landing page  ✅
- Dashboard (dummy)
- Create Groups





## Phase 1

- User onboarding using google sign in and creation of Smart Account Wallet
- DB for user management
- using bicotomy SDK
- Users can create smart contract accounts and recover them as well no private key management
- users can create groups for expense splitting
- an escrow contract handles the payment
- user transparency


# Project
expense-splitter/
├── app/                          # Next.js project
│   ├── app/                      # App Router
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── groups/
│   │   │   │   ├── create/route.ts
│   │   │   │   ├── join/route.ts
│   │   │   │   └── [groupId]/route.ts
│   │   │   ├── contribute/route.ts
│   │   │   ├── settle/route.ts
│   │   │   └── wallet/create/route.ts
│   │   ├── dashboard/page.tsx
│   │   ├── groups/[groupId]/page.tsx
│   │   └── page.tsx
│   ├── lib/mongoose.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Group.ts
│   │   └── Contribution.ts
│   ├── .env.local
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── next.config.js
│   ├── tsconfig.json
├── web3/                         # Foundry project
│   ├── src/Escrow.sol
│   ├── script/DeployEscrow.s.sol
│   ├── test/Escrow.t.sol
│   ├── foundry.toml
├── .gitignore
└── README.md