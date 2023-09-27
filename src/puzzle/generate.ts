import { compose_n } from "../utils/function";
import { Random } from "../utils/random"

export function generate(seed: number) {
    const random = new Random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, random.nextInt(0, base.length + 2), "S");
    const initial = "##################";
    const flame = compose_n(2, random_insert)(initial).split("");

    const get_s = (index: number) => {
        if (index < 5) { return { x: index + 1, y: 0, move: [0, 1] }; }
        else if (index < 10) { return { x: index - 4, y: 6, move: [0, -1] }; }
        else { return { x: index % 2 * 6, y: (index - index % 2) / 2 - 4, move: [index % 2 === 0 ? 1 : -1, 0] }; }
    }
    const mirror_random_count = random.nextInt(3, 7);
    const laser = [
        Object.assign({ mirror: mirror_random_count }, get_s(flame.indexOf("S"))),
        Object.assign({ mirror: 6 - mirror_random_count }, get_s(flame.lastIndexOf("S"))),
    ]

    const empty_board = [
        ["#", ...flame.slice(0, 5), "#"],
        [flame[10], " ", " ", " ", " ", " ", flame[11]],
        [flame[12], "/", " ", " ", " ", " ", flame[13]],
        [flame[14], " ", " ", " ", " ", " ", flame[15]],
        [flame[16], " ", "\\", " ", " ", "/", flame[17]],
        [flame[18], " ", "\\", " ", "/", " ", flame[19]],
        ["#", ...flame.slice(5, 10), "#"]
    ];

    const random_mirror = (base: string[][]) => {
        const board = base;
        for (let i = 0; i < 2; i++) {
            let move = laser[i].move;
            let x = laser[i].x + move[0];
            let y = laser[i].y + move[1];
            for (let mirror = 1; mirror > 0; mirror--) {
                const pick = [
                    move[0] === 0 ? board.map((a) => a[x - 1]) : board[y + 1],
                    move[0] === 0 ? board.map((a) => a[x]) : board[y],
                    move[0] === 0 ? board.map((a) => a[x + 1]) : board[y - 1]
                ];
                const deadend_mirror_index = [...pick[1]].map((e, index) => (e === "/" && pick[Math.abs(move[0]) * 2][index] === "#") || (e === "\\" && pick[Math.abs(move[1]) * 2][index] === "#") ? "X" : e).indexOf("X");
                const sort = move[0] + move[1] < 0 ? [...pick[1]].reverse() : [...pick[1]];
                console.log(deadend_mirror_index);
                console.log(sort);
                const mirror_index = [...sort].map(e => e.replace(/[/\\]/g, "M")).indexOf("M");
                const trim = [...sort].slice(0, mirror_index !== -1 ? mirror_index + 1 : undefined).slice(0, deadend_mirror_index !== -1 ? deadend_mirror_index : undefined);
                console.log(trim);
                const range = [...trim].map((e, index) => e === " " || e === "/" || e === "\\" ? index : "X").filter(e => e !== "X");
                console.log(range);
                for (let i = random.nextInt(1, range.length); i > 0; i--) {
                    x += move[0];
                    y += move[1];
                }
            }
        }
        return board;
    }
    const board = random_mirror(empty_board);
    console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}\n${board[3].join("")}\n${board[4].join("")}\n${board[5].join("")}\n${board[6].join("")}`);
    console.log(laser);
    console.log("======================");
}

