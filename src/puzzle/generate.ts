import { compose_n, while_f, replace_2d_array } from "../utils/function";
import { random } from "../utils/random"
import { empty_board, mino_pattern } from "./const";

export function generate(seed: number) {
    const rnd = new random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, rnd.next_int(0, base.length + 2), "S");
    const initial = "##################";
    const flame = compose_n(2, random_insert)(initial).split("");

    type Move = [0, 1] | [0, -1] | [1, 0] | [-1, 0];
    const get_s = (index: number): { x: number, y: number, move: Move } => {
        if (index < 5) { return { x: index + 1, y: 0, move: [0, 1] }; }
        else if (index < 15) { return { x: (index + 1) % 2 * 6, y: (index - 1 - (index - 1) % 2) / 2 - 1, move: [(index % 2 === 0 ? -1 : 1), 0] }; }
        else { return { x: index - 14, y: 6, move: [0, -1] }; }
    }

    const mirror_random_count = rnd.next_int(3, 7);
    const laser = [
        Object.assign({ mirror: mirror_random_count }, get_s(flame.indexOf("S"))),
        Object.assign({ mirror: 6 - mirror_random_count }, get_s(flame.lastIndexOf("S"))),
    ]



    type LaserDraw = [board: string[][], x: number, y: number, move: Move, mirror: number];
    // ミラーを必要数置きつつレーザーを描画する関数
    const draw_random_laser = (board: string[][], laser: { mirror: number, x: number, y: number, move: Move }) => {
        const move_laser = (data: LaserDraw[]) => {
            const current = data[data.length - 1];
            const board = current[0];
            const x = current[1];
            const y = current[2];
            const move = current[3];
            const mirror = current[4];
            // 進行方向の軸で取り出す
            const pick: [string, string[], string] = move[0] === 0
                ? [board[3][x - move[1]], board.map((a) => a[x]), board[3][x + move[1]]]
                : [board[y - move[0]][3], board[y], board[y + move[0]][3]];
            // ソート
            const sort = move[0] + move[1] < 0
                ? [...pick[1]].reverse().map(e => e.replace(/u002F/g, "w").replace(/u005C/g, "/").replace(/w/g, "\\"))
                : [...pick[1]];
            // 後ろをトリミング
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
            // 最初に衝突するミラーから後をトリミング
            const trim_mirror = (() => {
                const trim_r_mirror = trim_forward.includes("/")
                    ? [...trim_forward].slice(0, trim_forward.indexOf("/") + 1)
                    : [...trim_forward];
                const trim_l_mirror = trim_forward.includes("\\")
                    ? [...trim_r_mirror].slice(0, trim_forward.indexOf("\\") + 1)
                    : [...trim_r_mirror];
                if (mirror > 0) {
                    const trim_deadend_mirror = (() => {
                        const left_is_wall = [...trim_l_mirror][trim_l_mirror.length - 1] === "/" && pick[0] === "#";
                        const right_is_wall = [...trim_l_mirror][trim_l_mirror.length - 1] === "\\" && pick[2] === "#";
                        return left_is_wall || right_is_wall
                            ? [...trim_l_mirror].slice(0, trim_l_mirror.length - 1)
                            : [...trim_l_mirror];
                    })();
                    return trim_deadend_mirror;
                }
                else {
                    return [...trim_l_mirror];
                }
            })();
            // 移動可能なマスまでの距離の配列
            const range = [...trim_mirror].map((e, index) => e !== "￭" ? index : -1).filter(e => e !== -1);
            // その中からランダムに決める   ミラーを置く必要がないなら最長を選ぶ
            const random_range = mirror > 0
                ? range[rnd.next_int(0, range.length)]
                : range[range.length - 1];
            // 1マス進んでboardに書き込む
            const draw_laser = (data: LaserDraw) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const board = replace_2d_array(data[0], x, y, "￭");
                const new_data: LaserDraw = [board, x, y, data[3], data[4]];
                return new_data;
            }
            const lined_data: LaserDraw = random_range > 0
                ? compose_n(random_range, draw_laser)(current)
                : current;
            // ミラー設置関数
            const set_mirror = (data: LaserDraw) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const random_turn = rnd.next_bool();
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
                const new_data: LaserDraw = [board, data[1], data[2], data[3], mirror];
                return new_data;
            }
            // 反射関数
            const reflection = (data: LaserDraw) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const turn_move = (direction: boolean, move: Move): Move => {
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
                        return turn_move(data[3][0] === 0, data[3])
                    }
                    else if (data[0][y][x] === "\\") {
                        return turn_move(data[3][0] !== 0, data[3])
                    }
                    else {
                        return data[3];
                    }
                })();
                const new_data: LaserDraw = [data[0], x, y, move, data[4]];
                return new_data;
            }
            // 返すデータを作成
            const new_data: LaserDraw[] = (() => {
                if (mirror > 0) {
                    const result = reflection(set_mirror(lined_data));
                    if (range.length !== 0) {
                        return structuredClone(data).concat([[...result]])
                    }
                    else {
                        // 行き止まりならUndo  初回で行き止まりならループが終了するデータを返す
                        return structuredClone(data).length > 1
                            ? [...data].slice(0, data.length - 1)
                            : [[empty_board, 0, 0, [0, 1], 0]];
                    }
                }
                else {
                    const result: LaserDraw = (() => {
                        const data = reflection(lined_data);
                        const board = data[0][y][x] === " "
                            ? replace_2d_array(data[0], data[1] - data[3][0], data[2] - data[3][1], "￭")
                            : data[0];
                        return [board, data[1], data[2], data[3], data[4]];
                    })();
                    return structuredClone(data).concat([[...result]]);
                }
            })();
            return new_data;
        }
        // レーザー必要数ミラーを接地し壁に衝突するまで処理
        const initial: LaserDraw[] = [[board, laser.x, laser.y, laser.move, laser.mirror]];
        const new_data = while_f(initial, s => {
            const result = move_laser(s);
            const current = result[result.length - 1];
            return [current[4] > 0 || current[0][current[2]][current[1]] !== "#", result];
        });
        // 最新のデータを返す
        return new_data[new_data.length - 1];
    }

    // レーザーを2本描画したボードを返す関数
    const draw_2_laser = (): string[][] => {
        const first_draw = (): LaserDraw => {
            const data = draw_random_laser(empty_board, laser[0]);
            if (data[1] !== laser[1].x || data[2] !== laser[1].y) {
                return data;
            }
            else {
                return first_draw();
                // レーザーの開始地点同士が繋がっていないデータが出るまで再帰
            }
        };
        const first_drawn_data = first_draw();
        const second_drawn_data = draw_random_laser(first_drawn_data[0], laser[1]);
        const laser_cell_count = [...second_drawn_data[0]].join().replace(/[^\\/￭]/g, "").length;
        if (laser_cell_count > 11) {
            const s_drawn_board = (() => {
                const first_drawn = replace_2d_array(second_drawn_data[0], laser[0].x, laser[0].y, "s");
                const second_drawn = replace_2d_array(first_drawn, laser[1].x, laser[1].y, "s");
                return second_drawn;
            })();
            const all_drawn_board = (() => {
                const first_drawn = replace_2d_array(s_drawn_board, first_drawn_data[1], first_drawn_data[2], "e");
                const second_drawn = replace_2d_array(first_drawn, second_drawn_data[1], second_drawn_data[2], "e");
                return second_drawn;
            })();
            return all_drawn_board;
        }
        else {
            return draw_2_laser();
            // レーザーの通過マスが12以上のデータが出るまで再帰
        }
    };
    const laser_drawn_board = draw_2_laser();
    console.log([...laser_drawn_board].join("\n").replace(/,/g, " "));
    // console.log([...laser_drawn_board].join("\n").replace(/[^\\/￭\n,]/g, "#").replace(/[,￭]/g, " ").replace(/[\\/]/g, "•"));
    const laser_cell_count = [...laser_drawn_board].join().replace(/[^\\/￭]/g, "").length;
    console.log(laser_cell_count);

    const mirror_cell: { x: number, y: number }[] = [...laser_drawn_board].map((y, y_index) => y.map((x, x_index) => x === "\\" || x === "/" ? { x: x_index, y: y_index } : { x: -1, y: -1 }).filter(e => e.x !== -1)).flat();
    console.log(JSON.stringify([...mirror_cell]));

    const place_random_mino = (data: [board: string[][], x: number, y: number]): [string[][], boolean] => {
        const x = data[1];
        const y = data[2];
        if (data[0][y][x] === "/" || data[0][y][x] === "\\") {
            const placeable_cell = [
                [" ", " ", data[0][y - 2]?.[x] ?? "#", " ", " "],
                [" ", data[0][y - 1]?.[x - 1] ?? "#", data[0][y - 1]?.[x] ?? "#", data[0][y - 1]?.[x + 1] ?? "#", " "],
                [data[0][y]?.[x - 2] ?? "#", data[0][y]?.[x - 1] ?? "#", "x", data[0][y]?.[x + 1] ?? "#", data[0][y]?.[x + 2] ?? "#"],
                [" ", data[0][y + 1]?.[x - 1] ?? "#", data[0][y + 1]?.[x] ?? "#", data[0][y + 1]?.[x + 1] ?? "#", " "],
                [" ", " ", data[0][y + 2]?.[x] ?? "#", " ", " "]
            ].map(y => y.map(x => x.replace(/[\\/]/g, "￭")));
            //console.log([...placeable_cell].join("\n").replace(/,/g, " "));

            // 絶対もっといい方法ある
            const placeable_mino = [
                placeable_cell[0][2] === "￭" && placeable_cell[1][2] === "￭" ? 0 : -1,
                placeable_cell[1][2] === "￭" && placeable_cell[3][2] === "￭" ? 1 : -1,
                placeable_cell[3][2] === "￭" && placeable_cell[4][2] === "￭" ? 2 : -1,
                placeable_cell[2][0] === "￭" && placeable_cell[2][1] === "￭" ? 3 : -1,
                placeable_cell[2][1] === "￭" && placeable_cell[2][3] === "￭" ? 4 : -1,
                placeable_cell[2][3] === "￭" && placeable_cell[2][4] === "￭" ? 5 : -1,
                placeable_cell[1][2] === "￭" && placeable_cell[2][1] === "￭" ? 6 : -1,
                placeable_cell[1][2] === "￭" && placeable_cell[2][3] === "￭" ? 7 : -1,
                placeable_cell[2][3] === "￭" && placeable_cell[3][2] === "￭" ? 8 : -1,
                placeable_cell[2][1] === "￭" && placeable_cell[3][2] === "￭" ? 9 : -1,
                placeable_cell[3][1] === "￭" && placeable_cell[3][2] === "￭" ? 10 : -1,
                placeable_cell[1][1] === "￭" && placeable_cell[2][1] === "￭" ? 11 : -1,
                placeable_cell[1][2] === "￭" && placeable_cell[1][3] === "￭" ? 12 : -1,
                placeable_cell[2][3] === "￭" && placeable_cell[3][3] === "￭" ? 13 : -1,
                placeable_cell[3][2] === "￭" && placeable_cell[3][3] === "￭" ? 14 : -1,
                placeable_cell[2][1] === "￭" && placeable_cell[3][1] === "￭" ? 15 : -1,
                placeable_cell[1][1] === "￭" && placeable_cell[1][2] === "￭" ? 16 : -1,
                placeable_cell[1][3] === "￭" && placeable_cell[2][3] === "￭" ? 17 : -1,
            ].filter(e => e !== -1);
            //console.log([...placeable_mino].join(","));
            console.log(`${x},${y}`);

            if (placeable_mino.length > 0) {
                const random = placeable_mino[rnd.next_int(0, placeable_mino.length)];
                console.log(`${random}`);
                const first_place = replace_2d_array(data[0], x, y, `${random}`);
                const second_place = replace_2d_array(first_place, x + mino_pattern[random][0].x, y + mino_pattern[random][0].y, `${random}`);
                const third_place = replace_2d_array(second_place, x + mino_pattern[random][1].x, y + mino_pattern[random][1].y, `${random}`);
                return [third_place, true];
            }
            else {
                return [data[0], false];
            }
        }
        else {
            return [data[0], false];
        }
    }

    const draw_4_mino = (): string[][] => {
        const first_place = place_random_mino([laser_drawn_board, mirror_cell[0].x, mirror_cell[0].y]);
        const second_place = place_random_mino([first_place[0], mirror_cell[1].x, mirror_cell[1].y]);
        const third_place = place_random_mino([second_place[0], mirror_cell[2].x, mirror_cell[2].y]);
        const fourth_place = place_random_mino([third_place[0], mirror_cell[3].x, mirror_cell[3].y]);
        if (first_place[1] && second_place[1] && third_place[1] && fourth_place[1]) {
            return fourth_place[0];
        }
        else {
            return draw_4_mino();
        }
    };

    console.log(draw_4_mino().map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));
    //    console.log(place_mino([laser_drawn_board, mirror_cell[0].x, mirror_cell[0].y]).join("\n").replace(/,/g, " "));
    console.log("======================");
}

