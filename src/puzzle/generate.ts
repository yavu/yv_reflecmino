import { compose_n } from "../utils/function";
import { Random } from "../utils/random"

export function generate(seed: number) {
    const random = new Random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (char: string) => (base: string) => insert(base, random.nextInt(0, base.length + 2), char);
    const initial = "################";
    const with_s = compose_n(2, random_insert("S"))(initial);
    const flame = compose_n(2, random_insert("E"))(with_s).split("");

    const board = [
        ["#", ...flame.slice(0, 5), "#"],
        [flame[15], ".", ".", ".", ".", ".", flame[5]],
        [flame[16], ".", ".", ".", ".", ".", flame[6]],
        [flame[17], ".", ".", ".", ".", ".", flame[7]],
        [flame[18], ".", ".", ".", ".", ".", flame[8]],
        [flame[19], ".", ".", ".", ".", ".", flame[9]],
        ["#", ...flame.slice(10, 15), "#"]
    ];

    console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}\n${board[3].join("")}\n${board[4].join("")}\n${board[5].join("")}\n${board[6].join("")}`);
}

