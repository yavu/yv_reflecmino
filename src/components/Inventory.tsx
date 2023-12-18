import { Group, Rect } from "react-konva";
import React, { useCallback } from "react";
import useInventoryDrag from "../hooks/useInventoryDrag";
import { KonvaEventObject } from "konva/lib/Node";

type InventoryProp = {
    canvas_width: number,
    x: number,
    children: JSX.Element,
    setInventoryX: React.Dispatch<React.SetStateAction<number>>
}

const Inventory = ({ canvas_width, x, setInventoryX, children }: InventoryProp): JSX.Element => {
    const onDragEnd = useCallback((e: KonvaEventObject<DragEvent>) => setInventoryX(e.target.x()), [setInventoryX]);
    return (
        <Group
            draggable
            onDragMove={useInventoryDrag(canvas_width)}
            onDragEnd={onDragEnd}
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