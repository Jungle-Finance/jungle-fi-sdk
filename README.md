# JungleFi SDK

A client side SDK for interfacing with Jungle Finance smart contracts.

# Installation
Yarn
```
$ yarn add @junglefinance/jungle-fi-sdk
```

npm
```
$ npm intall @junglefinance/jungle-fi-sdk --save
```

# Program Addresses
| Contract | Mainnet / Devnet                              |
|----------|-----------------------------------------------|
| Quarry   | `jDeFipStbGiKTJQGLEQRRA2HNeqjpXKoqgGeM9Fg3XT` |
| Raydium  | `rDeFi3U3Jbj31z8rbHGXxEsiKLTB24EdScFXVCncG3c` |
| Marinade | `mDeFijC2NYkK2kax3kCHYCgcaBZ9aV4wrpTeDLgcFc9` |

# VaultInfo Addresses
| Contract  | Name     | Mainnet                                        |
|-----------|----------|------------------------------------------------|
| Quarry    | I-JFI-Q3 | `21Vx4auojCE8xCqPVFhC1M7QiWuRaiXak3Nuh4YiUgX7` |
| Quarry    | I-JFI-Q4 | `8ua2wwcuGL9s1hrtcgH8x7KfwvEKXi95aqvJkmiLnKV8` |
| Raydium   | I-RAY-Q3 | `2QeZFinvmrinXk9nuLHRvDfW4cWnQMDG7RV3utzHrPHw` |
| Raydium   | I-RAY-Q4 | `HwK7u9crC5WjhxmmaxhFgVPbN3anjtbMg3y3uD4iSQEQ` |
| Marinade  | I-SOL-Q3 | ``  |

# Example
This is an example on depositing into a Marinade vault however there are various different ways to utilize the sdk,
this is just one of them.

### Setup Code
```ts
import { JungleMsolPlatformProvider } from "../jungle_msol";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { EndPoint } from "./types";

const provider = new JungleMsolPlatformProvider(
    new Connection("https://api.devnet.solana.com"),
    new PublicKey("mDeFijC2NYkK2kax3kCHYCgcaBZ9aV4wrpTeDLgcFc9"),
    EndPoint.dev
);

const VAULT_INFO = new PublicKey("iSoLXhjuJJz1pRPd6MkwhGn6Q8qCybZzK9F77dDGK2C");
```
### Deposit
```ts
import { Keypair } from "@solana/web3.js";

... (Setup Code)

const math = provider.createMath();

const DEPOSIT_AMOUNT = 1_000_000;

const vaultInfo = await provider.fetchVault(VAULT_INFO);

const signer = Keypair.generate(); // Your Signer Here!

const txId = await provider.depositRpc(
    [signer],
    DEPOSIT_AMOUNT,
    signer.publicKey,
    vaultInfo
)

console.log("Transaction Signature: " + txId);
```

### Math Library 
```ts
import JSBI from "jsbi";

... (Setup Code)

// Amounts in lamports
const returnAmounts = await math.calcDepositReturns(JSBI.BigInt(DEPOSIT_AMOUNT), vaultInfo);
if (returnAmounts.error){
    console.log("Math Error: " + returnAmounts.error);
} else {
    console.log("Return Amount: " + returnAmounts.result);
}
```

# Build
Run the following commands to fetch dependencies and build the sdk.
```
$ yarn install
$ yarn build
```