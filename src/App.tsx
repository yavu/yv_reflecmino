import React, { useCallback, useRef, useState } from 'react';
import { Stage, Layer, Rect, Group, Line } from 'react-konva';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Divider, Paper, SxProps, TextField, Theme, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { gh_dark as theme } from './theme/gh_dark';
import { generate } from './puzzle/generate';
import { KonvaEventObject } from 'konva/lib/Node';
import Measure from 'react-measure'

type Mino = { cell: { x: number, y: number, type: string }[], vertex: number[] };
type PuzzleData = [board: string[][], mino_data: Mino[], start: { x: number; y: number; }[], end: { x: number; y: number; }[]];

export default function App(): JSX.Element {

    const [seed, setSeed] = useState<number>(0);
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(Number(event.target.value));
    };
    const puzzle_initial: PuzzleData = [
        [],
        [
            { "cell": [{ "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }], "vertex": [0, 0, 50, 0, 50, 50, 0, 50] },
            { "cell": [{ "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }], "vertex": [0, 0, 50, 0, 50, 50, 0, 50] },
            { "cell": [{ "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }], "vertex": [0, 0, 50, 0, 50, 50, 0, 50] },
            { "cell": [{ "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }, { "x": 0, "y": 0, "type": "/" }], "vertex": [0, 0, 50, 0, 50, 50, 0, 50] },
        ],
        [{ "x": -10, "y": -10 }, { "x": -10, "y": -10 }],
        [{ "x": -10, "y": -10 }, { "x": -10, "y": -10 }]
    ];
    const [puzzle_data, setPuzzleData] = useState<PuzzleData>(puzzle_initial);

    const [size, setSize] = useState<{ x: number, y: number }>({ x: 100, y: 100 });

    const paper_sx: SxProps<Theme> | undefined = {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }



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
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        gap={theme.spacing(1)}
                    >
                        <Paper
                            elevation={5}
                            sx={{
                                ...paper_sx,
                                width: "100%",
                                height: theme.spacing(36),
                                maxWidth: theme.spacing(40),
                                minWidth: theme.spacing(22),
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
                                        />
                                    </Box>
                                )}
                            </Measure>
                        </Paper>
                        <Paper
                            elevation={5}
                            sx={{
                                ...paper_sx,
                                width: theme.spacing(22),
                                height: "auto",
                            }}
                        >
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
                        </Paper>
                    </Grid>
                </ThemeProvider >
            </body >
        </>
    )
}

type GameCanvas = {
    width: number,
    height: number,
    puzzle_data: PuzzleData
};

function Canvas({ width, height, puzzle_data }: GameCanvas) {

    const HandleMinoDragEnd = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            const pos = e.target.position();
            if (32 < pos.x && pos.x < 284 && 32 < pos.y && pos.y < 284) {
                const new_pos = {
                    x: (Math.round((pos.x + 40) / 50) * 50) - 40,
                    y: (Math.round((pos.y + 40) / 50) * 50) - 40,
                };
                e.target.position(new_pos);
                e.target.scale({ x: 1, y: 1 });
            }
            else {
                const return_inside = (value: number, max: number) => {
                    if (value < 0) { return 0; }
                    else if (max < value) { return max; }
                    else { return value; }
                }
                const new_pos = {
                    x: return_inside(pos.x, width),
                    y: return_inside(pos.y, height)
                }
                e.target.position(new_pos);
                e.target.scale({ x: 0.75, y: 0.75 });
            }
        }, [width, height]
    );

    // type CellData = {
    //     data: {
    //         x: number,
    //         y: number,
    //         type: string
    //     }
    // };
    // function Cell({ data }: CellData): JSX.Element {
    //     const rect_props: Parameters<typeof Rect>[0] = {
    //         width: 34,
    //         height: 34,
    //         x: 8 + 50 * data.x,
    //         y: 8 + 50 * data.y,
    //         fill: "#9ba5ad",
    //         stroke: "#828c94",
    //         strokeWidth: 4,
    //         lineJoin: "round"
    //     }
    //     switch (data.type) {
    //         case "/":
    //             return (
    //                 <>
    //                     <Rect {...rect_props} />
    //                     <Line
    //                         points={[24, 0, 0, 24]}
    //                         x={13 + 50 * data.x}
    //                         y={13 + 50 * data.y}
    //                         stroke={"white"}
    //                         strokeWidth={6}
    //                         lineCap={"round"}
    //                     />
    //                 </>
    //             )
    //         case "\\":
    //             return (
    //                 <>
    //                     <Rect {...rect_props} />
    //                     <Line
    //                         points={[0, 0, 24, 24]}
    //                         x={13 + 50 * data.x}
    //                         y={13 + 50 * data.y}
    //                         stroke={"white"}
    //                         strokeWidth={6}
    //                         lineCap={"round"}
    //                     />
    //                 </>
    //             )
    //         default:
    //             return (
    //                 <Rect {...rect_props} />
    //             )
    //     }
    // };

    // type MinoIndex = {
    //     data: Mino,
    //     index: number
    // }
    // function Mino({ data, index }: MinoIndex): JSX.Element {

    //     return (
    //         <Group
    //             draggable
    //             onDragEnd={HandleMinoDragEnd}
    //             x={40 + 80 * index - (data.cell[0].x + data.cell[1].x + data.cell[2].x) * 20}
    //             y={390 + 62 * (index % 2) - (data.cell[0].y + data.cell[1].y + data.cell[2].y) * 20}
    //             offset={{ x: 25, y: 25 }}
    //             scale={{ x: 0.75, y: 0.75 }}
    //         >
    //             <Line
    //                 points={data.vertex}
    //                 fill={"#c2c8cc"}
    //                 closed={true}
    //                 stroke={"#414958"}
    //                 strokeWidth={4}
    //                 lineJoin={"round"}
    //             />
    //             <Cell data={data.cell[0]} />
    //             <Cell data={data.cell[1]} />
    //             <Cell data={data.cell[2]} />
    //         </Group>
    //     )
    // }

    function Board(): JSX.Element {
        return (
            <Group
                offset={{ x: 158, y: 158 }}
                x={width / 2}
                y={160}
            >
                <Rect
                    PreventDefault={false}
                    width={316}
                    height={316}
                    fill={"#abb5bd"}
                    stroke={"white"}
                    strokeWidth={4}
                    cornerRadius={2}
                />
                <Rect
                    PreventDefault={false}
                    width={250}
                    height={250}
                    x={33}
                    y={33}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={33}
                    y={83}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={33}
                    y={133}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={33}
                    y={183}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 250, 0]}
                    x={33}
                    y={233}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={83}
                    y={33}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={133}
                    y={33}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={183}
                    y={33}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
                <Line
                    PreventDefault={false}
                    points={[0, 0, 0, 250]}
                    x={233}
                    y={33}
                    stroke={"#414958"}
                    strokeWidth={4}
                />
            </Group>
        )
    }

    const HandleBoundsDragMove = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.target.y(342);
            if (width >= 606 || e.target.x() > 0) {
                e.target.x(2);
            }
            else if (e.target.x() < width - 606) {
                e.target.x(width - 606);
            }
        }, [width]
    );
    function MinoBase(): JSX.Element {
        return (
            <Group
                draggable
                onDragMove={HandleBoundsDragMove}
                x={2}
                y={342}
            >
                <Rect
                    width={604}
                    height={200}
                    fill={"#48505e"}
                    stroke={"#414958"}
                    strokeWidth={4}
                    cornerRadius={2}
                />
                <Line
                    draggable
                    onDragMove={e => {
                        e.cancelBubble = true;
                    }}
                    x={50}
                    y={75}
                    points={[0, 0, 0, -50, 50, -50, 50, 50, -50, 50, -50, 0]}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
                <Line
                    draggable
                    onDragMove={e => {
                        e.cancelBubble = true;
                    }}
                    x={200}
                    y={75}
                    points={[0, -50, 50, -50, 50, 100, 0, 100]}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
                <Line
                    draggable
                    onDragMove={e => {
                        e.cancelBubble = true;
                    }}
                    x={350}
                    y={75}
                    points={[-50, 0, 100, 0, 100, 50, -50, 50]}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
                <Line
                    draggable
                    onDragMove={e => {
                        e.cancelBubble = true;
                    }}
                    x={500}
                    y={75}
                    points={[0, 100, 0, 0, 100, 0, 100, 50, 50, 50, 50, 100]}
                    fill={"#c2c8cc"}
                    closed={true}
                    stroke={"#414958"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
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
                <MinoBase />
            </Layer>
        </Stage>
    );
}
