import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Image, Group, Line } from 'react-konva';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Divider, FormControl, MenuItem, Paper, Select, SelectChangeEvent, SxProps, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { gh_dark as theme } from './theme/gh_dark';
import { generate } from './puzzle/generate';
import { KonvaEventObject } from 'konva/lib/Node';

export default function App(): JSX.Element {


    const [seed, setSeed] = useState<number>(0);
    const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeed(Number(event.target.value));
    };

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
                                    width: theme.spacing(25)
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
                                <PropertyWrapper
                                    width={theme.spacing(22)}
                                    height="auto"
                                >
                                    <Canvas
                                        width={theme.spacing(20)}
                                        height={theme.spacing(32)}
                                    />
                                </PropertyWrapper>
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
                                        onClick={() => generate(seed)}
                                    >
                                        Run
                                    </Button>
                                </PropertyWrapper>
                            </Grid>
                        </Paper>
                    </Grid>
                </ThemeProvider>
            </body>
        </>
    )
}

type PropertyWrapper = {
    children: ReactNode;
    width: string;
    height: string;
};

function PropertyWrapper({ width, height, children }: PropertyWrapper): JSX.Element {
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

type Canvas = {
    width: string;
    height: string;
};

function Canvas({ width, height }: Canvas) {
    const stage_ref = useRef(null);

    const [dragging, setDragging] = useState<boolean>(false);
    const [pos, setPos] = useState({ x: 50, y: 50 });

    const HandleDragStart = useCallback(() => { setDragging(true) }, [setDragging]);
    const HandleDragEnd = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            setDragging(false);
            e.target.position({
                x: Math.round(e.target.position().x / 50) * 50,
                y: Math.round(e.target.position().y / 50) * 50,
            });
            setPos(e.target.position());
            // console.log(`crp: ${e.target.position().x} : ${e.target.position().y}`);
            console.log(`pos: ${Math.round(e.target.position().x / 50) * 50} : ${Math.round(e.target.position().y / 50) * 50}`);
        }, [setDragging]
    );

    return (
        <Stage
            ref={stage_ref}
            width={parseInt(width.slice(0, -2))}
            height={parseInt(height.slice(0, -2))}
            style={{
                touchAction: "pinch-zoom"
            }} >
            <Layer>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                >
                    <Line
                        points={[0, 0, 100, 0, 100, 100, 50, 100, 50, 50, 0, 50]}
                        fill={"#cad5dd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={6}
                        y={6}
                        fill={"#929ca4"}
                        stroke={"#abb5bd"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={6}
                        fill={"#929ca4"}
                        stroke={"#abb5bd"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={56}
                        fill={"#929ca4"}
                        stroke={"#abb5bd"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[60, 10, 90, 40]}
                        stroke={"white"}
                        strokeWidth={8}
                        lineCap={"round"}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                >
                    <Line
                        points={[0, 0, 100, 0, 100, 100, 50, 100, 50, 50, 0, 50]}
                        fill={"#cad5dd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={6}
                        y={6}
                        fill={"#ff7f1e"}
                        stroke={"#ff9f56"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={6}
                        fill={"#ff7f1e"}
                        stroke={"#ff9f56"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={56}
                        fill={"#ff7f1e"}
                        stroke={"#ff9f56"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[60, 10, 90, 40]}
                        stroke={"white"}
                        strokeWidth={8}
                        lineCap={"round"}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                >
                    <Line
                        points={[0, 0, 100, 0, 100, 100, 50, 100, 50, 50, 0, 50]}
                        fill={"#cad5dd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={6}
                        y={6}
                        fill={"#0099FF"}
                        stroke={"#14b3ff"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={6}
                        fill={"#0099FF"}
                        stroke={"#14b3ff"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={56}
                        fill={"#0099FF"}
                        stroke={"#14b3ff"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[60, 10, 90, 40]}
                        stroke={"white"}
                        strokeWidth={8}
                        lineCap={"round"}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                >
                    <Line
                        points={[0, 0, 100, 0, 100, 100, 50, 100, 50, 50, 0, 50]}
                        fill={"#cad5dd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={6}
                        y={6}
                        fill={"#d9e4f1"}
                        stroke={"#e9f1ff"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={6}
                        fill={"#d9e4f1"}
                        stroke={"#e9f1ff"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={38}
                        height={38}
                        x={56}
                        y={56}
                        fill={"#d9e4f1"}
                        stroke={"#e9f1ff"}
                        strokeWidth={6}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[60, 10, 90, 40]}
                        stroke={"white"}
                        strokeWidth={8}
                        lineCap={"round"}
                    />
                </Group>
            </Layer>
        </Stage>
    );
}
