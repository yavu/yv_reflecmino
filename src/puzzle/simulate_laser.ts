import { replace_2d_array, while_f } from "../utils/function";
import { empty_board } from "./const";

export function simulate_laser(board: string[][], start_pos: { x: number, y: number }) {
    type Move = [0, 1] | [0, -1] | [1, 0] | [-1, 0];
    type Laser = [board: string[][], x: number, y: number, move: Move, vertex: number[]];
    const move = (data: Laser): Laser => {
        const x = data[1] + data[3][0];
        const y = data[2] + data[3][1];
        const laser_board = replace_2d_array(data[0], x, y, "￭");
        const move = (() => {
            const reflection = (direction: boolean, move: Move): Move => {
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
            if (board[y][x] === "/") {
                return reflection(data[3][0] === 0, data[3])
            }
            else if (board[y][x] === "\\") {
                return reflection(data[3][0] !== 0, data[3])
            }
            else {
                return data[3];
            }
        })();
        return [laser_board, x, y, move, [...data[4], x * 50 - 25, y * 50 - 25]];
    }
    const initial: Laser = [
        empty_board,
        start_pos.x,
        start_pos.y,
        (() => {
            if (start_pos.x === 0) { return [1, 0]; }
            else if (start_pos.x === 6) { return [-1, 0]; }
            else if (start_pos.y === 0) { return [0, 1]; }
            else { return [0, -1]; }
        })(),
        [start_pos.x * 50 - 25, start_pos.y * 50 - 25]
    ];
    return while_f(initial, s => {
        const result = move(s);
        return [0 < result[1] && result[1] < 6 && 0 < result[2] && result[2] < 6, result];
    });
}