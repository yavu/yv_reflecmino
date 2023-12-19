import React, { useCallback } from 'react';
import { MinoData, PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';

type InventoryMinoProp = {
    index: number,
    x: number,
    y: number,
    scale: { x: number, y: number },
    mino_data: MinoData[],
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>
};

const InventoryMino = ({ index, x, y, scale, mino_data, setPuzzleData, setDraggingMinoIndex }: InventoryMinoProp): JSX.Element => {
    const picked_mino = mino_data[index];
    const onDragStart = usePickupMino(index, setPuzzleData, setDraggingMinoIndex);
    const centered_pos = {
        x: x - (picked_mino.cell[0].x + picked_mino.cell[1].x + picked_mino.cell[2].x) * 25 * scale.x,
        y: y - (picked_mino.cell[0].y + picked_mino.cell[1].y + picked_mino.cell[2].y) * 25 * scale.y
    };
    const onDragMove = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.cancelBubble = true;
            e.target.scale({ x: 1, y: 1 });
        }, []
    );
    const onDragEnd = useDropMino(index, setPuzzleData, setDraggingMinoIndex, centered_pos, scale);
    return (
        <Group
            draggable
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
            x={centered_pos.x}
            y={centered_pos.y}
            offset={{ x: 25, y: 25 }}
            scale={scale}
            visible={picked_mino.pos === undefined}
        >
            <Line
                points={picked_mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Cell data={picked_mino.cell[0]} color={undefined} rect_visible={true} />
            <Cell data={picked_mino.cell[1]} color={undefined} rect_visible={true} />
            <Cell data={picked_mino.cell[2]} color={undefined} rect_visible={true} />
        </Group>
    );
}

export default React.memo(InventoryMino);
// export default InventoryMino;