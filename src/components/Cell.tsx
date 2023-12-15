import React from 'react';
import { Rect, Line } from 'react-konva';

type CellProp = {
    data: { x: number; y: number; type: string; },
    color: { fill: string, stroke: string } | undefined,
    rect_visible: boolean
};
const Cell = ({ data, color, rect_visible }: CellProp): JSX.Element => {
    const rect_props: Parameters<typeof Rect>[0] = {
        width: 34,
        height: 34,
        x: 8 + 50 * data.x,
        y: 8 + 50 * data.y,
        fill: color ? color.fill : "#9ba5ad",
        stroke: color ? color.stroke : "#828c94",
        strokeWidth: 4,
        lineJoin: "round",
        visible: rect_visible
    };
    switch (data.type) {
        case "/":
            return (
                <>
                    <Rect {...rect_props} />
                    <Line
                        points={[24, 0, 0, 24]}
                        x={13 + 50 * data.x}
                        y={13 + 50 * data.y}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                </>
            );
        case "\\":
            return (
                <>
                    <Rect {...rect_props} />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={13 + 50 * data.x}
                        y={13 + 50 * data.y}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                </>
            );
        default:
            return (
                <Rect {...rect_props} />
            );
    }
};

export default React.memo(Cell);
// export default Cell;