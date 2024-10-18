"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const btc_1 = require("@rgbpp-sdk/btc");
const service_1 = require("@rgbpp-sdk/service");
const env_1 = require("../env");
const utils_1 = require("./shared/utils");
const btcAddres = 'tb1q9xlw92e2yh2at5takm5u56kj8xw8cuw96as5xc';
const amountPerUtxo = 546; // Number of satoshis per UTXO
const numOfUtxos = 5; // Generate 5 UTXOs
const prepareUtxo = async () => {
    const tos = await (0, utils_1.generateTos)(btcAddres, amountPerUtxo, numOfUtxos);
    const feeRate = await (0, utils_1.getFastestFeeRate)();
    console.log('feeRate = ', feeRate);
    // Send BTC tx
    const psbt = await (0, btc_1.sendBtc)({
        from: env_1.btcAccount.from,
        tos: tos,
        feeRate: feeRate,
        source: env_1.btcDataSource,
    });
    // Sign & finalize inputs
    psbt.signAllInputs(env_1.btcKeyPair);
    psbt.finalizeAllInputs();
    // Broadcast transaction
    const tx = psbt.extractTransaction();
    console.log(tx.toHex());
    const { txid: btcTxId } = await env_1.btcService.sendBtcTransaction(tx.toHex());
    console.log(`explorer: https://mempool.space/testnet/tx/${btcTxId}`);
    const interval = setInterval(async () => {
        try {
            console.log('Waiting for BTC tx to be confirmed');
            const tx = await env_1.btcService.getBtcTransaction(btcTxId);
            if (tx.status.confirmed) {
                clearInterval(interval);
                console.info(`Utxo is confirmed ${btcTxId}:0`);
            }
        }
        catch (error) {
            if (!(error instanceof service_1.BtcAssetsApiError)) {
                console.error(error);
            }
        }
    }, 20 * 1000);
};
// Call prepareUtxo function
prepareUtxo().catch(console.error);
//# sourceMappingURL=prepare-utxo.js.map