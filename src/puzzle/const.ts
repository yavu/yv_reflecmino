type DifficultySetting = {
    minoCount: number,
    mirrorCount: number
}

// 難易度調整
// 原作はミノ４、ミラー６
// 不正な値に注意！理論上可能な組み合わせでもアルゴリズム的に厳しい場合がある
// 例（1, 8）=>エラー　（3, 9）=>待てば出る　（5, 13）=>待てば出る　（5, 15）=>無限ループ？　（8, 13）=>余裕　
// (x, 3x)に近づくと厳しくなるっぽい
export const normal_difficulty_setting: DifficultySetting = {
    minoCount: 5,
    mirrorCount: 8
};
export const hell_difficulty_setting: DifficultySetting = {
    minoCount: 8,
    mirrorCount: 10
};

export type Mode = "NormalMode" | "HellMode";

export const empty_board = [
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#"]
];

type MinoPattern = {
    protrusion: { x: number, y: number }[],
    offset: { x: number, y: number },
    vertex: number[]
}

export const mino_pattern: MinoPattern[] = [
    { protrusion: [{ x: 0, y: -2 }, { x: 0, y: -1 }], offset: { x: 0, y: 1 }, vertex: [0, -50, 50, -50, 50, 100, 0, 100] },
    { protrusion: [{ x: 0, y: -1 }, { x: 0, y: 1 }], offset: { x: 0, y: 0 }, vertex: [0, -50, 50, -50, 50, 100, 0, 100] },
    { protrusion: [{ x: 0, y: 1 }, { x: 0, y: 2 }], offset: { x: 0, y: -1 }, vertex: [0, -50, 50, -50, 50, 100, 0, 100] },
    { protrusion: [{ x: -2, y: 0 }, { x: -1, y: 0 }], offset: { x: 1, y: 0 }, vertex: [-50, 0, 100, 0, 100, 50, -50, 50] },
    { protrusion: [{ x: -1, y: 0 }, { x: 1, y: 0 }], offset: { x: 0, y: 0 }, vertex: [-50, 0, 100, 0, 100, 50, -50, 50] },
    { protrusion: [{ x: 1, y: 0 }, { x: 2, y: 0 }], offset: { x: -1, y: 0 }, vertex: [-50, 0, 100, 0, 100, 50, -50, 50] },
    { protrusion: [{ x: 0, y: -1 }, { x: -1, y: 0 }], offset: { x: 0, y: 0 }, vertex: [0, 0, 0, -50, 50, -50, 50, 50, -50, 50, -50, 0] },
    { protrusion: [{ x: 0, y: -1 }, { x: 1, y: 0 }], offset: { x: 0, y: 0 }, vertex: [0, 50, 0, -50, 50, -50, 50, 0, 100, 0, 100, 50] },
    { protrusion: [{ x: 1, y: 0 }, { x: 0, y: 1 }], offset: { x: 0, y: 0 }, vertex: [0, 100, 0, 0, 100, 0, 100, 50, 50, 50, 50, 100] },
    { protrusion: [{ x: -1, y: 0 }, { x: 0, y: 1 }], offset: { x: 0, y: 0 }, vertex: [-50, 0, 50, 0, 50, 100, 0, 100, 0, 50, -50, 50] },
    { protrusion: [{ x: -1, y: 1 }, { x: 0, y: 1 }], offset: { x: 0, y: -1 }, vertex: [0, 0, 0, -50, 50, -50, 50, 50, -50, 50, -50, 0] },
    { protrusion: [{ x: -1, y: -1 }, { x: -1, y: 0 }], offset: { x: 1, y: 0 }, vertex: [0, 50, 0, -50, 50, -50, 50, 0, 100, 0, 100, 50] },
    { protrusion: [{ x: 0, y: -1 }, { x: 1, y: -1 }], offset: { x: 0, y: 1 }, vertex: [0, 100, 0, 0, 100, 0, 100, 50, 50, 50, 50, 100] },
    { protrusion: [{ x: 1, y: 0 }, { x: 1, y: 1 }], offset: { x: -1, y: 0 }, vertex: [-50, 0, 50, 0, 50, 100, 0, 100, 0, 50, -50, 50] },
    { protrusion: [{ x: 0, y: 1 }, { x: 1, y: 1 }], offset: { x: 0, y: -1 }, vertex: [0, 50, 0, -50, 50, -50, 50, 0, 100, 0, 100, 50] },
    { protrusion: [{ x: -1, y: 0 }, { x: -1, y: 1 }], offset: { x: 1, y: 0 }, vertex: [0, 100, 0, 0, 100, 0, 100, 50, 50, 50, 50, 100] },
    { protrusion: [{ x: -1, y: -1 }, { x: 0, y: -1 }], offset: { x: 0, y: 1 }, vertex: [-50, 0, 50, 0, 50, 100, 0, 100, 0, 50, -50, 50] },
    { protrusion: [{ x: 1, y: -1 }, { x: 1, y: 0 }], offset: { x: -1, y: 0 }, vertex: [0, 0, 0, -50, 50, -50, 50, 50, -50, 50, -50, 0] },
];

