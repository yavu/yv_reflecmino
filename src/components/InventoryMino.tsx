import React, { useCallback } from 'react';
import { PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';
import { Portal } from 'react-konva-utils';

type InventoryMinoProp = {
    index: number,
    inventory_x: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    dragging_mino_index: number | undefined,
    setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>
};

const InventoryMino = ({ index, inventory_x, puzzle_data, setPuzzleData, dragging_mino_index, setDraggingMinoIndex }: InventoryMinoProp): JSX.Element => {
    const picked_mino = puzzle_data[1][index];
    const onDragStart = usePickupMino(index, setPuzzleData, setDraggingMinoIndex);
    const pos = {
        x: 75 + 167.3 * index - (picked_mino.cell[0].x + picked_mino.cell[1].x + picked_mino.cell[2].x) * 19,
        y: 75 - (picked_mino.cell[0].y + picked_mino.cell[1].y + picked_mino.cell[2].y) * 19
    };
    const onDragMove = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.cancelBubble = true;
            e.target.scale({ x: 1, y: 1 });
        }, []
    );
    const onDragEnd = useDropMino(index, { x: inventory_x - 33, y: 303 }, setPuzzleData, setDraggingMinoIndex, pos);
    return (
        <Portal
            selector={".inventory_picked"}
            enabled={dragging_mino_index === index}
        >
            <Group
                draggable
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                x={pos.x}
                y={pos.y}
                offset={{ x: 25, y: 25 }}
                scale={{ x: 0.75, y: 0.75 }}
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
        </Portal>
    );
}

export default React.memo(InventoryMino);
// export default InventoryMino;