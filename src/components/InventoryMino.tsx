import React, { useCallback } from 'react';
import { PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';

type InventoryMinoProp = {
    index: number,
    drop_offset: { x: number, y: number },
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    dragging_mino_index: number | undefined,
    setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>
};

const InventoryMino = ({ index, drop_offset, puzzle_data, setPuzzleData, dragging_mino_index, setDraggingMinoIndex }: InventoryMinoProp): JSX.Element => {
    const picked_mino = puzzle_data[1][index];
    const onDragStart = usePickupMino(index, setPuzzleData, setDraggingMinoIndex);
    const pos = {
        x: picked_mino.pos === undefined && dragging_mino_index !== index ? 75 + 167.3 * index - (picked_mino.cell[0].x + picked_mino.cell[1].x + picked_mino.cell[2].x) * 19 : -100,
        y: picked_mino.pos === undefined && dragging_mino_index !== index ? 75 - (picked_mino.cell[0].y + picked_mino.cell[1].y + picked_mino.cell[2].y) * 19 : -100
    };
    const onDragEnd = useDropMino(index, drop_offset, setPuzzleData, setDraggingMinoIndex, pos);
    return (
        <Group
            draggable
            onDragStart={onDragStart}
            onDragMove={useCallback((e: KonvaEventObject<DragEvent>) => e.cancelBubble = true, [])}
            onDragEnd={onDragEnd}
            x={pos.x}
            y={pos.y}
            offset={{ x: 25, y: 25 }}
            scale={{ x: 0.75, y: 0.75 }}
        >
            <Line
                points={picked_mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Cell cell_data={picked_mino.cell[0]} mino_pos={undefined} laser_data={puzzle_data[2]} overlay={false} />
            <Cell cell_data={picked_mino.cell[1]} mino_pos={undefined} laser_data={puzzle_data[2]} overlay={false} />
            <Cell cell_data={picked_mino.cell[2]} mino_pos={undefined} laser_data={puzzle_data[2]} overlay={false} />
        </Group>
    );
}

export default React.memo(InventoryMino);
// export default InventoryMino;