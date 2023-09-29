import { compose_n } from "../utils/function";
import { Random } from "../utils/random"

export function generate(seed: number) {
    const random = new Random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, random.next_int(0, base.length + 2), "S");
    const initial = "##################";
    const flame = compose_n(2, random_insert)(initial).split("");

    const get_s = (index: number) => {
        if (index < 5) { return { x: index + 1, y: 0, move: [0, 1] }; }
        else if (index < 15) { return { x: (index + 1) % 2 * 6, y: (index - 1 - (index - 1) % 2) / 2 - 1, move: [(index % 2 === 0 ? -1 : 1), 0] }; }
        else { return { x: index - 14, y: 6, move: [0, -1] }; }
    }
    const mirror_random_count = random.next_int(3, 7);
    const laser = [
        Object.assign({ mirror: mirror_random_count }, get_s(flame.indexOf("S"))),
        Object.assign({ mirror: 6 - mirror_random_count }, get_s(flame.lastIndexOf("S"))),
    ]

    const empty_board = [
        //["#", ...flame.slice(0, 5), "#"],
        //[flame[5], " 11 ", "21 ", "31 ", "41 ", "51 ", flame[6]],
        //[flame[7], " 12 ", "22 ", "32 ", "42 ", "52 ", flame[8]],
        //[flame[9], " 13 ", "23 ", "33 ", "43 ", "53 ", flame[10]],
        //[flame[11], " 14 ", "24 ", "34 ", "44 ", "54 ", flame[12]],
        //[flame[13], " 15 ", "25 ", "35 ", "45 ", "55 ", flame[14]],
        //["#", ...flame.slice(15), "#"]
        ["#", "#", "#", "#", "#", "#", "#"],
        ["#", "A", "/", "C", "\\", "E", "#"],
        ["#", "/", "G", "H", "I", "\\", "#"],
        ["#", "K", "L", "M", "N", "O", "#"],
        ["#", "\\", "Q", "R", "S", "/", "#"],
        ["#", "U", "\\", "W", "/", "Y", "#"],
        ["#", "#", "#", "#", "#", "#", "#"]
    ];
    //console.log(empty_board);

    const random_mirror = (base: string[][]) => {
        const board = base;
        for (let i = 0; i < 2; i++) {
            let move = laser[i].move;
            let x = laser[i].x;
            let y = laser[i].y;
            for (let mirror = 1; mirror > 0; mirror--) {
                const pick = move[0] === 0
                    ? { "0": board[3][x - move[1]], "1": board.map((a) => a[x]), "2": board[3][x + move[1]] }
                    : { "0": board[y - move[0]][3], "1": board[y], "2": board[y + move[0]][3] }
                const sort = move[0] + move[1] < 0 ? [...pick[1]].reverse().map(e => e.replace(/u002F/g, "w").replace(/u005C/g, "/").replace(/w/g, "\\")) : [...pick[1]];
                const trim_forward = move[0] === 0
                    ? move[1] === 1 ? [...sort].slice(y + 1, sort.length - 1) : [...sort].slice(sort.length - y, [...sort].length - 1)
                    : move[0] === 1 ? [...sort].slice(x + 1, sort.length - 1) : [...sort].slice(sort.length - x, [...sort].length - 1)
                const trim_r_mirror = [...trim_forward].slice(0, sort.includes("/") ? sort.indexOf("/") : undefined);
                const trim_l_mirror = [...trim_r_mirror].slice(0, sort.includes("\\") ? sort.indexOf("\\") : undefined);
                const trim_deadend_mirror = ([...trim_l_mirror][trim_l_mirror.length - 1] === "/" && pick[0] === "#") || ([...trim_l_mirror][trim_l_mirror.length - 1] === "\\" && pick[2] === "#") ? [...trim_l_mirror].slice(0, trim_l_mirror.length - 1) : [...trim_l_mirror];
                const range = [...trim_deadend_mirror];
                console.log(`${x},${y}`);
                //console.log(`${pick[0]}\n${range.join()}\n${pick[2]}`);
                console.log(`${range.join()}`);
            }
        }
        return board;
    }
    const board = random_mirror(empty_board);
    console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}\n${board[3].join("")}\n${board[4].join("")}\n${board[5].join("")}\n${board[6].join("")}`);
    //console.log(laser);
    console.log("======================");
}

