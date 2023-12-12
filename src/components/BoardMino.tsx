import React, { useCallback } from 'react';
import { Laser, Mino, PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import useMinoPlace from '../hooks/useMinoPlace';

type BoardMinoProp = {
    layer: "bottom" | "top",
    mino_data: Mino,
    index: number,
    laser_data: Laser[]
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>;
};

const BoardMino = ({ layer, mino_data, index, laser_data, setPuzzleData }: BoardMinoProp): JSX.Element => {

    const onDragEnd = useMinoPlace(
        mino_data.pos,
        mino_data.cell,
        index,
        laser_data,
        { x: 0, y: 0 },
        setPuzzleData
    );

    return (
        <Group
            draggable
            onDragMove={useCallback((e: KonvaEventObject<DragEvent>) => e.cancelBubble = true, [])}
            onDragEnd={onDragEnd}
            x={((mino_data.pos?.x ?? 0) - 1) * 50 + 25}
            y={((mino_data.pos?.y ?? 0) - 1) * 50 + 25}
            offset={{ x: 25, y: 25 }}
            visible={mino_data.pos ? true : false}
            opacity={layer === "bottom" ? 0 : 1}
        >
            <Line
                points={mino_data.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"} />
            <Cell cell_data={mino_data.cell[0]} mino_pos={mino_data.pos} laser_data={laser_data} />
            <Cell cell_data={mino_data.cell[1]} mino_pos={mino_data.pos} laser_data={laser_data} />
            <Cell cell_data={mino_data.cell[2]} mino_pos={mino_data.pos} laser_data={laser_data} />
        </Group>
    );
}

export default React.memo(BoardMino);