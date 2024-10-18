# UTXO Allocator

UTXO Allocator is a tool for batch generating and distributing UTXOs (Unspent Transaction Outputs). It allows users to create multiple UTXOs based on a specified Bitcoin address and amount, facilitating batch transactions or payments.

## Features

- **Batch UTXO Generation**: Quickly generate a specified number of UTXOs through simple configuration.
- **Customizable Address and Amount**: Easily set the receiving Bitcoin address, the amount per UTXO, and the total number of UTXOs to generate.
- **Simple Setup and Execution**: Configure with a `.env` file and run a single script to generate UTXOs.

## Installation

Install dependencies using PNPM:

```bash
pnpm install
```

## Usage

### 1. Configure the `.env` File

Create a `.env` file in the project root and add the following details:

```bash
VITE_SERVICE_URL=https://api.testnet.rgbpp.io    # URL of the service
VITE_SERVICE_TOKEN=your_service_token            # JWT token to access the service
VITE_SERVICE_ORIGIN=your_service_origin          # URL representing your token's domain
VITE_BTC_PRIVATE_KEY=your_private_key            # The private key used for signing Bitcoin transactions
```

### 2. Set the Receiving Address, Amount per UTXO, and Number of UTXOs

In the script, configure the receiving address, the amount per UTXO, and the total number of UTXOs to generate. For example:

```javascript
const btcAddress = 'tb1q9xlw92e2yh2at5takm5u56kj8xw8cuw96as5xc';  // The Bitcoin address to receive the UTXOs
const amountPerUtxo = 546;  // The amount for each UTXO, in satoshis
const numOfUtxos = 5;  // Number of UTXOs to generate
```

In this example, each UTXO will send 546 satoshis to the address `tb1q9xlw92e2yh2at5takm5u56kj8xw8cuw96as5xc`, generating 5 UTXOs in total.

### 3. Run the UTXO Distribution Script

Once everything is configured, run the following command to generate the specified number of UTXOs:

```bash
pnpm run prepare-utxo
```

This command will create and distribute UTXOs based on your configured parameters and output the results of the batch distribution.
