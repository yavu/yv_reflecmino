import React, { useCallback, useState } from 'react';
import { Stage, Layer, Group, Line } from 'react-konva';
import { PuzzleData } from '../puzzle/const';
import Laser from './Laser';
import BoardMino from './BoardMino';
import Board from './Board';
import Inventory from './Inventory';
import InventoryMino from './InventoryMino';
import useInventoryDrag from '../hooks/useInventoryDrag';
import { KonvaEventObject } from 'konva/lib/Node';

type CanvasProp = {
    width: number;
    height: number;
    puzzle_data: PuzzleData;
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>;
};
const Canvas = ({ width, height, puzzle_data, setPuzzleData }: CanvasProp) => {
    const [inventory_x, setInventoryX] = useState<number>(0);
    return (
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Board laser_data={puzzle_data[2]} />
                <Inventory
                    on_drag_move={useInventoryDrag(width)}
                    on_drag_end={useCallback((e: KonvaEventObject<DragEvent>) => setInventoryX(e.target.x()), [setInventoryX])}
                    x={width < height ? inventory_x : 0}
                    children={
                        <>
                            <InventoryMino mino_data={puzzle_data[1]} index={0} canvas_width={width} canvas_height={height} inventory_x={inventory_x} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                            <InventoryMino mino_data={puzzle_data[1]} index={1} canvas_width={width} canvas_height={height} inventory_x={inventory_x} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                            <InventoryMino mino_data={puzzle_data[1]} index={2} canvas_width={width} canvas_height={height} inventory_x={inventory_x} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                            <InventoryMino mino_data={puzzle_data[1]} index={3} canvas_width={width} canvas_height={height} inventory_x={inventory_x} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                        </>
                    }
                />
                <Group
                    offset={{ x: -35, y: -35 }}
                >
                    <BoardMino layer={"top"} mino_data={puzzle_data[1]} index={0} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1]} index={1} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1]} index={2} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1]} index={3} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <Laser index={0} laser_vertex={puzzle_data[2][0].vertex} />
                    <Laser index={1} laser_vertex={puzzle_data[2][1].vertex} />
                </Group>
                <Group
                    visible={width < height ? true : false}
                    y={413}
                >
                    <Line
                        points={[10, -10, 0, 0, 10, 10]}
                        x={2}
                        closed
                        fill={"#abb5bd"}
                        stroke={"#abb5bd"}
                        strokeWidth={4}
                        lineJoin={'round'}
                        opacity={0.5} />
                    <Line
                        points={[0, -10, 10, 0, 0, 10]}
                        x={308}
                        closed
                        fill={"#abb5bd"}
                        stroke={"#abb5bd"}
                        strokeWidth={4}
                        lineJoin={'round'}
                        opacity={0.5} />
                </Group>
            </Layer>
        </Stage>
    );
}


export default React.memo(Canvas);
// export default Canvas;
