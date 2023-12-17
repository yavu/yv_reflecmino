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
import StartPoint from "./StartPoint";
import EndPoint from "./EndPoint";

type CanvasProp = {
    width: number,
    height: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    setComplete: React.Dispatch<React.SetStateAction<boolean>>,
    timer_enabled: boolean
};
const Canvas = ({ width, height, puzzle_data, setPuzzleData, setComplete, timer_enabled }: CanvasProp) => {
    const [dragging_mino_index, setDraggingMinoIndex] = useState<number | undefined>(undefined);
    const [inventory_x, setInventoryX] = useState<number>(0);
    const non_activated_cells = [...puzzle_data[0]].map((y, y_index) => y.map((e, x_index) => (e !== "#" && e !== " " && puzzle_data[2][0].board[y_index][x_index] !== "￭" && puzzle_data[2][1].board[y_index][x_index] !== "￭") ? "￭" : " "));
    setComplete(
        !non_activated_cells.flat().includes("￭") &&
        puzzle_data[1][0].pos !== undefined &&
        puzzle_data[1][1].pos !== undefined &&
        puzzle_data[1][2].pos !== undefined &&
        puzzle_data[1][3].pos !== undefined &&
        dragging_mino_index === undefined
    );

    return (
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Board
                    children={
                        <Group
                            visible={timer_enabled}
                        >
                            <StartPoint pos={puzzle_data[2][0].start} color={{ fill: "#14b3ff", stroke: "#0099ff" }} />
                            <StartPoint pos={puzzle_data[2][1].start} color={{ fill: "#fe9f56", stroke: "#ff801e" }} />
                            <EndPoint pos={puzzle_data[2][0].end} laser_data={puzzle_data[2]} />
                            <EndPoint pos={puzzle_data[2][1].end} laser_data={puzzle_data[2]} />
                        </Group>
                    }
                />
                <Inventory
                    on_drag_move={useInventoryDrag(width)}
                    on_drag_end={useCallback((e: KonvaEventObject<DragEvent>) => setInventoryX(e.target.x()), [setInventoryX])}
                    x={width < height ? inventory_x : 0}
                    children={
                        <Group
                            visible={timer_enabled}
                        >
                            <InventoryMino index={0} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                            <InventoryMino index={1} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                            <InventoryMino index={2} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                            <InventoryMino index={3} drop_offset={{ x: width < height ? inventory_x - 33 : -33, y: 303 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} setDraggingMinoIndex={setDraggingMinoIndex} />
                        </Group>
                    }
                />
                <Group
                    visible={timer_enabled}
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
