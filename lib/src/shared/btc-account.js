"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBtcAccount = createBtcAccount;
const btc_1 = require("@rgbpp-sdk/btc");
const btc_2 = require("@rgbpp-sdk/btc");
function createBtcAccount(privateKey, addressType, networkType) {
    const network = (0, btc_1.networkTypeToNetwork)(networkType);
    const key = Buffer.from((0, btc_1.remove0x)(privateKey), 'hex');
    const keyPair = btc_2.ECPair.fromPrivateKey(key, { network });
    if (addressType === btc_2.AddressType.P2WPKH) {
        const p2wpkh = btc_2.bitcoin.payments.p2wpkh({
            pubkey: keyPair.publicKey,
            network,
        });
        return {
            from: p2wpkh.address,
            payment: p2wpkh,
            keyPair,
            addressType,
            networkType,
        };
    }
    else if (addressType === btc_2.AddressType.P2TR) {
        const p2tr = btc_2.bitcoin.payments.p2tr({
            internalPubkey: (0, btc_1.toXOnly)(keyPair.publicKey),
            network,
        });
        return {
            from: p2tr.address,
            fromPubkey: keyPair.publicKey.toString('hex'),
            payment: p2tr,
            keyPair,
            addressType,
            networkType,
        };
    }
    else {
        throw new Error('Unsupported address type, only support P2WPKH and P2TR');
    }
}
//# sourceMappingURL=btc-account.js.map