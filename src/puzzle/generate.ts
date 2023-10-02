import { compose_n } from "../utils/function";
import { Random } from "../utils/random"

export function generate(seed: number) {
    const random = new Random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, random.next_int(0, base.length + 2), "S");
    const initial = "##################";
    const flame = compose_n(2, random_insert)(initial).split("");

    type Move = [0, 1] | [0, -1] | [1, 0] | [-1, 0];
    const get_s = (index: number): { x: number, y: number, move: Move } => {
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
        ["#", "#", "#", "#", "#", "#", "#"],
        ["#", " ", " ", " ", " ", " ", "#"],
        ["#", " ", " ", " ", " ", " ", "#"],
        ["#", " ", " ", " ", " ", " ", "#"],
        ["#", " ", " ", " ", " ", " ", "#"],
        ["#", " ", " ", " ", " ", " ", "#"],
        ["#", "#", "#", "#", "#", "#", "#"]
    ];

    const random_mirror = (base: string[][], laser: { mirror: number, x: number, y: number, move: Move }[]) => {
        for (let i = 0; i < 1; i++) {
            //let move = laser[i].move;
            //let x = laser[i].x;
            //let y = laser[i].y;
            const set_mirror = (data: [board: string[][], x: number, y: number, move: Move][]) => {
                const current = data[data.length - 1];
                const board = current[0];
                const x = current[1];
                const y = current[2];
                const move = current[3];
                console.log(`${x},${y}`);
                const pick: [string, string[], string] = move[0] === 0
                    ? [board[3][x - move[1]], board.map((a) => a[x]), board[3][x + move[1]]]
                    : [board[y - move[0]][3], board[y], board[y + move[0]][3]];
                const sort = move[0] + move[1] < 0
                    ? [...pick[1]].reverse().map(e => e.replace(/u002F/g, "w").replace(/u005C/g, "/").replace(/w/g, "\\"))
                    : [...pick[1]];
                const trim_forward = (() => {
                    if (move[0] === 0) {
                        // Y軸移動
                        if (move[1] === 1) { return [...sort].slice(y + 1, sort.length - 1); }
                        else { return [...sort].slice(sort.length - y, [...sort].length - 1); }
                    }
                    else {
                        // X軸移動
                        if (move[0] === 1) { return [...sort].slice(x + 1, sort.length - 1); }
                        else { return [...sort].slice(sort.length - x, [...sort].length - 1); }
                    }
                })();
                const trim_r_mirror = [...trim_forward].slice(0, sort.includes("/") ? sort.indexOf("/") : undefined);
                const trim_l_mirror = [...trim_r_mirror].slice(0, sort.includes("\\") ? sort.indexOf("\\") : undefined);
                const trim_deadend_mirror = (() => {
                    const left_is_wall = [...trim_l_mirror][trim_l_mirror.length - 1] === "/" && pick[0] === "#";
                    const right_is_wall = [...trim_l_mirror][trim_l_mirror.length - 1] === "\\" && pick[2] === "#";
                    return left_is_wall || right_is_wall
                        ? [...trim_l_mirror].slice(0, trim_l_mirror.length - 1)
                        : [...trim_l_mirror];
                })();
                const range = [...trim_deadend_mirror].map((e, index) => e !== "￭" ? index : -1).filter(e => e !== -1);
                console.log(range.join());

                const replace_array = <A>(base: A[], index: number, other: A) => [...base.slice(0, index), other, ...base.slice(index + 1)];

                const laser_move = (data: [board: string[][], x: number, y: number, move: Move]) => {
                    const x = data[1] + data[3][0];
                    const y = data[2] + data[3][1];
                    const y_array = replace_array([...data[0][y]], x, "￭");
                    const board = replace_array(structuredClone(data[0]), y, y_array);
                    const new_data: [board: string[][], x: number, y: number, move: Move] = [board, x, y, data[3]];
                    return new_data;
                }
                const random_range = range[random.next_int(0, range.length)];
                const line_board: [board: string[][], x: number, y: number, move: Move] = random_range > 0
                    ? compose_n(random_range, laser_move)([board, x, y, move])
                    : [board, x, y, move];

                const mirror = (data: [board: string[][], x: number, y: number, move: Move]) => {
                    const x = data[1] + data[3][0];
                    const y = data[2] + data[3][1];
                    const random_turn = random.next_bool();
                    const board = (() => {
                        if (data[0][y][x] === " ") {
                            const y_array = (() => {
                                if (random_turn) { return replace_array([...data[0][y]], x, Math.abs(data[3][0]) === 1 ? "\\" : "/"); }
                                else { return replace_array([...data[0][y]], x, Math.abs(data[3][0]) === 0 ? "\\" : "/"); }
                            })();
                            return replace_array(structuredClone(data[0]), y, y_array);
                        }
                        else {
                            return structuredClone(data[0]);
                        }
                    })();
                    const move: Move = (() => {
                        if (random_turn) {
                            switch (data[3][1]) {
                                case 0:
                                    return [0, data[3][0]];
                                case 1:
                                    return [-1, data[3][0]];
                                case -1:
                                    return [1, data[3][0]];
                            }
                        }
                        else {
                            switch (data[3][0]) {
                                case 0:
                                    return [data[3][1], 0];
                                case 1:
                                    return [data[3][1], -1];
                                case -1:
                                    return [data[3][1], 1];
                            }
                        }
                    })();
                    const new_data: [board: string[][], x: number, y: number, move: Move] = [board, x, y, move];
                    return new_data;
                }
                const mirror_board = mirror(line_board);
                console.log([...mirror_board[0]].join("\n"));
                const new_data = structuredClone(data).concat([mirror_board]);
                return new_data;
            }
            //const temp = set_mirror([[base, laser[i].x, laser[i].y, laser[i].move]]);
            //console.log(temp);
            //set_mirror(temp);
            const board = compose_n(laser[i].mirror, set_mirror)([[base, laser[i].x, laser[i].y, laser[i].move]]);
            console.log(board);
        }
    }
    random_mirror(empty_board, laser);
    console.log("======================");
}