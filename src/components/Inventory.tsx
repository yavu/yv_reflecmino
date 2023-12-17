import { Group, Rect } from "react-konva";
import React from "react";
import { KonvaEventObject } from "konva/lib/Node";

type InventoryProp = {
    on_drag_move: (e: KonvaEventObject<DragEvent>) => void,
    on_drag_end: (e: KonvaEventObject<DragEvent>) => void,
    x: number,
    children: JSX.Element
}

const Inventory = ({ on_drag_move, on_drag_end, x, children }: InventoryProp): JSX.Element => {
    return (
        <Group
            draggable
            onDragMove={on_drag_move}
            onDragEnd={on_drag_end}
            x={x}
            y={338}
            offsetX={-2}
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
            {children}
        </Group>
    );
}

export default React.memo(Inventory);
// export default Inventory;