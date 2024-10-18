import 'dotenv/config';
type InitOutput = {
    address: string;
    value: number;
    minUtxoSatoshi: number;
};
export declare function generateTos(address: string, value: number, count: number): Promise<InitOutput[]>;
export declare function getFastestFeeRate(): Promise<number>;
export {};
//# sourceMappingURL=utils.d.ts.map