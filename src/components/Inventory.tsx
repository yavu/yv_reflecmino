import { Group, Rect } from "react-konva";
import useInventoryDrag from "../hooks/useInventoryDrag";
import InventoryMino from "./InventoryMino";
import { Laser, Mino, PuzzleData } from "../puzzle/const";
import React, { useCallback, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";

type InventoryProp = {
    mino_data: Mino[],
    laser_data: Laser[],
    canvas_width: number,
    canvas_height: number,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>
}


const Inventory = ({ mino_data, laser_data, canvas_width, canvas_height, setPuzzleData }: InventoryProp): JSX.Element => {
    const [inventory_x, setInventoryX] = useState<number>(0);
    const onDragEnd = useInventoryDrag(canvas_width);
    return (
        <Group
            draggable
            onDragMove={onDragEnd}
            onDragEnd={useCallback((e: KonvaEventObject<DragEvent>) => setInventoryX(e.target.x()), [])}
            x={canvas_width < canvas_height ? inventory_x : 0}
            y={338}
            offsetX={-2}
        >
            <Rect
                width={150}
                height={150}
                x={0}
                y={0}
                fill={"#48505e"}
                stroke={"#414958"}
                strokeWidth={4}
                cornerRadius={2} />
            <Rect
                width={150}
                height={150}
                x={167.3}
                y={0}
                fill={"#48505e"}
                stroke={"#414958"}
                strokeWidth={4}
                cornerRadius={2} />
            <Rect
                width={150}
                height={150}
                x={334.6}
                y={0}
                fill={"#48505e"}
                stroke={"#414958"}
                strokeWidth={4}
                cornerRadius={2} />
            <Rect
                width={150}
                height={150}
                x={501.9}
                y={0}
                fill={"#48505e"}
                stroke={"#414958"}
                strokeWidth={4}
                cornerRadius={2} />
            <InventoryMino mino_data={mino_data[0]} index={0} canvas_width={canvas_width} canvas_height={canvas_height} inventory_x={inventory_x} laser_data={laser_data} setPuzzleData={setPuzzleData} />
            <InventoryMino mino_data={mino_data[1]} index={1} canvas_width={canvas_width} canvas_height={canvas_height} inventory_x={inventory_x} laser_data={laser_data} setPuzzleData={setPuzzleData} />
            <InventoryMino mino_data={mino_data[2]} index={2} canvas_width={canvas_width} canvas_height={canvas_height} inventory_x={inventory_x} laser_data={laser_data} setPuzzleData={setPuzzleData} />
            <InventoryMino mino_data={mino_data[3]} index={3} canvas_width={canvas_width} canvas_height={canvas_height} inventory_x={inventory_x} laser_data={laser_data} setPuzzleData={setPuzzleData} />
        </Group>
    );
}

export default React.memo(Inventory);