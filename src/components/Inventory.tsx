import { Group, Rect } from "react-konva";
import React from "react";
import { Frame } from "./common";

type Prop = {
    x: number;
    y: number;
    slotFrames: Frame[];

};

const Inventory = ({x, y, slotFrames }: Prop): JSX.Element => {
    return (
        <Group x={x} y={y}>
            {slotFrames.map((frame, i) => (
                <Rect
                    key={i}
                    x={frame.x}
                    y={frame.y}
                    width={frame.width}
                    height={frame.height}
                    fill={"#3a414b"}
                    stroke={"#48505e"}
                    strokeWidth={4}
                    cornerRadius={2}
                />
            ))}
        </Group>
    );
    
};

export default React.memo(Inventory);
