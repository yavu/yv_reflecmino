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

    // const paper_sx: SxProps<Theme> | undefined = {
    //     padding: theme.spacing(1),
    //     marginBottom: theme.spacing(1)
    // }



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
                                    height: theme.spacing(31),
                                    "@media screen and (max-width:704px)": {
                                        width: theme.spacing(22),
                                        height: theme.spacing(31),
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
                                        marginTop: theme.spacing(1),
                                        textAlign: "center",
                                    }}
                                >
                                    2023/12/07
                                </Typography>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        marginTop: theme.spacing(1),
                                        textAlign: "center",
                                    }}
                                >
                                    0:00
                                </Typography>
                            </Paper>
                        </Grid>
                    </Box>
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

    function Board(): JSX.Element {
        return (
            <Group
                offset={{ x: 158, y: 158 }}
                x={160}
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

    return (
        <Stage
            width={width}
            height={height}
        >
            <Layer>
                <Board />
                {/* <Rect
                    PreventDefault={false}
                    width={316}
                    height={316}
                    x={width-318}
                    y={2}
                    fill={"#abb5bd"}
                    stroke={"white"}
                    strokeWidth={4}
                    cornerRadius={2}
                /> */}
            </Layer>
        </Stage>
    );
}
