import React from 'react';
import { LaserData, PuzzleData } from "../puzzle/const";
import { Group, Line } from 'react-konva';
import Cell from './Cell';

type BoardMinoProp = {
    index: number,
    puzzle_data: PuzzleData,
    dragging_mino_index: number | undefined
};

const BoardMino = ({ index, puzzle_data, dragging_mino_index }: BoardMinoProp): JSX.Element => {
    const mino = puzzle_data[1][index];
    const pos = mino.pos
        ? {
            x: (mino.pos.x - 1) * 50 + 25,
            y: (mino.pos.y - 1) * 50 + 25
        }
        : undefined;
    const get_cell_color = (pos: { x: number, y: number } | undefined, x: number, y: number, laser_data: LaserData[]) => {
        if (pos) {
            const blue = laser_data[0].board[pos.y + y][pos.x + x] === "￭";
            const orange = laser_data[1].board[pos.y + y][pos.x + x] === "￭";
            if (blue && orange) {
                return { fill: "#ffffff", stroke: "#dddddd" };
            }
            else if (blue) {
                return { fill: "#14b3ff", stroke: "#0099ff" };
            }
            else if (orange) {
                return { fill: "#fe9f56", stroke: "#ff801e" };
            }
            else {
                return { fill: "#9ba5ad", stroke: "#828c94" };
            }
        }
        else {
            return { fill: "#9ba5ad", stroke: "#828c94" };
        }
    }
    return (
        <Group
            draggable
            x={pos?.x}
            y={pos?.y}
            offset={{ x: 25, y: 25 }}
            visible={dragging_mino_index !== index && mino.pos !== undefined}
        >
            <Line
                points={mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Cell data={mino.cell[0]} color={get_cell_color(mino.pos, mino.cell[0].x, mino.cell[0].y, puzzle_data[2])} rect_visible={true} />
            <Cell data={mino.cell[1]} color={get_cell_color(mino.pos, mino.cell[1].x, mino.cell[1].y, puzzle_data[2])} rect_visible={true} />
            <Cell data={mino.cell[2]} color={get_cell_color(mino.pos, mino.cell[2].x, mino.cell[2].y, puzzle_data[2])} rect_visible={true} />
        </Group >
    );
}

export default React.memo(BoardMino);
// export default BoardMino;