import { sendBtc } from '@rgbpp-sdk/btc';
import { BtcAssetsApiError } from '@rgbpp-sdk/service';
import { btcAccount, btcDataSource, btcKeyPair, btcService } from "../env";
import {generateTos, getFastestFeeRate} from "./shared/utils";


const btcAddres = 'tb1q9xlw92e2yh2at5takm5u56kj8xw8cuw96as5xc';
const amountPerUtxo = 546; // Number of satoshis per UTXO
const numOfUtxos = 5; // Generate 5 UTXOs

const prepareUtxo = async () => {
    const tos = await generateTos(btcAddres, amountPerUtxo, numOfUtxos);
    const feeRate = await getFastestFeeRate();
    console.log('feeRate = ', feeRate);

    // Send BTC tx
    const psbt = await sendBtc({
        from: btcAccount.from!,
        tos: tos,
        feeRate: feeRate,
        source: btcDataSource,
    });

    // Sign & finalize inputs
    psbt.signAllInputs(btcKeyPair);
    psbt.finalizeAllInputs();

    // Broadcast transaction
    const tx = psbt.extractTransaction();
    console.log(tx.toHex());

    const { txid: btcTxId } = await btcService.sendBtcTransaction(tx.toHex());
    console.log(`explorer: https://mempool.space/testnet/tx/${btcTxId}`);

    const interval = setInterval(async () => {
        try {
            console.log('Waiting for BTC tx to be confirmed');
            const tx = await btcService.getBtcTransaction(btcTxId);
            if (tx.status.confirmed) {
                clearInterval(interval);
                console.info(`Utxo is confirmed ${btcTxId}:0`);
            }
        } catch (error) {
            if (!(error instanceof BtcAssetsApiError)) {
                console.error(error);
            }
        }
    }, 20 * 1000);
};

// Call prepareUtxo function
prepareUtxo().catch(console.error);
