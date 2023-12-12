import React from 'react';
import { Rect, Line } from 'react-konva';
import { Laser } from '../puzzle/const';

type CellProp = {
    cell_data: { x: number; y: number; type: string; },
    mino_pos: { x: number, y: number } | undefined,
    laser_data: Laser[]
};
const Cell = ({ cell_data, mino_pos, laser_data }: CellProp): JSX.Element => {
    const rect_color = (() => {
        if (mino_pos) {
            const blue = laser_data[0].board[mino_pos.y + cell_data.y][mino_pos.x + cell_data.x] === "￭";
            const orange = laser_data[1].board[mino_pos.y + cell_data.y][mino_pos.x + cell_data.x] === "￭";
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
    })();
    const rect_props: Parameters<typeof Rect>[0] = {
        width: 34,
        height: 34,
        x: 8 + 50 * cell_data.x,
        y: 8 + 50 * cell_data.y,
        fill: rect_color.fill,
        stroke: rect_color.stroke,
        strokeWidth: 4,
        lineJoin: "round"
    };
    switch (cell_data.type) {
        case "/":
            return (
                <>
                    <Rect {...rect_props} />
                    <Line
                        points={[24, 0, 0, 24]}
                        x={13 + 50 * cell_data.x}
                        y={13 + 50 * cell_data.y}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"} />
                </>
            );
        case "\\":
            return (
                <>
                    <Rect {...rect_props} />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={13 + 50 * cell_data.x}
                        y={13 + 50 * cell_data.y}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"} />
                </>
            );
        default:
            return (
                <Rect {...rect_props} />
            );
    }
};

export default React.memo(Cell);