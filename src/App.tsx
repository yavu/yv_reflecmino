import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Divider, FormControl, MenuItem, Paper, Select, SelectChangeEvent, SxProps, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DarkTheme } from './theme/dark';
import { generate } from './puzzle/generate';
import { drag as drag } from './puzzle/ui';

export default function App(): JSX.Element {


    const [seed, setSeed] = React.useState<number>(0);
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
                <ThemeProvider theme={DarkTheme}>
                    <CssBaseline />
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        flexWrap="nowrap"
                        alignItems="flex-start"
                        overflow="hidden"
                        sx={{
                            minWidth: DarkTheme.spacing(23)
                        }}
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                height: "auto",
                                width: DarkTheme.spacing(47),
                                padding: DarkTheme.spacing(1),
                                paddingBottom: "0",
                                margin: DarkTheme.spacing(1),
                                overflowX: "hidden",
                                overflowY: "auto",
                                "@media screen and (max-width:792px)": {
                                    width: DarkTheme.spacing(25)
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
                                    marginTop: DarkTheme.spacing(0.5),
                                    marginBottom: DarkTheme.spacing(1)
                                }}
                            />
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                gap={DarkTheme.spacing(1)}
                            >
                                <PropertyWrapper
                                    width={DarkTheme.spacing(22)}
                                    height="auto"
                                >
                                    <Canvas
                                        width={DarkTheme.spacing(20)}
                                        height={DarkTheme.spacing(32)}
                                    />
                                </PropertyWrapper>
                                <PropertyWrapper
                                    width={DarkTheme.spacing(22)}
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
                padding: DarkTheme.spacing(1),
                marginBottom: DarkTheme.spacing(1)
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

// function Canvas({ width, height }: Canvas) {
//     // const [ctx, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
//     const canvas_ref = useRef(null);
//     const canvas_size = { x: Number(width.slice(0, -2)) * 2, y: Number(height.slice(0, -2)) * 2 };

//     useEffect(() => {
//         const canvas: any = canvas_ref.current;
//         // setContext(canvas.getContext('2d'));
//         // canvas.addEventListener("touchstart", () => {console.log("t_down")}, false);
//         // canvas.addEventListener("touchmove", () => {console.log("t_move")}, false);
//         canvas.addEventListener("touchmove", (e: any) => { drag(canvas, canvas_size, e); }, false);
//         // canvas.addEventListener("touchend", () => {console.log("t_up")}, false);
//         // canvas.addEventListener("mousedown", () => {console.log("m_down")}, false);
//         canvas.addEventListener("mousemove", (e: any) => { drag(canvas, canvas_size, e); }, false);
//         // canvas.addEventListener("mouseup", () => {console.log("m_up")}, false);
//     }, []);

//     return (
//         <div
//             style={{
//                 maxWidth: width,
//                 maxHeight: height,
//             }}
//         >
//             <canvas
//                 ref={canvas_ref}
//                 width={canvas_size.x}
//                 height={canvas_size.y}
//                 style={{
//                     width: "100%",
//                     height: "100%",
//                     touchAction: "pinch-zoom"
//                 }} />
//         </div >
//     );
// }


function Canvas({ width, height }: Canvas) {
    const stage_ref = useRef(null);

    return (
        <Stage
            ref={stage_ref}
            width={Number(width.slice(0, -2))}
            height={Number(height.slice(0, -2))}
            style={{
                touchAction: "pinch-zoom"
            }} >
            <Layer>
                <Rect width={50} height={50} fill="red" />
            </Layer>
        </Stage>
    );
}
