import React, { useCallback } from 'react';
import { PuzzleData } from "../puzzle/const";
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
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    dragging_mino_index: number | undefined,
    setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
    setSolved: React.Dispatch<React.SetStateAction<boolean>>
};

const InventoryMino = ({ index, x, y, scale, puzzle_data, setPuzzleData, dragging_mino_index, setDraggingMinoIndex, setSolved }: InventoryMinoProp): JSX.Element => {
    const picked_mino = puzzle_data[1][index];
    const onDragStart = usePickupMino(index, setPuzzleData, setDraggingMinoIndex);
    const centered_pos = {
        //ここの後ろの数字は区画の中のミノの位置に関係してそう
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

    const non_activated_cells = [...puzzle_data[0]].map((y, y_index) => y.map((e, x_index) => (e !== "#" && e !== " " && puzzle_data[2][0].board[y_index][x_index] !== "￭" && puzzle_data[2][1].board[y_index][x_index] !== "￭") ? "￭" : " "));
    setSolved(
        !non_activated_cells.flat().includes("￭") &&
        puzzle_data[1].every(e => e.pos !== undefined) &&
        dragging_mino_index === undefined
    );

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
                strokeWidth={3}
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