import React, { useCallback } from 'react';
import { Laser, Mino, PuzzleData } from "../puzzle/const";
import { KonvaEventObject } from 'konva/lib/Node';
import { Group, Line } from 'react-konva';
import Cell from './Cell';
import useMinoPlace from '../hooks/useMinoPlace';

type InventoryMinoProp = {
    mino_data: Mino[],
    index: number,
    canvas_width: number,
    canvas_height: number,
    inventory_x: number,
    laser_data: Laser[],
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>
};

const InventoryMino = ({ mino_data, index, canvas_width, canvas_height, inventory_x, laser_data, setPuzzleData }: InventoryMinoProp): JSX.Element => {

    const onDragEnd = useMinoPlace(
        "inventory",
        mino_data,
        index,
        { x: (canvas_width < canvas_height ? inventory_x - 33 : -33), y: 303 },
        laser_data,
        setPuzzleData
    );
    const picked_mino = mino_data[index];

    return (
        <Group
            draggable
            onDragMove={useCallback((e: KonvaEventObject<DragEvent>) => e.cancelBubble = true, [])}
            onDragEnd={onDragEnd}
            x={75 + 167.3 * index - (picked_mino.cell[0].x + picked_mino.cell[1].x + picked_mino.cell[2].x) * 19}
            y={75 - (picked_mino.cell[0].y + picked_mino.cell[1].y + picked_mino.cell[2].y) * 19}
            offset={{ x: 25, y: 25 }}
            scale={{ x: 0.75, y: 0.75 }}
            visible={picked_mino.pos ? false : true}
        >
            <Line
                points={picked_mino.vertex}
                fill={"#c2c8cc"}
                closed={true}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"} />
            <Cell cell_data={picked_mino.cell[0]} mino_pos={undefined} laser_data={laser_data} />
            <Cell cell_data={picked_mino.cell[1]} mino_pos={undefined} laser_data={laser_data} />
            <Cell cell_data={picked_mino.cell[2]} mino_pos={undefined} laser_data={laser_data} />
        </Group>
    );
}

export default React.memo(InventoryMino);
// export default InventoryMino;