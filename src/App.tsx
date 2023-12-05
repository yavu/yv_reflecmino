import React, { useCallback, useRef, useState } from 'react';
import { Stage, Layer, Rect, Group, Line } from 'react-konva';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { gh_dark as theme } from './theme/gh_dark';
import { generate } from './puzzle/generate';
import { KonvaEventObject } from 'konva/lib/Node';

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
                        flexWrap="nowrap"
                        alignItems="flex-start"
                        overflow="hidden"
                        sx={{
                            minWidth: theme.spacing(23)
                        }}
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                height: "auto",
                                width: theme.spacing(47),
                                padding: theme.spacing(1),
                                paddingBottom: "0",
                                margin: theme.spacing(1),
                                overflowX: "hidden",
                                overflowY: "auto",
                                "@media screen and (max-width:792px)": {
                                    width: theme.spacing(24),
                                    marginLeft: 0,
                                    marginRight: 0
                                }
                            }}
                        >
                            <Typography
                                variant="h5"
                            >
                                ReflecMino
                            </Typography>
                            <Divider
                                sx={{
                                    marginTop: theme.spacing(0.5),
                                    marginBottom: theme.spacing(1)
                                }}
                            />
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                gap={theme.spacing(1)}
                            >
                                <Paper
                                    elevation={6}
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        maxWidth: theme.spacing(22),
                                        padding: theme.spacing(1),
                                        marginBottom: theme.spacing(1)
                                    }}
                                >
                                    <Grid
                                        container
                                        justifyContent="center"
                                    >
                                        <Canvas
                                            width={theme.spacing(20)}
                                            height={theme.spacing(32)}
                                            puzzle_data={puzzle_data}
                                        />
                                    </Grid>
                                </Paper>
                                <PropertyWrapper
                                    width={theme.spacing(22)}
                                    height="auto"
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
                                </PropertyWrapper>
                            </Grid>
                        </Paper>
                    </Grid>
                </ThemeProvider >
            </body >
        </>
    )
}

type Wrapper = {
    width: string,
    height: string,
    children: ReactNode
};

function PropertyWrapper({ width, height, children }: Wrapper): JSX.Element {
    return (
        <Paper
            elevation={6}
            sx={{
                width: width,
                height: height,
                padding: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}
        >
            {children}
        </Paper>
    )
}

type GameCanvas = { width: string, height: string, puzzle_data: PuzzleData };

function Canvas({ width, height, puzzle_data }: GameCanvas) {

    const HandleMinoDragEnd = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            const pos = e.target.position();
            if (32 < pos.x && pos.x < 284 && 32 < pos.y && pos.y < 284) {
                e.target.position({
                    x: (Math.round((pos.x + 40) / 50) * 50) - 40,
                    y: (Math.round((pos.y + 40) / 50) * 50) - 40,
                });
                e.target.scale({ x: 1, y: 1 });
            }
            else {
                const return_inside = (value: number, max: number) => {
                    if (value < 0) { return 0; }
                    else if (max < value) { return max; }
                    else { return value; }
                }
                e.target.position({ x: return_inside(pos.x, parseInt(width.slice(0, -2))), y: return_inside(pos.y, parseInt(height.slice(0, -2))) });
                e.target.scale({ x: 0.75, y: 0.75 });
            }
        }, [width, height]
    );

    type CellData = {
        data: {
            x: number,
            y: number,
            type: string
        }
    };
    function Cell({ data }: CellData): JSX.Element {
        return (
            <>
                <Rect
                    width={34}
                    height={34}
                    x={8 + 50 * data.x}
                    y={8 + 50 * data.y}
                    fill={"#9ba5ad"}
                    stroke={"#828c94"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
                {(() => {
                    if (data.type == "/") {
                        return (
                            <Line
                                points={[24, 0, 0, 24]}
                                x={13 + 50 * data.x}
                                y={13 + 50 * data.y}
                                stroke={"white"}
                                strokeWidth={6}
                                lineCap={"round"}
                            />
                        )
                    }
                    else if (data.type == "\\") {
                        return (
                            <Line
                                points={[0, 0, 24, 24]}
                                x={13 + 50 * data.x}
                                y={13 + 50 * data.y}
                                stroke={"white"}
                                strokeWidth={6}
                                lineCap={"round"}
                            />
                        )
                    }
                })()}
            </>
        )
    };

    type MinoIndex = {
        data: Mino,
        index: number
    }
    function Mino({ data, index }: MinoIndex): JSX.Element {
        return (
            <Group
                draggable
                onDragEnd={HandleMinoDragEnd}
                x={40 + 80 * index - (data.cell[0].x + data.cell[1].x + data.cell[2].x) * 20}
                y={390 + 62 * (index % 2) - (data.cell[0].y + data.cell[1].y + data.cell[2].y) * 20}
                offset={{ x: 25, y: 25 }}
                scale={{ x: 0.75, y: 0.75 }}
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

    return (
        <Stage
            width={parseInt(width.slice(0, -2))}
            height={parseInt(height.slice(0, -2))}
        >
            <Layer>
                <Board />
                <Mino data={puzzle_data[1][0]} index={0} />
                <Mino data={puzzle_data[1][1]} index={1} />
                <Mino data={puzzle_data[1][2]} index={2} />
                <Mino data={puzzle_data[1][3]} index={3} />
                {/* <Line
                offset={{ x: -35, y: -35 }}
                points={[0, 0, 50, 0]}
                x={-25}
                y={25}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
                lineCap={"butt"}
            /> */}
            </Layer>
        </Stage>
    );
}

function Board(): JSX.Element {
    return (
        <Group>
            <Rect
                PreventDefault={false}
                width={316}
                height={316}
                x={2}
                y={2}
                fill={"#abb5bd"}
                stroke={"white"}
                strokeWidth={4}
                cornerRadius={2}
            />
            <Rect
                PreventDefault={false}
                width={250}
                height={250}
                x={35}
                y={35}
                fill={"#48505e"}
                stroke={"#414958"}
                strokeWidth={4}
                lineJoin={"round"}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={35}
                y={85}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={35}
                y={135}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={35}
                y={185}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 250, 0]}
                x={35}
                y={235}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={85}
                y={35}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={135}
                y={35}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={185}
                y={35}
                stroke={"#414958"}
                strokeWidth={4}
            />
            <Line
                PreventDefault={false}
                points={[0, 0, 0, 250]}
                x={235}
                y={35}
                stroke={"#414958"}
                strokeWidth={4}
            />
        </Group>
    )
}