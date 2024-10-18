import {AddressType, bitcoin, DataSource, ECPair, ECPairInterface, NetworkType} from "@rgbpp-sdk/btc";
import {BtcAssetsApi} from "@rgbpp-sdk/service";
import dotenv from 'dotenv';
import {createBtcAccount} from "./src/shared/btc-account";
dotenv.config({ path: __dirname + '/.env' });

export const isMainnet = false;

export const BTC_PRIVATE_KEY = process.env.VITE_BTC_PRIVATE_KEY!;
export const BTC_SERVICE_URL = process.env.VITE_SERVICE_URL!;
export const BTC_SERVICE_TOKEN = process.env.VITE_SERVICE_TOKEN!;
export const BTC_SERVICE_ORIGIN = process.env.VITE_SERVICE_ORIGIN!;

const network = isMainnet ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
export const btcKeyPair: ECPairInterface = ECPair.fromPrivateKey(Buffer.from(BTC_PRIVATE_KEY, 'hex'), { network });

// Read more about the available address types:
// - P2WPKH: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#p2wpkh
// - P2TR: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
const addressType = AddressType.P2WPKH;
const networkType = isMainnet ? NetworkType.MAINNET : NetworkType.TESTNET;
export const btcAccount = createBtcAccount(BTC_PRIVATE_KEY, addressType, networkType);

export const btcService = BtcAssetsApi.fromToken(BTC_SERVICE_URL, BTC_SERVICE_TOKEN, BTC_SERVICE_ORIGIN);
export const btcDataSource = new DataSource(btcService, networkType);
