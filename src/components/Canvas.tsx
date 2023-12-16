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
import OverlayMino from './OverlayMino';

type CanvasProp = {
    width: number,
    height: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    // mino_dragging: boolean,
    // setMinoDragging: React.Dispatch<React.SetStateAction<boolean>>
};
const Canvas = ({ width, height, puzzle_data, setPuzzleData }: CanvasProp) => {
    const [dragging_mino_index, setDraggingMinoIndex] = useState<number | undefined>(undefined);
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
                            <InventoryMino index={0} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                            <InventoryMino index={1} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                            <InventoryMino index={2} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                            <InventoryMino index={3} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                        </>
                    }
                />
                <Group
                    offset={{ x: -35, y: -35 }}
                >
                    <BoardMino index={0} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <BoardMino index={1} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <BoardMino index={2} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <BoardMino index={3} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <Laser index={0} laser_data={puzzle_data[2]} />
                    <Laser index={1} laser_data={puzzle_data[2]} />
                    <OverlayMino index={0} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} />
                    <OverlayMino index={1} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} />
                    <OverlayMino index={2} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} />
                    <OverlayMino index={3} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} />
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
