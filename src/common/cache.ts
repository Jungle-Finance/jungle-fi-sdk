import { PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";

interface CachedResult {
    timestamp: number;
    result: any;
}

function simpleStringify(object: any[]) {
    const arr: any[] = [];
    for (const key of object) {
        const type = typeof key;

        if (type == "object"){
            if (key instanceof PublicKey || key.constructor.name == PublicKey.prototype.constructor.name){
                arr.push(key.toBase58())
            } else if (key instanceof JSBI || key.constructor.name == JSBI.prototype.constructor.name){
                arr.push(JSBI.toNumber(key));
            }
        } else if (
            type == "string" ||
            type == "number"
        ) {
            arr.push(key);
        }
    }
    return JSON.stringify(arr); // returns cleaned up JSON
}

export default class TimedCache {
    private readonly timeoutMs: number;
    private readonly cache: { [key: string]: CachedResult };

    constructor(timeoutMs: number) {
        this.timeoutMs = timeoutMs;
        this.cache = {};
    }

    public async cacheResult<T, ARGS extends any[]>(
        fn: (...args: ARGS) => Promise<T>,
        ...args: ARGS
    ): Promise<T> {
        if (this.timeoutMs <= 0) {
            return fn.apply(null, args);
        }

        const cacheKey = simpleStringify([fn.name, ...args]);
        const cachedValue = this.cache[cacheKey];
        const accessTime = Date.now();

        if (
            typeof cachedValue !== "undefined" &&
            accessTime - cachedValue.timestamp < this.timeoutMs
        ) {
            return cachedValue.result;
        }

        return (this.cache[cacheKey] = {
            timestamp: accessTime,
            result: await fn.apply(null, args)
        }).result;
    }
}
