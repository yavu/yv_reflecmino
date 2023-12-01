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
                                        onClick={() => generate(seed)}
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

    const HandleMinoDragStart = useCallback(() => { setDragging(true) }, [setDragging]);
    const HandleMinoDragEnd = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            setDragging(false);
            // const pointer_pos = e.target.getStage()?.getPointerPosition() ?? { x: 0, y: 0 };
            // if (pointer_pos.y < 318) {
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
            console.log(`pos: ${e.target.position().x} : ${e.target.position().y}`);
            // console.log(`cur: ${Math.round(pointer_pos.x)} : ${Math.round(pointer_pos.y)}`);
        }, [setDragging]
    );

    return (
        <Stage
            ref={stage_ref}
            width={parseInt(width.slice(0, -2))}
            height={parseInt(height.slice(0, -2))}
        >
            <Layer>
                <Test />

                {/* <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                    rotation={90}
                    x={100}
                    y={100}
                >
                    <Rect
                        width={50}
                        height={33}
                        fill={"#abb5bd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={25}
                        x={8}
                        y={8}
                        fill={"#9ba5ad"}
                        stroke={"#828c94"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 50, 0]}
                        x={0}
                        y={33}
                        stroke={"white"}
                        strokeWidth={4}
                        lineCap={'square'}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                    rotation={0}
                    x={100}
                    y={100}
                >
                    <Rect
                        width={50}
                        height={33}
                        fill={"#abb5bd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={25}
                        x={8}
                        y={8}
                        fill={"#9ba5ad"}
                        stroke={"#828c94"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 50, 0]}
                        x={0}
                        y={33}
                        stroke={"white"}
                        strokeWidth={4}
                        lineCap={'square'}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                    rotation={270}
                    x={100}
                    y={100}
                >
                    <Rect
                        width={50}
                        height={33}
                        fill={"#abb5bd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={25}
                        x={8}
                        y={8}
                        fill={"#ff9f56"}
                        stroke={"#ff7f1e"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 50, 0]}
                        x={0}
                        y={33}
                        stroke={"white"}
                        strokeWidth={4}
                        lineCap={'square'}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                    rotation={180}
                    x={100}
                    y={100}
                >
                    <Rect
                        width={50}
                        height={33}
                        fill={"#abb5bd"}
                        closed={true}
                        stroke={"white"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={25}
                        x={8}
                        y={8}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 50, 0]}
                        x={0}
                        y={33}
                        stroke={"white"}
                        strokeWidth={4}
                        lineCap={'square'}
                    />
                </Group> */}


                <Group
                    draggable
                    onDragStart={HandleMinoDragStart}
                    onDragEnd={HandleMinoDragEnd}
                >
                    <Line
                        // points={[0, 50, 0, -50, 50, -50, 50, 0, 100, 0, 100, 50]}
                        // points={[0, 100, 0, 0, 100, 0, 100, 50, 50, 50, 50, 100]}
                        // points={[-50, 0, 50, 0, 50, 100, 0, 100, 0, 50, -50, 50]}
                        points={[0, 0, 0, -50, 50, -50, 50, 50, -50, 50, -50, 0]}
                        // points={[-50, 0, 100, 0, 100, 50, -50, 50]}
                        // points={[0, -50, 50, -50, 50, 100, 0, 100]}
                        x={-25}
                        y={-25}
                        fill={"#c2c8cc"}
                        closed={true}
                        stroke={"#414958"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    {/* <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={-42}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={8}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={8}
                        y={8}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={-37}
                        y={13}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    /> */}
                </Group>
                {/* <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                >
                    <Line
                        points={[0, 0, 0, -150, 50, -150, 50, 0]}
                        x={-50}
                        y={50}
                        fill={"#c2c8cc"}
                        closed={true}
                        stroke={"#414958"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={-92}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={-42}
                        fill={"#ffffff"}
                        stroke={"#dddddd"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={8}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={-37}
                        y={-87}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                    <Line
                        points={[24, 0, 0, 24]}
                        x={-37}
                        y={13}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                    rotation={90}
                >
                    <Line
                        points={[0, 0, 0, -100, 50, -100, 50, -50, 100, -50, 100, 0]}
                        x={-50}
                        y={50}
                        fill={"#c2c8cc"}
                        closed={true}
                        stroke={"#414958"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={-42}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={8}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={8}
                        y={8}
                        fill={"#14b3ff"}
                        stroke={"#0099FF"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={-37}
                        y={13}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                </Group>
                <Group
                    draggable
                    onDragStart={HandleDragStart}
                    onDragEnd={HandleDragEnd}
                >
                    <Line
                        points={[0, 0, 0, -100, 50, -100, 50, -50, 100, -50, 100, 0]}
                        x={-50}
                        y={50}
                        fill={"#c2c8cc"}
                        closed={true}
                        stroke={"#414958"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={-42}
                        fill={"#ff9f56"}
                        stroke={"#ff7f1e"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={-42}
                        y={8}
                        fill={"#ff9f56"}
                        stroke={"#ff7f1e"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Rect
                        width={34}
                        height={34}
                        x={8}
                        y={8}
                        fill={"#ff9f56"}
                        stroke={"#ff7f1e"}
                        strokeWidth={4}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={-37}
                        y={-37}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                    <Line
                        points={[0, 0, 24, 24]}
                        x={-37}
                        y={13}
                        stroke={"white"}
                        strokeWidth={6}
                        lineCap={"round"}
                    />
                </Group> */}

                {/* <Group>
                    <Line
                        points={[24, 0, 50, 0, 50, 50, 276, 50]}
                        x={10}
                        y={110}
                        stroke={"#ff7f1e"}
                        strokeWidth={8}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[19, 0, 50, 0, 50, 50, 281, 50]}
                        x={10}
                        y={110}
                        stroke={"#ffffff"}
                        strokeWidth={3}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 24, 0, 100, 100, 100, 100, 200, 0, 200, 0, 276]}
                        x={160}
                        y={10}
                        stroke={"#0099FF"}
                        strokeWidth={8}
                        lineJoin={"round"}
                    />
                    <Line
                        points={[0, 19, 0, 100, 100, 100, 100, 200, 0, 200, 0, 281]}
                        x={160}
                        y={10}
                        stroke={"#ffffff"}
                        strokeWidth={3}
                        lineJoin={"round"}
                    />
                </Group> */}

            </Layer>
        </Stage>
    );
}

function Test(): JSX.Element {

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