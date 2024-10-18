"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTos = generateTos;
exports.getFastestFeeRate = getFastestFeeRate;
require("dotenv/config");
const env_1 = require("../../env");
// Generate an array of type InitOutput
async function generateTos(address, value, count) {
    const tos = Array.from({ length: count }, () => ({
        address: address,
        value: value,
        minUtxoSatoshi: value,
    }));
    return tos;
}
async function getFastestFeeRate() {
    try {
        const fees = await env_1.btcService.getBtcRecommendedFeeRates();
        console.log('Fees:', fees);
        return fees.fastestFee + 5;
    }
    catch (error) {
        console.error('Error fetching fee rates:', error);
        throw error;
    }
}
//# sourceMappingURL=utils.js.map