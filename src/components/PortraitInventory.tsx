import { Group, Rect } from "react-konva";
import React from "react";

type Prop = {
    x: number,
    y: number,
    visible: boolean
}

const PortraitInventory = ({ x, y, visible }: Prop): JSX.Element => {
    return (
        <Group
            x={x}
            y={y}
            visible={visible}
        >
            <Rect
                width={79}
                height={79}
                x={0}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                width={79}
                height={79}
                x={79}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                width={79}
                height={79}
                x={158}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                width={79}
                height={79}
                x={237}
                y={0}
                fill={"#3a414b"}
                stroke={"#48505e"}
                strokeWidth={4}
                cornerRadius={2}
            />
        </Group>
    );
}

export default React.memo(PortraitInventory);