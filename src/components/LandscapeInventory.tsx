import { Group, Rect } from "react-konva";
import React from "react";

type Prop = {
    x: number,
    y: number,
    visible: boolean
}

const LandscapeInventory = ({ x, y, visible }: Prop): JSX.Element => {
    return (
        <Group
            x={x}
            y={y}
            visible={visible}
        >
            <Rect
                width={150}
                height={150}
                x={0}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                width={150}
                height={150}
                x={167.3}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                width={150}
                height={150}
                x={334.6}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                width={150}
                height={150}
                x={501.9}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
        </Group>
    );
}

export default React.memo(LandscapeInventory);