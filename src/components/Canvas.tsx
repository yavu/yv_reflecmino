import React from 'react';
import { Stage, Layer, Group, Line } from 'react-konva';
import { PuzzleData } from '../puzzle/const';
import Laser from './Laser';
import BoardMino from './BoardMino';
import Board from './Board';
import Inventory from './Inventory';

type CanvasProp = {
    width: number;
    height: number;
    puzzle_data: PuzzleData;
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>;
};
const Canvas = ({ width, height, puzzle_data, setPuzzleData }: CanvasProp) => {

    return (
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Board laser_data={puzzle_data[2]} />
                <Inventory mino_data={puzzle_data[1]} laser_data={puzzle_data[2]} canvas_width={width} canvas_height={height} setPuzzleData={setPuzzleData} />
                <Group
                    offset={{ x: -35, y: -35 }}
                >
                    <Laser index={0} laser_vertex={puzzle_data[2][0].vertex} />
                    <Laser index={1} laser_vertex={puzzle_data[2][1].vertex} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1][0]} index={0} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1][1]} index={1} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1][2]} index={2} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
                    <BoardMino layer={"top"} mino_data={puzzle_data[1][3]} index={3} laser_data={puzzle_data[2]} setPuzzleData={setPuzzleData} />
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
