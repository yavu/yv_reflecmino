import React from "react";
import { Group, Rect } from "react-konva";

type StartPointProp = {
    pos: { x: number; y: number; },
    color: { fill: string, stroke: string }
};

const StartPoint = ({ pos, color }: StartPointProp): JSX.Element => {
    // const fill_color = index === 1
    //     ? "#fe9f56"
    //     : "#14b3ff";
    // const stroke_color = index === 1
    //     ? "#ff801e"
    //     : "#0099ff";
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
                strokeWidth={4} />
            <Rect
                width={34}
                height={34}
                x={8}
                y={8}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth={4}
                lineJoin={"round"} />
            <Rect
                width={18}
                height={18}
                x={16}
                y={16}
                fill={"#ffffff"} />
        </Group>
    );
}

export default React.memo(StartPoint);