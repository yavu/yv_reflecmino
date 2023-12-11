import React, { useCallback, useState } from 'react';
import { Stage, Layer, Rect, Group, Line } from 'react-konva';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { gh_dark as theme } from './theme/gh_dark';
import { generate } from './puzzle/generate';
import { KonvaEventObject } from 'konva/lib/Node';
import Measure from 'react-measure'
import { Mino, PuzzleData, empty_board } from './puzzle/const';
import { replace_2d_array } from './utils/function';
import { JsxElement } from 'typescript';

export default function App(): JSX.Element {

    const [seed, setSeed] = useState<number>(0);
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(Number(event.target.value));
    };
    const puzzle_initial: PuzzleData = [
        empty_board,
        [
            { "cell": [{ "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }], "vertex": [], pos: undefined },
            { "cell": [{ "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }], "vertex": [], pos: undefined },
            { "cell": [{ "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }], "vertex": [], pos: undefined },
            { "cell": [{ "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }, { "x": 0, "y": 0, "type": "￭" }], "vertex": [], pos: undefined },
        ],
        [{ "x": 0, "y": 0 }, { "x": 0, "y": 0 }],
        [{ "x": 0, "y": 0 }, { "x": 0, "y": 0 }]
    ];
    const [puzzle_data, setPuzzleData] = useState<PuzzleData>(puzzle_initial);

    const [size, setSize] = useState<{ x: number, y: number }>({ x: 100, y: 100 });

    const onResize = useCallback(
        ({ bounds }: { bounds?: { width?: number, height?: number } }) =>
            setSize({
                x: bounds?.width ?? 0, y: (bounds?.height ?? 0)
            }), []
    );

    return (
        <>
            <header>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </header>
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            margin: `${theme.spacing(1)} auto`,
                            width: theme.spacing(43),
                            "@media screen and (max-width:704px)": {
                                width: theme.spacing(22)
                            }
                        }}>
                        <Typography
                            variant="h4"
                            sx={{
                                marginLeft: theme.spacing(0.5)
                            }}
                        >
                            ReflecMino
                        </Typography>
                        <Divider
                            sx={{
                                marginTop: theme.spacing(0.5),
                                marginBottom: theme.spacing(1)
                            }}
                        />
                        < Grid
                            container
                            direction="column"
                            flex-wrap="nowrap"
                            justifyContent="flex-start"
                            alignItems="flex-end"
                            alignContent="center"
                            sx={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <Paper
                                elevation={5}
                                sx={{
                                    padding: theme.spacing(1),
                                    width: theme.spacing(43),
                                    height: theme.spacing(32.65),
                                    "@media screen and (max-width:704px)": {
                                        width: theme.spacing(22),
                                        marginLeft: 0,
                                        marginRight: 0
                                    }
                                }}
                            >
                                <Measure bounds onResize={onResize}>
                                    {({ measureRef }) => (
                                        <Box
                                            ref={measureRef}
                                            sx={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        >
                                            <Canvas
                                                width={size.x}
                                                height={size.y}
                                                puzzle_data={puzzle_data}
                                                setPuzzleData={setPuzzleData}
                                            />
                                        </Box>
                                    )}
                                </Measure>
                            </Paper>
                            <Paper
                                elevation={5}
                                sx={{
                                    padding: theme.spacing(1),
                                    marginTop: theme.spacing(1),
                                    marginRight: theme.spacing(1),
                                    position: "absolute",
                                    width: theme.spacing(20),
                                    height: theme.spacing(20),
                                    "@media screen and (max-width:704px)": {
                                        position: "static",
                                        width: theme.spacing(22),
                                        height: theme.spacing(22),
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: theme.spacing(1),
                                    }
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        marginTop: theme.spacing(2),
                                        textAlign: "center",
                                    }}
                                >
                                    2023/12/07
                                </Typography>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        marginTop: theme.spacing(2.5),
                                        textAlign: "center",
                                    }}
                                >
                                    0:00
                                </Typography>
                            </Paper>
                            {/* <Paper
                                elevation={5}
                                sx={{
                                    padding: theme.spacing(1),
                                    width: theme.spacing(43),
                                    height: theme.spacing(32.65),
                                    position: "absolute",
                                    boxShadow:"none",
                                    "@media screen and (max-width:704px)": {
                                        width: theme.spacing(22),
                                        marginLeft: 0,
                                        marginRight: 0
                                    }
                                }}
                            >
                            <Typography
                                variant="h3"
                                sx={{
                                    marginTop: theme.spacing(2.5),
                                    textAlign: "center",
                                }}
                            >
                                ReflecMino
                            </Typography>
                            </Paper> */}
                            <TextField
                                label="Seed"
                                size="small"
                                margin="dense"
                                value={seed}
                                fullWidth
                                onChange={HandleTextChange}
                            />
                            <Button
                                onClick={() => setPuzzleData(generate(seed))}
                            >
                                Run
                            </Button>
                        </Grid>
                    </Box>
                </ThemeProvider>
            </body>
        </>
    )
}

type GameCanvas = {
    width: number,
    height: number,
    puzzle_data: PuzzleData,
    setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>
};
function Canvas({ width, height, puzzle_data, setPuzzleData }: GameCanvas) {

    type CellData = {
        data: {
            x: number,
            y: number,
            type: string
        }
    };
    function Cell({ data }: CellData): JSX.Element {
        const rect_props: Parameters<typeof Rect>[0] = {
            width: 34,
            height: 34,
            x: 8 + 50 * data.x,
            y: 8 + 50 * data.y,
            fill: "#9ba5ad",
            stroke: "#828c94",
            strokeWidth: 4,
            lineJoin: "round"
        }
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
                            lineCap={"round"}
                        />
                    </>
                )
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
                            lineCap={"round"}
                        />
                    </>
                )
            default:
                return (
                    <Rect {...rect_props} />
                )
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
                const place_pos: { x: number, y: number } | undefined = puzzle_data[1][i].pos;
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
                prev_data[2],
                prev_data[3]
            ]);
            console.log([...new_board].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));
        }, [puzzle_data, setPuzzleData]
    );

    type MinoIndex = {
        data: Mino,
        index: number
    }
    function InventoryMino({ data, index }: MinoIndex): JSX.Element {
        return (
            <Group
                draggable
                onDragMove={(e) => { e.cancelBubble = true }}
                onDragEnd={useCallback((e: KonvaEventObject<DragEvent>) => HandleMinoPlace(e, (width < height ? inventory_x - 33 : - 33), 303, index), [index])}
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
                    lineJoin={"round"}
                />
                <Cell data={data.cell[0]} />
                <Cell data={data.cell[1]} />
                <Cell data={data.cell[2]} />
            </Group>
        )
    }

    function BoardMino({ data, index }: MinoIndex): JSX.Element {
        return (
            <Group
                draggable
                onDragMove={(e) => { e.cancelBubble = true }}
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
                    lineJoin={"round"}
                />
                <Cell data={data.cell[0]} />
                <Cell data={data.cell[1]} />
                <Cell data={data.cell[2]} />
            </Group>
        )
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
                    cornerRadius={2}
                />
                <Group
                    offset={{ x: 50, y: 50 }}
                    clipX={19}
                    clipY={19}
                    clipWidth={312}
                    clipHeight={312}
                >
                    <ConnectionPoint type={"start"} index={0} />
                    <ConnectionPoint type={"start"} index={1} />
                    <ConnectionPoint type={"end"} index={0} />
                    <ConnectionPoint type={"end"} index={1} />
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
                    lineJoin={"round"}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={50}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={100}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={150}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={0}
                    y={200}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={50}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={100}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={150}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={200}
                    y={0}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
            </Group>
        )
    }

    type ConnectionPointData = {
        type: string,
        index: number
    }
    function ConnectionPoint({ type, index }: ConnectionPointData): JSX.Element {
        const fill_color = (() => {
            if (type === "start") {
                return index === 1
                    ? "#fe9f56"
                    : "#14b3ff";
            }
            else {
                return "#9ba5ad";
            }
        })();
        const stroke_color = (() => {
            if (type === "start") {
                return index === 1
                    ? "#ff801e"
                    : "#0099ff";
            }
            else {
                return "#828c94";
            }
        })();
        return (
            <Group
                x={type === "start" ? puzzle_data[2][index].x * 50 : puzzle_data[3][index].x * 50}
                y={type === "start" ? puzzle_data[2][index].y * 50 : puzzle_data[3][index].y * 50}
            >
                <Rect
                    PreventDefault={false}
                    width={50}
                    height={50}
                    fill={"#c2c8cc"}
                    stroke={"#586270"}
                    strokeWidth={4}
                />
                <Rect
                    width={34}
                    height={34}
                    x={8}
                    y={8}
                    fill={fill_color}
                    stroke={stroke_color}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
                <Rect
                    width={18}
                    height={18}
                    x={16}
                    y={16}
                    fill={"#ffffff"}
                />
            </Group>
        )
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
                    cornerRadius={2}
                />
                <Rect
                    width={150}
                    height={150}
                    x={167.3}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2}
                />
                <Rect
                    width={150}
                    height={150}
                    x={334.6}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2}
                />
                <Rect
                    width={150}
                    height={150}
                    x={501.9}
                    y={0}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2}
                />
                <InventoryMino data={puzzle_data[1][0]} index={0} />
                <InventoryMino data={puzzle_data[1][1]} index={1} />
                <InventoryMino data={puzzle_data[1][2]} index={2} />
                <InventoryMino data={puzzle_data[1][3]} index={3} />
            </Group>
        )
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
                        opacity={0.5}
                    />
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
                        opacity={0.5}
                    />
                </Group>
            </Layer>
        </Stage>
    );
}