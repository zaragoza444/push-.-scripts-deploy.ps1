const { ShivaWallet, createTransaction } = require('../shiva-wallet/dist/wallet');

const API_URL = process.env.API_URL || 'http://localhost:3000';
const recipientAddress = process.argv[2] || 'receiver-address-000000000000000000000000000000000000';
const amount = Number(process.argv[3] || 10);

const wallet = new ShivaWallet();
const transaction = createTransaction(recipientAddress, amount, wallet);

console.log('Using wallet address:', wallet.getAddress());
console.log('Recipient address:', recipientAddress);
console.log('Amount:', amount);
console.log('Signed transaction payload:');
console.log(JSON.stringify(transaction, null, 2));

async function postJson(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  return { status: response.status, result };
}

async function main() {
  console.log(`\nSubmitting transaction to ${API_URL}/transaction`);
  const txResponse = await postJson('/transaction', transaction);
  console.log('Transaction response:', txResponse.status, txResponse.result);

  console.log(`\nMining pending transactions at ${API_URL}/mine`);
  const mineResponse = await postJson('/mine', { minerAddress: wallet.getAddress() });
  console.log('Mine response:', mineResponse.status, mineResponse.result);

  console.log(`\nChecking balance for ${wallet.getAddress()}`);
  const balanceResponse = await fetch(`${API_URL}/balance/${wallet.getAddress()}`);
  console.log('Balance response:', balanceResponse.status, await balanceResponse.json());

  console.log(`\nFetching chain from ${API_URL}/chain`);
  const chainResponse = await fetch(`${API_URL}/chain`);
  const chainData = await chainResponse.json();
  console.log('Chain length:', chainData.chain.length);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
