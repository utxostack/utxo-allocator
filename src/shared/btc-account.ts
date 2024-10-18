import {
  networkTypeToNetwork,
  remove0x,
  toXOnly,
} from '@rgbpp-sdk/btc';
import { AddressType, NetworkType, bitcoin, ECPair } from '@rgbpp-sdk/btc';

export interface BtcAccount {
  from: string;
  fromPubkey?: string;
  keyPair: bitcoin.Signer;
  payment: bitcoin.Payment;
  addressType: AddressType;
  networkType: NetworkType;
}

export function createBtcAccount(privateKey: string, addressType: AddressType, networkType: NetworkType): BtcAccount {
  const network = networkTypeToNetwork(networkType);

  const key = Buffer.from(remove0x(privateKey), 'hex');
  const keyPair = ECPair.fromPrivateKey(key, { network });

  if (addressType === AddressType.P2WPKH) {
    const p2wpkh = bitcoin.payments.p2wpkh({
      pubkey: keyPair.publicKey,
      network,
    });
    return {
      from: p2wpkh.address!,
      payment: p2wpkh,
      keyPair,
      addressType,
      networkType,
    };
  } else if (addressType === AddressType.P2TR) {
    const p2tr = bitcoin.payments.p2tr({
      internalPubkey: toXOnly(keyPair.publicKey),
      network,
    });
    return {
      from: p2tr.address!,
      fromPubkey: keyPair.publicKey.toString('hex'),
      payment: p2tr,
      keyPair,
      addressType,
      networkType,
    };
  } else {
    throw new Error('Unsupported address type, only support P2WPKH and P2TR');
  }
}
