import { Group, Rect } from "react-konva";
import { Laser } from "../puzzle/const";
import React from "react";

type EndPointProp = {
    pos: { x: number; y: number; },
    laser_data: Laser[]
};

const EndPoint = ({ pos, laser_data }: EndPointProp): JSX.Element => {
    const rect_color = (() => {
        const blue = laser_data[0].board[pos.y][pos.x] === "￭";
        const orange = laser_data[1].board[pos.y][pos.x] === "￭";
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
                strokeWidth={4} />
            <Rect
                width={34}
                height={34}
                x={8}
                y={8}
                {...rect_color}
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

export default React.memo(EndPoint);
// export default EndPoint;