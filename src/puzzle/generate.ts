import { compose_n, while_f, replace_2d_array } from "../utils/function";
import { random } from "../utils/random"
import { empty_board, mino_pattern } from "./const";
import { Mino, PuzzleData } from "./const";

export function generate(seed: number): PuzzleData {
    const rnd = new random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, rnd.next_int(0, base.length + 2), "S");
    const flame = compose_n(2, random_insert)("##################").split("");

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

    type DrawLaser = [board: string[][], x: number, y: number, move: Move, mirror: number];
    // ミラーを必要数置きつつレーザーを描画する関数
    const draw_random_laser = (board: string[][], laser: { mirror: number, x: number, y: number, move: Move }) => {
        const move_laser = (data: DrawLaser[]) => {
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
            const draw_laser = (data: DrawLaser) => {
                const x = data[1] + data[3][0];
                const y = data[2] + data[3][1];
                const board = replace_2d_array(data[0], x, y, "￭");
                const new_data: DrawLaser = [board, x, y, data[3], data[4]];
                return new_data;
            }
            const lined_data: DrawLaser = random_range > 0
                ? compose_n(random_range, draw_laser)(current)
                : current;
            // ミラー設置関数
            const set_mirror = (data: DrawLaser) => {
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
                const new_data: DrawLaser = [board, data[1], data[2], data[3], mirror];
                return new_data;
            }
            // 反射関数
            const reflection = (data: DrawLaser) => {
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
                const new_data: DrawLaser = [data[0], x, y, move, data[4]];
                return new_data;
            }
            // 返すデータを作成
            const new_data: DrawLaser[] = (() => {
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
                    const result: DrawLaser = (() => {
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
        const initial: [DrawLaser[], number] = [[[board, laser.x, laser.y, laser.move, laser.mirror]], 100];
        const new_data = while_f(initial, s => {
            const result = move_laser(s[0]);
            const current = result[result.length - 1];
            const return_data: [DrawLaser[], number] = [result, s[1] - 1];
            return [(current[4] > 0 || current[0][current[2]][current[1]] !== "#") && return_data[1] > 0, return_data];
        });
        // 最新のデータを返す
        return new_data[0][new_data[0].length - 1];
    }

    // レーザーを2本描画したボードと開始地点、終了地点を返す関数
    const draw_two_laser = (): [board: string[][], start: { x: number, y: number }[], end: { x: number, y: number }[]] => {
        const draw_one = (): DrawLaser => {
            const data = draw_random_laser(empty_board, laser[0]);
            if (data[1] !== laser[1].x || data[2] !== laser[1].y) {
                return data;
            }
            else {
                return draw_one();
                // レーザーの開始地点同士が繋がっていないデータが出るまで再帰
            }
        };
        const draw_1_data = draw_one();
        const draw_2_data = draw_random_laser(draw_1_data[0], laser[1]);
        const laser_cell_count = [...draw_2_data[0]].join().replace(/[^\\/￭]/g, "").length;
        if (laser_cell_count > 11) {
            const s_drawn_board = (() => {
                const draw_1 = replace_2d_array(draw_2_data[0], laser[0].x, laser[0].y, "s");
                const draw_2 = replace_2d_array(draw_1, laser[1].x, laser[1].y, "s");
                return draw_2;
            })();
            const all_drawn_board = (() => {
                const draw_1 = replace_2d_array(s_drawn_board, draw_1_data[1], draw_1_data[2], "e");
                const draw_2 = replace_2d_array(draw_1, draw_2_data[1], draw_2_data[2], "e");
                return draw_2;
            })();
            return [all_drawn_board, [{ x: laser[0].x, y: laser[0].y }, { x: laser[1].x, y: laser[1].y }], [{ x: draw_1_data[1], y: draw_1_data[2] }, { x: draw_2_data[1], y: draw_2_data[2] }]];
        }
        else {
            return draw_two_laser();
            // レーザーの通過マスが12以上のデータが出るまで再帰
        }
    };

    type PlaceMino = [board: string[][], laser_cells: { x: number, y: number }[], mino_data: Mino[]]
    // レーザーが通るマスのランダムな位置にミノを1つ置く関数　置けなかった場合は引数をそのまま返す
    const place_random_mino = (data: PlaceMino): PlaceMino => {
        const board = data[0];
        const random_pos = data[1][rnd.next_int(0, data[1].length)];
        const x = random_pos.x;
        const y = random_pos.y;
        const placeable_cell = [
            [" ", " ", board[y - 2]?.[x] ?? "#", " ", " "],
            [" ", board[y - 1]?.[x - 1] ?? "#", board[y - 1]?.[x] ?? "#", board[y - 1]?.[x + 1] ?? "#", " "],
            [board[y]?.[x - 2] ?? "#", board[y]?.[x - 1] ?? "#", "x", board[y]?.[x + 1] ?? "#", board[y]?.[x + 2] ?? "#"],
            [" ", board[y + 1]?.[x - 1] ?? "#", board[y + 1]?.[x] ?? "#", board[y + 1]?.[x + 1] ?? "#", " "],
            [" ", " ", board[y + 2]?.[x] ?? "#", " ", " "]
        ].map(y => y.map(x => x.replace(/[\\/]/g, "￭")));
        // console.log([...placeable_cell].join("\n").replace(/,/g, " "));

        // 絶対もっといい方法あるけどとりあえずこれで
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

        if (placeable_mino.length > 0) {
            const random_mino_id = placeable_mino[rnd.next_int(0, placeable_mino.length)];
            const place_mino = mino_pattern[random_mino_id];
            const place_cell = [
                { x: x + place_mino.protrusion[0].x, y: y + place_mino.protrusion[0].y, },
                { x: x + place_mino.protrusion[1].x, y: y + place_mino.protrusion[1].y, }
            ]
            const place_1 = replace_2d_array(board, x, y, `${random_mino_id}`);
            const place_2 = replace_2d_array(place_1, place_cell[0].x, place_cell[0].y, `${random_mino_id}`);
            const place_3 = replace_2d_array(place_2, place_cell[1].x, place_cell[1].y, `${random_mino_id}`);
            const laser_cells = data[1].filter(e => JSON.stringify(e) !== JSON.stringify(random_pos) && JSON.stringify(e) !== JSON.stringify(place_cell[0]) && JSON.stringify(e) !== JSON.stringify(place_cell[1]));
            const mino_data: Mino[] = [
                ...data[2],
                {
                    cell: [
                        {
                            x: place_mino.offset.x,
                            y: place_mino.offset.y,
                            type: board[y][x]
                        },
                        {
                            x: place_mino.protrusion[0].x + place_mino.offset.x,
                            y: place_mino.protrusion[0].y + place_mino.offset.y,
                            type: board[y + place_mino.protrusion[0].y][x + place_mino.protrusion[0].x]
                        },
                        {
                            x: place_mino.protrusion[1].x + place_mino.offset.x,
                            y: place_mino.protrusion[1].y + place_mino.offset.y,
                            type: board[y + place_mino.protrusion[1].y][x + place_mino.protrusion[1].x]
                        }
                    ],
                    vertex: place_mino.vertex,
                    pos: undefined
                }
            ];
            return [place_3, laser_cells, mino_data];
        }
        else {
            return data;
        }
    }

    const initial: [board: string[][], mino_data: Mino[], start: { x: number, y: number }[], end: { x: number, y: number }[]] = [[[]], [], [], []];
    // ボードの二次元配列、ミノのデータ、レーザーの開始地点、終了地点を返す関数
    const puzzle_data = while_f(initial, s => {
        const laser_drawn_board = draw_two_laser();
        const laser_cells: { x: number, y: number }[] = [...laser_drawn_board[0]].map((y, y_index) => y.map((x, x_index) => x === "\\" || x === "/" || x === "￭" ? { x: x_index, y: y_index } : { x: -1, y: -1 }).filter(e => e.x !== -1)).flat();
        const place_1 = place_random_mino([laser_drawn_board[0], laser_cells, []]);
        const place_2 = place_random_mino(place_1);
        const place_3 = place_random_mino(place_2);
        const place_4 = place_random_mino(place_3);
        const return_data: [board: string[][], mino_data: Mino[], start: { x: number, y: number }[], end: { x: number, y: number }[]] = [laser_drawn_board[0], place_4[2], laser_drawn_board[1], laser_drawn_board[2]];
        return [[...place_4[0]].flat().includes("/") || [...place_4[0]].flat().includes("\\") || place_4[2].length !== 4, return_data];
    });

    console.log("==generate==");
    console.log(puzzle_data[0].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));
    // console.log(puzzle_data[1]);
    // console.log(puzzle_data[2]);
    // console.log(puzzle_data[3]);

    // console.log(puzzle_data);
    return [
        empty_board,
        puzzle_data[1],
        [
            {
                start: puzzle_data[2][0],
                end: puzzle_data[3][0],
                board: empty_board,
                vertex:[]
            },
            {
                start: puzzle_data[2][1],
                end: puzzle_data[3][1],
                board: empty_board,
                vertex:[]
            }
        ]
    ];
}

