import React, { useCallback } from 'react';
import { PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';
import { Portal } from 'react-konva-utils';

type OverlayMinoProp = {
    index: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    dragging_mino_index: number | undefined,
    setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>
};

const OverlayMino = ({ index, puzzle_data, setPuzzleData, dragging_mino_index, setDraggingMinoIndex }: OverlayMinoProp): JSX.Element => {
    const picked_mino = puzzle_data[1][index];
    const onDragStart = usePickupMino(index, setPuzzleData, setDraggingMinoIndex);
    const pos = picked_mino.pos
        ? {
            x: (picked_mino.pos.x - 1) * 50 + 25,
            y: (picked_mino.pos.y - 1) * 50 + 25
        }
        : undefined;
    const onDragMove = useCallback((e: KonvaEventObject<DragEvent>) => e.cancelBubble = true, []);
    const onDragEnd = useDropMino(index, setPuzzleData, setDraggingMinoIndex, pos, undefined);

    return (
        <Portal
            selector={".board_picked"}
            enabled={dragging_mino_index === index}
        >
            <Group
                draggable
                onDragStart={onDragStart}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                x={pos?.x}
                y={pos?.y}
                offset={{ x: 25, y: 25 }}
                visible={picked_mino.pos !== undefined}
            >
                <Line
                    points={picked_mino.vertex}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"}
                    opacity={dragging_mino_index === index ? 1 : 0}
                />
                <Cell data={picked_mino.cell[0]} color={undefined} rect_visible={dragging_mino_index === index} />
                <Cell data={picked_mino.cell[1]} color={undefined} rect_visible={dragging_mino_index === index} />
                <Cell data={picked_mino.cell[2]} color={undefined} rect_visible={dragging_mino_index === index} />
            </Group >
        </Portal>
    );
}

export default React.memo(OverlayMino);
// export default BoardMino;