import React, { useEffect, useRef } from 'react';
import { ReactNode } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, FormControl, MenuItem, Paper, Select, SelectChangeEvent, SxProps, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DarkTheme } from './theme/dark';

export default function App(): JSX.Element {
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
                            minWidth: DarkTheme.spacing(26)
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
                                "@media screen and (max-width:800px)": {
                                    width: DarkTheme.spacing(24)
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
                                    height={DarkTheme.spacing(22)}
                                >
                                    <Canvas
                                        width={DarkTheme.spacing(20)}
                                        height={DarkTheme.spacing(20)}
                                    />
                                </PropertyWrapper>
                                <PropertyWrapper
                                    width={DarkTheme.spacing(22)}
                                    height={DarkTheme.spacing(22)}
                                >
                                    <Canvas
                                        width={DarkTheme.spacing(20)}
                                        height={DarkTheme.spacing(20)}
                                    />
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

function Canvas({ width: width, height: height }: Canvas) {
    const canvas_ref = useRef(null);

    const get_context = (): CanvasRenderingContext2D => {
        const canvas: any = canvas_ref.current;
        return canvas.getContext('2d');
    };

    useEffect(() => {
        const ctx: CanvasRenderingContext2D = get_context();
        ctx.fillRect(0, 0, 100, 100);
        ctx.save();
    })

    return (
        <>
            <canvas ref={canvas_ref} width={width} height={height} />
        </>
    );
}
