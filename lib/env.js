"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.btcDataSource = exports.btcService = exports.btcAccount = exports.btcKeyPair = exports.BTC_SERVICE_ORIGIN = exports.BTC_SERVICE_TOKEN = exports.BTC_SERVICE_URL = exports.BTC_PRIVATE_KEY = exports.isMainnet = void 0;
const btc_1 = require("@rgbpp-sdk/btc");
const service_1 = require("@rgbpp-sdk/service");
const dotenv_1 = __importDefault(require("dotenv"));
const btc_account_1 = require("./src/shared/btc-account");
dotenv_1.default.config({ path: __dirname + '/.env' });
exports.isMainnet = false;
exports.BTC_PRIVATE_KEY = process.env.VITE_BTC_PRIVATE_KEY;
exports.BTC_SERVICE_URL = process.env.VITE_SERVICE_URL;
exports.BTC_SERVICE_TOKEN = process.env.VITE_SERVICE_TOKEN;
exports.BTC_SERVICE_ORIGIN = process.env.VITE_SERVICE_ORIGIN;
console.log("111");
console.log(__dirname);
console.log(exports.BTC_PRIVATE_KEY);
const network = exports.isMainnet ? btc_1.bitcoin.networks.bitcoin : btc_1.bitcoin.networks.testnet;
exports.btcKeyPair = btc_1.ECPair.fromPrivateKey(Buffer.from(exports.BTC_PRIVATE_KEY, 'hex'), { network });
// Read more about the available address types:
// - P2WPKH: https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#p2wpkh
// - P2TR: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki
const addressType = btc_1.AddressType.P2WPKH;
const networkType = exports.isMainnet ? btc_1.NetworkType.MAINNET : btc_1.NetworkType.TESTNET;
exports.btcAccount = (0, btc_account_1.createBtcAccount)(exports.BTC_PRIVATE_KEY, addressType, networkType);
exports.btcService = service_1.BtcAssetsApi.fromToken(exports.BTC_SERVICE_URL, exports.BTC_SERVICE_TOKEN, exports.BTC_SERVICE_ORIGIN);
exports.btcDataSource = new btc_1.DataSource(exports.btcService, networkType);
//# sourceMappingURL=env.js.map