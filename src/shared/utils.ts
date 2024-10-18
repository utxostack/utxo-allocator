import 'dotenv/config';
import {btcService} from "../../env";

type InitOutput = {
    address: string;
    value: number;
    minUtxoSatoshi: number;
};

// Generate an array of type InitOutput
export async function generateTos(address: string, value: number, count: number): Promise<InitOutput[]> {
    const tos: InitOutput[] = Array.from({ length: count }, () => ({
        address: address,
        value: value,
        minUtxoSatoshi: value,
    }));

    return tos;
}

export async function getFastestFeeRate() {
    try {
        const fees = await btcService.getBtcRecommendedFeeRates();
        console.log('Fees:', fees);
        return fees.fastestFee + 5;
    } catch (error) {
        console.error('Error fetching fee rates:', error);
        throw error;
    }
}