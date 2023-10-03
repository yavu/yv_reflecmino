import { compose_n, while_f, replace_2d_array } from "../utils/function";
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

    const random_mirror = (base: string[][], laser: { mirror: number, x: number, y: number, move: Move }) => {
        type Data = [board: string[][], x: number, y: number, move: Move, mirror: number];
        const move_laser = (data: Data[]) => {
            const current = data[data.length - 1];
            const board = current[0];
            const x = current[1];
            const y = current[2];
            const move = current[3];
            const mirror = current[4];
            //console.log(`${x},${y}`);
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
            const trim_r_mirror = trim_forward.includes("/")
                ? [...trim_forward].slice(0, trim_forward.indexOf("/"))
                : [...trim_forward];
            const trim_l_mirror = trim_forward.includes("\\")
                ? [...trim_r_mirror].slice(0, trim_forward.indexOf("\\"))
                : [...trim_r_mirror];
            const trim_deadend_mirror = (() => {
                const left_is_wall = [...trim_l_mirror][trim_l_mirror.length - 1] === "/" && pick[0] === "#";
                const right_is_wall = [...trim_l_mirror][trim_l_mirror.length - 1] === "\\" && pick[2] === "#";
                return left_is_wall || right_is_wall
                    ? [...trim_l_mirror].slice(0, trim_l_mirror.length - 1)
                    : [...trim_l_mirror];
            })();
            const range = [...trim_deadend_mirror].map((e, index) => e !== "￭" ? index : -1).filter(e => e !== -1);
            console.log(range);

            const draw_laser = (data: Data) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const board = replace_2d_array(data[0], x, y, "￭");
                const new_data: Data = [board, x, y, data[3], data[4]];
                return new_data;
            }
            const random_range = mirror > 0
                ? range[random.next_int(0, range.length)]
                : range[range.length - 1];
            const lined_data: Data = random_range > 0
                ? compose_n(random_range, draw_laser)([board, x, y, move, current[4]])
                : [board, x, y, move, current[4]];

            const set_mirror = (data: Data) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const random_turn = random.next_bool();
                const mirror = data[0][y][x] === " "
                    ? data[4] - 1
                    : data[4];
                const board = (() => {
                    if (data[0][y][x] === " ") {
                        return random_turn
                            ? replace_2d_array(data[0], x, y, data[3][0] !== 0 ? "\\" : "/")
                            : replace_2d_array(data[0], x, y, data[3][0] === 0 ? "\\" : "/");
                    }
                    else {
                        return structuredClone(data[0]);
                    }
                })();
                const new_data: Data = [board, data[1], data[2], data[3], mirror];
                return new_data;
            }

            const turn = (data: Data) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const turn = (direction: boolean, move: Move): Move => {
                    if (direction) {
                        switch (move[1]) {
                            case 0: return [0, move[0]];
                            case 1: return [-1, 0];
                            case -1: return [1, 0];
                            // [a, b] => [-b, a]　右折
                        }
                    }
                    else {
                        switch (move[0]) {
                            case 0: return [move[1], 0];
                            case 1: return [0, -1];
                            case -1: return [0, 1];
                            // [a, b] => [b, -a]　左折
                        }
                    }
                };
                const move: Move = (() => {
                    if (data[0][y][x] === "/") {
                        return turn(data[3][0] === 0, data[3])
                    }
                    else if (data[0][y][x] === "\\") {
                        return turn(data[3][0] !== 0, data[3])
                    }
                    else {
                        return data[3];
                    }
                })();
                const new_data: Data = [data[0], x, y, move, data[4]];
                return new_data;
            }

            const new_data: Data[] = (() => {
                if (mirror > 0) {
                    const result = turn(set_mirror(lined_data));
                    return range.length !== 0
                        ? structuredClone(data).concat([[...result]])
                        : [...data].slice(0, data.length - 1);
                }
                else {
                    const result: Data = (() => {
                        const data = turn(lined_data);
                        const board = data[0][y][x] === " "
                            ? replace_2d_array(data[0], data[1] - data[3][0], data[2] - data[3][1], "￭")
                            : data[0];
                        return [board, data[1], data[2], data[3], data[4]];
                    })();
                    return structuredClone(data).concat([[...result]]);
                }
            })();
            //console.log([...new_data[new_data.length - 1][0]].join("\n"));
            return new_data;
        }

        const initial: Data[] = [[base, laser.x, laser.y, laser.move, laser.mirror]];
        const drawn_data = while_f(initial, s => {
            const result = move_laser(s);
            const current = result[result.length - 1];
            return [current[4] > 0 || current[0][current[2]][current[1]] !== "#", result];
        });
        //console.log(drawn_data);
        return drawn_data[drawn_data.length - 1]
    }
    const first_drawn_data = random_mirror(empty_board, laser[0]);
    const second_drawn_data = random_mirror(first_drawn_data[0], laser[1]);
    const s_drawn_board = (() => {
        const board = second_drawn_data[0];
        const first_drawn = replace_2d_array(board,laser[0].x,laser[0].y,"s");
        return replace_2d_array(first_drawn,laser[1].x,laser[1].y,"s");
    })();
    const e_drawn_board = (() => {
        const board = s_drawn_board;
        const first_drawn = replace_2d_array(board,first_drawn_data[1],first_drawn_data[2],"e");
        return replace_2d_array(first_drawn,second_drawn_data[1],second_drawn_data[2],"e");
    })();
    
    console.log([...e_drawn_board].join("\n"));
    console.log("======================");
}