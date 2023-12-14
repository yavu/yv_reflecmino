import React, { useCallback } from 'react';
import { Laser, Mino, PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import useMinoPlace from '../hooks/useMinoPlace';

type BoardMinoProp = {
    layer: "bottom" | "top",
    mino_data: Mino[],
    index: number,
    laser_data: Laser[]
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>;
};

const BoardMino = ({ layer, mino_data, index, laser_data, setPuzzleData }: BoardMinoProp): JSX.Element => {

    const onDragEnd = useMinoPlace(
        mino_data,
        index,
        { x: 0, y: 0 },
        laser_data,
        setPuzzleData
    );
    const picked_mino = mino_data[index];

    return (
        <Group
            draggable
            onDragMove={useCallback((e: KonvaEventObject<DragEvent>) => e.cancelBubble = true, [])}
            onDragEnd={onDragEnd}
            x={((picked_mino.pos?.x ?? 0) - 1) * 50 + 25}
            y={((picked_mino.pos?.y ?? 0) - 1) * 50 + 25}
            offset={{ x: 25, y: 25 }}
            visible={picked_mino.pos ? true : false}
            opacity={layer === "bottom" ? 0 : 1}
        >
            <Line
                points={picked_mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"} />
            <Cell cell_data={picked_mino.cell[0]} mino_pos={picked_mino.pos} laser_data={laser_data} />
            <Cell cell_data={picked_mino.cell[1]} mino_pos={picked_mino.pos} laser_data={laser_data} />
            <Cell cell_data={picked_mino.cell[2]} mino_pos={picked_mino.pos} laser_data={laser_data} />
        </Group>
    );
}

export default React.memo(BoardMino);
// export default BoardMino;