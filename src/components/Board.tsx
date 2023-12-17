import { Group, Line, Rect } from "react-konva";
import React from "react";



type BoardProp = {
    children: JSX.Element
}

const Board = ({ children }: BoardProp): JSX.Element => {
    return (
        <Group
            offset={{ x: -35, y: -35 }}
        >
            <Rect
                PreventDefault={false}
                width={316}
                height={316}
                x={-33}
                y={-33}
                fill={"#abb5bd"}
                stroke={"white"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Group
                offset={{ x: 50, y: 50 }}
                clipX={19}
                clipY={19}
                clipWidth={312}
                clipHeight={312}
            >
                {children}
            </Group>
            <Rect
                PreventDefault={false}
                width={250}
                height={250}
                x={0}
                y={0}
                fill={"#48505e"}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={0}
                y={50}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={0}
                y={100}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={0}
                y={150}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={0}
                y={200}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={50}
                y={0}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={100}
                y={0}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={150}
                y={0}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={200}
                y={0}
                stroke={"#414958"}
                strokeWidth={4}
            />
        </Group>
    );
}

export default React.memo(Board);
// export default Board;