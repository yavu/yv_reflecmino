import { compose_n } from "../utils/function";
import { Random } from "../utils/random"

export function generate(seed: number) {
    const random = new Random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, random.nextInt(0, base.length + 2), "S");
    const initial = "##################";
    const flame = compose_n(2, random_insert)(initial).split("");

    const get_s_pos = (index: number) => {
        if (index < 5) { return { x: index + 1, y: 0 }; }
        else if (index < 10) { return { x: index - 4, y: 6 }; }
        else { return { x: index % 2 * 6, y: (index - index % 2) / 2 - 4 }; }
    }
    const s_pos = [
        get_s_pos(flame.indexOf("S")),
        get_s_pos(flame.lastIndexOf("S"))
    ]

    const board = [
        ["#", ...flame.slice(0, 5), "#"],
        [flame[10], ".", ".", ".", ".", ".", flame[11]],
        [flame[12], ".", ".", ".", ".", ".", flame[13]],
        [flame[14], ".", ".", ".", ".", ".", flame[15]],
        [flame[16], ".", ".", ".", ".", ".", flame[17]],
        [flame[18], ".", ".", ".", ".", ".", flame[19]],
        ["#", ...flame.slice(5, 10), "#"]
    ];

    console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}\n${board[3].join("")}\n${board[4].join("")}\n${board[5].join("")}\n${board[6].join("")}`);
    console.log(s_pos);
}