export type MinoData = {
    cell: { x: number, y: number, type: string }[],
    vertex: number[],
    pos: { x: number, y: number } | undefined
};

export type LaserData = {
    start: { x: number; y: number },
    end: { x: number; y: number },
    board: string[][],
    vertex: number[]
};

export type PuzzleData = [
    board: string[][],
    mino_data: MinoData[],
    laser: LaserData[]
];

export const empty_puzzle_data: PuzzleData = [
    empty_board,
    [
        { cell: [{ x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }], vertex: [], pos: undefined },
        { cell: [{ x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }], vertex: [], pos: undefined },
        { cell: [{ x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }], vertex: [], pos: undefined },
        { cell: [{ x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }, { x: 0, y: 0, type: "￭" }], vertex: [], pos: undefined },
    ],
    [
        { start: { "x": 3, "y": 3 }, end: { "x": 3, "y": 3 }, board: empty_board, vertex: [] },
        { start: { "x": 3, "y": 3 }, end: { "x": 3, "y": 3 }, board: empty_board, vertex: [] }
    ]
];

export const decode_table: { cell: [string, { x: number, y: number, type: string }][], vertex: [string, number[]][], pos: [string, { x: number, y: number }][] } = {
    cell: [
        ["A", { "x": 0, "y": -1, "type": "￭" }],
        ["B", { "x": -1, "y": 0, "type": "￭" }],
        ["C", { "x": 0, "y": 0, "type": "￭" }],
        ["D", { "x": 1, "y": 0, "type": "￭" }],
        ["E", { "x": 0, "y": 1, "type": "￭" }],

        ["F", { "x": 0, "y": -1, "type": "/" }],
        ["G", { "x": -1, "y": 0, "type": "/" }],
        ["H", { "x": 0, "y": 0, "type": "/" }],
        ["I", { "x": 1, "y": 0, "type": "/" }],
        ["J", { "x": 0, "y": 1, "type": "/" }],

        ["K", { "x": 0, "y": -1, "type": "\\" }],
        ["L", { "x": -1, "y": 0, "type": "\\" }],
        ["M", { "x": 0, "y": 0, "type": "\\" }],
        ["N", { "x": 1, "y": 0, "type": "\\" }],
        ["O", { "x": 0, "y": 1, "type": "\\" }]
    ],
    vertex: [
        ["P", [0, -50, 50, -50, 50, 100, 0, 100]],
        ["Q", [-50, 0, 100, 0, 100, 50, -50, 50]],
        ["R", [0, 0, 0, -50, 50, -50, 50, 50, -50, 50, -50, 0]],
        ["S", [0, 50, 0, -50, 50, -50, 50, 0, 100, 0, 100, 50]],
        ["T", [0, 100, 0, 0, 100, 0, 100, 50, 50, 50, 50, 100]],
        ["U", [-50, 0, 50, 0, 50, 100, 0, 100, 0, 50, -50, 50]]
    ],
    pos: [
        ["a", { x: 1, y: 0 }],
        ["b", { x: 2, y: 0 }],
        ["c", { x: 3, y: 0 }],
        ["d", { x: 4, y: 0 }],
        ["e", { x: 5, y: 0 }],
        ["f", { x: 0, y: 1 }],
        ["g", { x: 6, y: 1 }],
        ["h", { x: 0, y: 2 }],
        ["i", { x: 6, y: 2 }],
        ["j", { x: 0, y: 3 }],
        ["k", { x: 6, y: 3 }],
        ["l", { x: 0, y: 4 }],
        ["m", { x: 6, y: 4 }],
        ["n", { x: 0, y: 5 }],
        ["o", { x: 6, y: 5 }],
        ["p", { x: 1, y: 6 }],
        ["q", { x: 2, y: 6 }],
        ["r", { x: 3, y: 6 }],
        ["s", { x: 4, y: 6 }],
        ["t", { x: 5, y: 6 }]
    ]
}
