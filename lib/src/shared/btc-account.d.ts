import { AddressType, NetworkType, bitcoin } from '@rgbpp-sdk/btc';
export interface BtcAccount {
    from: string;
    fromPubkey?: string;
    keyPair: bitcoin.Signer;
    payment: bitcoin.Payment;
    addressType: AddressType;
    networkType: NetworkType;
}
export declare function createBtcAccount(privateKey: string, addressType: AddressType, networkType: NetworkType): BtcAccount;
//# sourceMappingURL=btc-account.d.ts.map