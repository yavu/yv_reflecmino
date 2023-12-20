import React, { useState } from 'react';
import { Stage, Layer, Group } from 'react-konva';
import { PuzzleData } from '../puzzle/const';
import Laser from './Laser';
import BoardMino from './BoardMino';
import Board from './Board';
import InventoryMino from './InventoryMino';
import OverlayMino from './OverlayMino';
import StartPoint from "./StartPoint";
import EndPoint from "./EndPoint";
import PortraitInventory from './PortraitInventory';
import LandscapeInventory from './LandscapeInventory';

type CanvasProp = {
    width: number,
    height: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>,
    setSolved: React.Dispatch<React.SetStateAction<boolean>>,
    timer_enabled: boolean
};
const Canvas = ({ width, height, puzzle_data, setPuzzleData, setSolved, timer_enabled }: CanvasProp) => {
    const [dragging_mino_index, setDraggingMinoIndex] = useState<number | undefined>(undefined);

    return (
        <Stage
            width={656}
            height={490.4}
        >
            <Layer
                offset={{ x: -35, y: -35 }}
            >
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
                <LandscapeInventory
                    x={-33}
                    y={303}
                    visible={width > height}
                />
                <PortraitInventory
                    x={-33}
                    y={296}
                    visible={width < height}
                />
                <Group
                    visible={timer_enabled}
                >
                    <BoardMino index={0} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <BoardMino index={1} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <BoardMino index={2} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <BoardMino index={3} puzzle_data={puzzle_data} dragging_mino_index={dragging_mino_index} />
                    <Laser index={0} laser_data={puzzle_data[2]} />
                    <Laser index={1} laser_data={puzzle_data[2]} />
                    <OverlayMino index={0} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <OverlayMino index={1} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <OverlayMino index={2} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <OverlayMino index={3} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                </Group>
                <Group
                    visible={timer_enabled && width > height}
                >
                    <InventoryMino index={0} x={42 + 0} y={378} scale={{ x: 0.8, y: 0.8 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <InventoryMino index={1} x={42 + 167.3} y={378} scale={{ x: 0.8, y: 0.8 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <InventoryMino index={2} x={42 + 334.6} y={378} scale={{ x: 0.8, y: 0.8 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <InventoryMino index={3} x={42 + 501.9} y={378} scale={{ x: 0.8, y: 0.8 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                </Group>
                <Group
                    visible={timer_enabled && width < height}
                >
                    <InventoryMino index={0} x={6.5 + 0} y={335.5} scale={{ x: 0.45, y: 0.45 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <InventoryMino index={1} x={6.5 + 79} y={335.5} scale={{ x: 0.45, y: 0.45 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <InventoryMino index={2} x={6.5 + 158} y={335.5} scale={{ x: 0.45, y: 0.45 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                    <InventoryMino index={3} x={6.5 + 237} y={335.5} scale={{ x: 0.45, y: 0.45 }} puzzle_data={puzzle_data} setPuzzleData={setPuzzleData} dragging_mino_index={dragging_mino_index} setDraggingMinoIndex={setDraggingMinoIndex} setSolved={setSolved} />
                </Group>
            </Layer>
            <Layer
                name={"board_picked"}
                offset={{ x: -35, y: -35 }}
            />
        </Stage>
    );
}


export default React.memo(Canvas);
// export default Canvas;
