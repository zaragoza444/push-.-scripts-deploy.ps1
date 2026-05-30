# Shiva Blockchain & Wallet

Production-ready scaffold for the Shiva blockchain and Shiva wallet monorepo.

## Repository layout

- `shiva-blockchain/` contains the blockchain core implementation and validation logic.
- `shiva-wallet/` contains the keypair, address, and transaction signing implementation.

## Production setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build both packages:
   ```bash
   npm run build
   ```
3. Start the API server:
   ```bash
   npm start
   ```
4. Run the integration demo:
   ```bash
   npm run demo
   ```

## Development server

Start the API server with a fresh build:

```bash
npm run serve
```

## API endpoints

- `GET /chain` — returns full blockchain
- `GET /pending` — returns pending transactions
- `GET /balance/:address` — returns balance for an address
- `POST /transaction` — submit a signed transaction
- `POST /mine` — mine pending transactions to reward a miner
- `POST /wallet` — create a new wallet for testing

## Docker

Build the production container:

```bash
docker build -t shiva-project .
```

Run the container:

```bash
docker run --rm -p 3000:3000 shiva-project
```

## Docker Compose

```bash
docker compose up --build
```

## API Usage Examples

Start the server:

```bash
npm run serve
```

Then use these endpoints:

- `GET /health` — service status
- `GET /chain` — full blockchain and pending transactions
- `GET /pending` — current pending transactions
- `GET /balance/:address` — balance for a wallet address
- `POST /transaction` — submit a signed transaction
- `POST /mine` — mine pending transactions
- `POST /wallet` — create a new wallet for testing

Example `curl` requests:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/chain
curl http://localhost:3000/pending
curl http://localhost:3000/balance/YOUR_ADDRESS
```

Create a wallet:

```bash
curl -X POST http://localhost:3000/wallet
```

Mine a block:

```bash
curl -X POST http://localhost:3000/mine \
  -H "Content-Type: application/json" \
  -d '{"minerAddress":"YOUR_ADDRESS"}'
```

Submit a transaction:

```bash
curl -X POST http://localhost:3000/transaction \
  -H "Content-Type: application/json" \
  -d '{"fromAddress":"FROM_ADDRESS","toAddress":"TO_ADDRESS","amount":10,"signature":"...","publicKey":"..."}'
```

## Transaction Lifecycle Example

1. Create a wallet:

```bash
curl -X POST http://localhost:3000/wallet
```

Save the returned `address`, `publicKey`, and `privateKey`.

2. With a valid wallet, construct and sign a transaction in your client code.
   - The request body must include:
     - `fromAddress`
     - `toAddress`
     - `amount`
     - `signature`
     - `publicKey`

3. Submit the signed transaction:

```bash
curl -X POST http://localhost:3000/transaction \
  -H "Content-Type: application/json" \
  -d '{"fromAddress":"YOUR_ADDRESS","toAddress":"RECIPIENT_ADDRESS","amount":10,"signature":"SIGNED_PAYLOAD","publicKey":"YOUR_PUBLIC_KEY"}'
```

4. Mine the transaction into a block:

```bash
curl -X POST http://localhost:3000/mine \
  -H "Content-Type: application/json" \
  -d '{"minerAddress":"YOUR_ADDRESS"}'
```

5. Check balances and verify chain state:

```bash
curl http://localhost:3000/balance/YOUR_ADDRESS
curl http://localhost:3000/chain
```

## Node.js Transaction Signing Example

The wallet uses `secp256k1` to sign transaction payloads. Here is a minimal Node.js example to sign a transaction before submitting it:

```js
const { createSign, createHash } = require('crypto');

const transaction = {
  fromAddress: 'YOUR_ADDRESS',
  toAddress: 'RECIPIENT_ADDRESS',
  amount: 10
};

const payload = `${transaction.fromAddress}|${transaction.toAddress}|${transaction.amount}`;

const sign = createSign('SHA256');
sign.update(payload);
sign.end();

// Replace this with your PEM private key string
const privateKey = `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`;

const signature = sign.sign(privateKey, 'hex');

const signedTransaction = {
  ...transaction,
  signature,
  publicKey: 'YOUR_PUBLIC_KEY'
};

console.log(JSON.stringify(signedTransaction, null, 2));
```

Then submit the signed transaction with the API.

## Send Transaction Script

A reusable helper script is available at `scripts/send-transaction.js`.

Run the script after starting the server:

```bash
node scripts/send-transaction.js RECIPIENT_ADDRESS AMOUNT
```

The script will:

- create a new wallet
- sign a transaction
- submit it to `POST /transaction`
- mine the pending transactions
- print the wallet balance and chain length

## Notes

- `dist/` is ignored by git and contains compiled JavaScript.
- `@types/node` is installed for Node.js production compatibility.
- The wallet signs transactions using ECDSA `secp256k1` and the blockchain verifies transaction signatures before block insertion.
