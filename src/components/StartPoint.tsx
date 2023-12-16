import React from "react";
import { Group, Line, Rect } from "react-konva";

type StartPointProp = {
    pos: { x: number; y: number; },
    color: { fill: string, stroke: string }
};

const StartPoint = ({ pos, color }: StartPointProp): JSX.Element => {
    const laser_vertex = (() => {
        if (pos.x === 0) { return [0, 0, 25, 0]; }
        else if (pos.x === 6) { return [0, 0, -25, 0]; }
        else if (pos.y === 0) { return [0, 0, 0, 25]; }
        else { return [0, 0, 0, -25]; }
    })();

    return (
        <Group
            x={pos.x * 50}
            y={pos.y * 50}
        >
            <Rect
                PreventDefault={false}
                width={50}
                height={50}
                fill={"#c2c8cc"}
                stroke={"#586270"}
                strokeWidth={4}
            />
            <Line
                points={laser_vertex}
                stroke={color.stroke}
                x={25}
                y={25}
                strokeWidth={8}
                lineJoin={"bevel"}
            />
            <Rect
                width={34}
                height={34}
                x={8}
                y={8}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Rect
                width={18}
                height={18}
                x={16}
                y={16}
                fill={"#ffffff"}
            />
            <Line
                points={laser_vertex}
                stroke={"#ffffff"}
                x={25}
                y={25}
                strokeWidth={3}
                lineJoin={"round"}
            />
        </Group>
    );
}

export default React.memo(StartPoint);
// export default StartPoint;