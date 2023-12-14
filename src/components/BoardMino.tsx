import React, { useCallback } from 'react';
import { PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import usePickupMino from '../hooks/usePickupMino';
import useDropMino from '../hooks/useDropMino';

type BoardMinoProp = {
    overlay: boolean,
    index: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    dragging_mino_index: number | undefined,
    setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>
};

const BoardMino = ({ overlay, index, puzzle_data, setPuzzleData, dragging_mino_index, setDraggingMinoIndex }: BoardMinoProp): JSX.Element => {
    const picked_mino = puzzle_data[1][index];
    const onDragStart = usePickupMino(index, setPuzzleData, setDraggingMinoIndex);
    const pos = {
        x: ((picked_mino.pos?.x ?? -100) - 1) * 50 + 25,
        y: ((picked_mino.pos?.y ?? -100) - 1) * 50 + 25
    };
    const onDragEnd = useDropMino(index, { x: 0, y: 0 }, setPuzzleData, setDraggingMinoIndex, pos);

    return (
        <Group
            draggable
            onDragStart={onDragStart}
            onDragMove={useCallback((e: KonvaEventObject<DragEvent>) => e.cancelBubble = true, [])}
            onDragEnd={onDragEnd}
            x={pos.x}
            y={pos.y}
            offset={{ x: 25, y: 25 }}
        >
            <Line
                points={picked_mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
                opacity={dragging_mino_index !== index && overlay ? 0 : 1}
            />
            <Cell cell_data={picked_mino.cell[0]} mino_pos={picked_mino.pos} laser_data={puzzle_data[2]} overlay={dragging_mino_index !== index && overlay} />
            <Cell cell_data={picked_mino.cell[1]} mino_pos={picked_mino.pos} laser_data={puzzle_data[2]} overlay={dragging_mino_index !== index && overlay} />
            <Cell cell_data={picked_mino.cell[2]} mino_pos={picked_mino.pos} laser_data={puzzle_data[2]} overlay={dragging_mino_index !== index && overlay} />
        </Group >
    );
}

export default React.memo(BoardMino);
// export default BoardMino;