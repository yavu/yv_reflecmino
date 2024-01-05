import { PuzzleData, decode_table, empty_board } from "./const";
import { simulate_laser } from "./simulate_laser";

export function decode(code: string): PuzzleData | undefined {
    const chars = code
        ? code.split("")
        : [];
    const cells = [...chars.slice(0, 3), ...chars.slice(4, 7), ...chars.slice(8, 11), ...chars.slice(12, 15)].map(e => decode_table.cell.find(([k]) => (k === e))?.[1]).filter((e): e is Exclude<typeof e, undefined> => e !== undefined);
    const vertices = [chars[3], chars[7], chars[11], chars[15]].map(e => decode_table.vertex.find(([k,]) => (k === e))?.[1]).filter((e): e is Exclude<typeof e, undefined> => e !== undefined);
    const pos = [...chars.slice(16)].map(e => decode_table.pos.find(([k,]) => (k === e))?.[1]).filter((e): e is Exclude<typeof e, undefined> => e !== undefined);

    if (cells.length === 12 && vertices.length === 4 && pos.length === 4) {
        const laser_board = [
            simulate_laser(empty_board, pos[0]),
            simulate_laser(empty_board, pos[2])
        ];

        return [
            empty_board,
            [
                {
                    cell: [
                        cells[0],
                        cells[1],
                        cells[2],
                    ],
                    pos: undefined,
                    vertex: vertices[0]
                },
                {
                    cell: [
                        cells[3],
                        cells[4],
                        cells[5],
                    ],
                    pos: undefined,
                    vertex: vertices[1]
                },
                {
                    cell: [
                        cells[6],
                        cells[7],
                        cells[8],
                    ],
                    pos: undefined,
                    vertex: vertices[2]
                },
                {
                    cell: [
                        cells[9],
                        cells[10],
                        cells[11],
                    ],
                    pos: undefined,
                    vertex: vertices[3]
                }
            ],
            [
                {
                    start: pos[0],
                    end: pos[1],
                    board: laser_board[0][0],
                    vertex: laser_board[0][4]
                },
                {
                    start: pos[2],
                    end: pos[3],
                    board: laser_board[1][0],
                    vertex: laser_board[1][4]
                }
            ]
        ]
    }
    else {
        return undefined;
    }
}