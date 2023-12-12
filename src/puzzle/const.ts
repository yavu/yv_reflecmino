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

export type Mino = {
    cell: { x: number, y: number, type: string }[],
    vertex: number[],
    pos: { x: number, y: number } | undefined
};

export type PuzzleData = [
    board: string[][],
    mino_data: Mino[],
    laser: {
        start: { x: number; y: number },
        end: { x: number; y: number },
        board: string[][],
    }[]
];