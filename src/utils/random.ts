// これをimmutableにするのはTypeScriptではつらいので今回は諦める
export class random {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(seed = 88675123) {
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }

    // XorShift
    next() {
        let t = this.x ^ (this.x << 11);
        this.x = this.y; this.y = this.z; this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    // min以上max以下の乱数を生成する
    next_int(min: number, max: number) {
        const r = Math.abs(this.next());
        return min + (r % (max - min));
    }

    // boolの乱数を生成する
    next_bool() {
        const r = Math.abs(this.next());
        return !!(0 + (r % (2 - 0)));
    }
}