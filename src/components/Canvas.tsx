import React, { useCallback, useState } from 'react';
import { Stage, Layer, Rect, Group, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Mino, PuzzleData, empty_board } from '../puzzle/const';
import { replace_2d_array } from '../utils/function';
import { simulate_laser } from '../puzzle/simulate_laser';

type GameCanvas = {
    width: number;
    height: number;
    puzzle_data: PuzzleData;
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>;
};
export function Canvas({ width, height, puzzle_data, setPuzzleData }: GameCanvas) {

    type CellData = {
        data: {
            x: number;
            y: number;
            type: string;
        };
        mino_pos: {
            x: number,
            y: number
        } | undefined
    };
    function Cell({ data, mino_pos }: CellData): JSX.Element {
        const rect_color = (() => {
            if (mino_pos) {
                const blue = puzzle_data[2][0].board[mino_pos.y + data.y][mino_pos.x + data.x] == "￭";
                const orange = puzzle_data[2][1].board[mino_pos.y + data.y][mino_pos.x + data.x] == "￭";
                if (blue && orange) {
                    return { fill: "#ffffff", stroke: "#dddddd" };
                }
                else if (blue) {
                    return { fill: "#14b3ff", stroke: "#0099ff" };
                }
                else if (orange) {
                    return { fill: "#fe9f56", stroke: "#ff801e" };
                }
                else {
                    return { fill: "#9ba5ad", stroke: "#828c94" };
                }
            }
            else {
                return { fill: "#9ba5ad", stroke: "#828c94" };
            }
        })();
        const rect_props: Parameters<typeof Rect>[0] = {
            width: 34,
            height: 34,
            x: 8 + 50 * data.x,
            y: 8 + 50 * data.y,
            fill: rect_color.fill,
            stroke: rect_color.stroke,
            strokeWidth: 4,
            lineJoin: "round"
        };
        switch (data.type) {
            case "/":
                return (
                    <>
                        <Rect {...rect_props} />
                        <Line
                            points={[24, 0, 0, 24]}
                            x={13 + 50 * data.x}
                            y={13 + 50 * data.y}
                            stroke={"white"}
                            strokeWidth={6}
                            lineCap={"round"} />
                    </>
                );
            case "\\":
                return (
                    <>
                        <Rect {...rect_props} />
                        <Line
                            points={[0, 0, 24, 24]}
                            x={13 + 50 * data.x}
                            y={13 + 50 * data.y}
                            stroke={"white"}
                            strokeWidth={6}
                            lineCap={"round"} />
                    </>
                );
            default:
                return (
                    <Rect {...rect_props} />
                );
        }
    };


    const HandleMinoPlace = useCallback(
        (e: KonvaEventObject<DragEvent>, offset_x: number, offset_y: number, i: number) => {
            e.cancelBubble = true;
            const pos = {
                x: Math.round((e.target.x() + offset_x + 25) / 50),
                y: Math.round((e.target.y() + offset_y + 25) / 50)
            };
            const cell_pos = [
                { x: pos.x + puzzle_data[1][i].cell[0].x, y: pos.y + puzzle_data[1][i].cell[0].y },
                { x: pos.x + puzzle_data[1][i].cell[1].x, y: pos.y + puzzle_data[1][i].cell[1].y },
                { x: pos.x + puzzle_data[1][i].cell[2].x, y: pos.y + puzzle_data[1][i].cell[2].y }
            ];
            const on_board = (
                0 < cell_pos[0].x && cell_pos[0].x < 6 && 0 < cell_pos[0].y && cell_pos[0].y < 6 &&
                0 < cell_pos[1].x && cell_pos[1].x < 6 && 0 < cell_pos[1].y && cell_pos[1].y < 6 &&
                0 < cell_pos[2].x && cell_pos[2].x < 6 && 0 < cell_pos[2].y && cell_pos[2].y < 6
            );
            function place_mino(board: string[][], i: number) {
                const place_pos: { x: number; y: number; } | undefined = puzzle_data[1][i].pos;
                if (place_pos) {
                    const place_1 = replace_2d_array(board, place_pos.x + puzzle_data[1][i].cell[0].x, place_pos.y + puzzle_data[1][i].cell[0].y, puzzle_data[1][i].cell[0].type);
                    const place_2 = replace_2d_array(place_1, place_pos.x + puzzle_data[1][i].cell[1].x, place_pos.y + puzzle_data[1][i].cell[1].y, puzzle_data[1][i].cell[1].type);
                    return replace_2d_array(place_2, place_pos.x + puzzle_data[1][i].cell[2].x, place_pos.y + puzzle_data[1][i].cell[2].y, puzzle_data[1][i].cell[2].type);
                }
                else {
                    return board;
                }
            }
            const place_0 = i !== 0
                ? place_mino(empty_board, 0)
                : empty_board;
            const place_1 = i !== 1
                ? place_mino(place_0, 1)
                : place_0;
            const place_2 = i !== 2
                ? place_mino(place_1, 2)
                : place_1;
            const place_3 = i !== 3
                ? place_mino(place_2, 3)
                : place_2;

            const placeable = on_board
                ? (
                    place_3[cell_pos[0].y][cell_pos[0].x] === " " &&
                    place_3[cell_pos[1].y][cell_pos[1].x] === " " &&
                    place_3[cell_pos[2].y][cell_pos[2].x] === " "
                )
                : false;
            const new_board = (() => {
                if (placeable) {
                    const place_1 = replace_2d_array(place_3, cell_pos[0].x, cell_pos[0].y, puzzle_data[1][i].cell[0].type);
                    const place_2 = replace_2d_array(place_1, cell_pos[1].x, cell_pos[1].y, puzzle_data[1][i].cell[1].type);
                    return replace_2d_array(place_2, cell_pos[2].x, cell_pos[2].y, puzzle_data[1][i].cell[2].type);
                }
                else {
                    return place_3;
                }
            })();
            const new_pos = placeable
                ? pos
                : undefined;
            const new_laser = [
                simulate_laser(new_board, puzzle_data[2][0].start),
                simulate_laser(new_board, puzzle_data[2][1].start)
            ]
            setPuzzleData((prev_data) => [
                new_board,
                [
                    ...prev_data[1].slice(0, i),
                    {
                        ...prev_data[1][i],
                        pos: new_pos
                    },
                    ...prev_data[1].slice(i + 1)
                ],
                [
                    {
                        ...prev_data[2][0],
                        board: new_laser[0][0]
                    },
                    {
                        ...prev_data[2][1],
                        board: new_laser[1][0]
                    }
                ]
            ]);
            console.log([...new_board].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));

            console.log(simulate_laser(new_board, puzzle_data[2][0].start)[0].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));
            console.log(simulate_laser(new_board, puzzle_data[2][1].start)[0].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));

        }, [puzzle_data, setPuzzleData]
    );

    type MinoIndex = {
        data: Mino;
        index: number;
    };
    function InventoryMino({ data, index }: MinoIndex): JSX.Element {
        return (
            <Group
                draggable
                onDragMove={(e) => { e.cancelBubble = true; }}
                onDragEnd={useCallback((e: KonvaEventObject<DragEvent>) => HandleMinoPlace(e, (width < height ? inventory_x - 33 : -33), 303, index), [index])}
                x={75 + 167.3 * index - (data.cell[0].x + data.cell[1].x + data.cell[2].x) * 19}
                y={75 - (data.cell[0].y + data.cell[1].y + data.cell[2].y) * 19}
                offset={{ x: 25, y: 25 }}
                scale={{ x: 0.75, y: 0.75 }}
                visible={data.pos ? false : true}
            >
                <Line
                    points={data.vertex}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"} />
                <Cell data={data.cell[0]} mino_pos={undefined} />
                <Cell data={data.cell[1]} mino_pos={undefined} />
                <Cell data={data.cell[2]} mino_pos={undefined} />
            </Group>
        );
    }

    function BoardMino({ data, index }: MinoIndex): JSX.Element {
        return (
            <Group
                draggable
                onDragMove={(e) => { e.cancelBubble = true; }}
                onDragEnd={useCallback((e: KonvaEventObject<DragEvent>) => HandleMinoPlace(e, 0, 0, index), [index])}
                x={((data.pos?.x ?? 0) - 1) * 50 + 25}
                y={((data.pos?.y ?? 0) - 1) * 50 + 25}
                offset={{ x: 25, y: 25 }}
                visible={data.pos ? true : false}
            >
                <Line
                    points={data.vertex}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"} />
                <Cell data={data.cell[0]} mino_pos={puzzle_data[1][index].pos} />
                <Cell data={data.cell[1]} mino_pos={puzzle_data[1][index].pos} />
                <Cell data={data.cell[2]} mino_pos={puzzle_data[1][index].pos} />
            </Group>
        );
    }

    function Board(): JSX.Element {
        return (
            <Group
                offset={{ x: -35, y: -35 }}
            >
                <Rect
                    PreventDefault={false}
                    width={316}
                    height={316}
                    x={-33}
                    y={-33}
                    fill={"#abb5bd"}
                    stroke={"white"}
                    strokeWidth={4}
                    cornerRadius={2} />
                <Group
                    offset={{ x: 50, y: 50 }}
                    clipX={19}
                    clipY={19}
                    clipWidth={312}
                    clipHeight={312}
                >
                    <StartPoint pos={puzzle_data[2][0].start} index={0} />
                    <StartPoint pos={puzzle_data[2][1].start} index={1} />
                    <EndPoint pos={puzzle_data[2][0].end} index={0} />
                    <EndPoint pos={puzzle_data[2][1].end} index={1} />
                </Group>
                <Rect
                    PreventDefault={false}
                    width={250}
                    height={250}
                    x={0}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={50}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={100}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={150}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={200}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={50}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={100}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={150}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4} />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={200}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4} />
            </Group>
        );
    }

    type ConnectionPointData = {
        pos: { x: number; y: number; };
        index: number;
    };
    function StartPoint({ pos, index }: ConnectionPointData): JSX.Element {
        const fill_color = index === 1
            ? "#fe9f56"
            : "#14b3ff";
        const stroke_color = index === 1
            ? "#ff801e"
            : "#0099ff";
        return (
            <Group
                x={pos.x * 50}
                y={pos.y * 50}
            >
                <Rect
                    PreventDefault={false}
                    width={50}
                    height={50}
                    fill={"#c2c8cc"}
                    stroke={"#586270"}
                    strokeWidth={4} />
                <Rect
                    width={34}
                    height={34}
                    x={8}
                    y={8}
                    fill={fill_color}
                    stroke={stroke_color}
                    strokeWidth={4}
                    lineJoin={"round"} />
                <Rect
                    width={18}
                    height={18}
                    x={16}
                    y={16}
                    fill={"#ffffff"} />
            </Group>
        );
    }
    function EndPoint({ pos, index }: ConnectionPointData): JSX.Element {
        const rect_color = (() => {
            const blue = puzzle_data[2][0].board[pos.y][pos.x] == "￭";
            const orange = puzzle_data[2][1].board[pos.y][pos.x] == "￭";
            if (blue && orange) {
                return { fill: "#ffffff", stroke: "#dddddd" };
            }
            else if (blue) {
                return { fill: "#14b3ff", stroke: "#0099ff" };
            }
            else if (orange) {
                return { fill: "#fe9f56", stroke: "#ff801e" };
            }
            else {
                return { fill: "#9ba5ad", stroke: "#828c94" };
            }
        })();
        return (
            <Group
                x={pos.x * 50}
                y={pos.y * 50}
            >
                <Rect
                    PreventDefault={false}
                    width={50}
                    height={50}
                    fill={"#c2c8cc"}
                    stroke={"#586270"}
                    strokeWidth={4} />
                <Rect
                    width={34}
                    height={34}
                    x={8}
                    y={8}
                    fill={rect_color.fill}
                    stroke={rect_color.stroke}
                    strokeWidth={4}
                    lineJoin={"round"} />
                <Rect
                    width={18}
                    height={18}
                    x={16}
                    y={16}
                    fill={"#ffffff"} />
            </Group>
        );
    }

    const [inventory_x, setInventoryX] = useState<number>(0);

    const HandleInventoryDragMove = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.target.y(338);
            if (width >= 656 || e.target.x() > 0) {
                e.target.x(0);
            }
            else if (e.target.x() < width - 656) {
                e.target.x(width - 656);
            }
        }, [width]
    );

    function Inventory(): JSX.Element {
        return (
            <Group
                draggable
                onDragMove={HandleInventoryDragMove}
                onDragEnd={(e) => setInventoryX(e.target.x())}
                x={width < height ? inventory_x : 0}
                y={338}
                offsetX={-2}
            >
                <Rect
                    width={150}
                    height={150}
                    x={0}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2} />
                <Rect
                    width={150}
                    height={150}
                    x={167.3}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2} />
                <Rect
                    width={150}
                    height={150}
                    x={334.6}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2} />
                <Rect
                    width={150}
                    height={150}
                    x={501.9}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2} />
                <InventoryMino data={puzzle_data[1][0]} index={0} />
                <InventoryMino data={puzzle_data[1][1]} index={1} />
                <InventoryMino data={puzzle_data[1][2]} index={2} />
                <InventoryMino data={puzzle_data[1][3]} index={3} />
            </Group>
        );
    }

    return (
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Board />
                <Inventory />
                <Group
                    offset={{ x: -35, y: -35 }}
                >
                    <BoardMino data={puzzle_data[1][0]} index={0} />
                    <BoardMino data={puzzle_data[1][1]} index={1} />
                    <BoardMino data={puzzle_data[1][2]} index={2} />
                    <BoardMino data={puzzle_data[1][3]} index={3} />
                </Group>
                <Group
                    visible={width < height ? true : false}
                    y={413}
                >
                    <Line
                        points={[
                            10, -10,
                            0, 0,
                            10, 10
                        ]}
                        x={2}
                        closed
                        fill={"#abb5bd"}
                        stroke={"#abb5bd"}
                        strokeWidth={4}
                        lineJoin={'round'}
                        opacity={0.5} />
                    <Line
                        points={[
                            0, -10,
                            10, 0,
                            0, 10
                        ]}
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
