import React, { useCallback, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { gh_dark as theme } from './theme/gh_dark';
import { generate } from './puzzle/generate';
import Measure from 'react-measure'
import { PuzzleData, empty_board } from './puzzle/const';
import Canvas from './components/Canvas';

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
        [
            { start: { "x": 0, "y": 0 }, end: { "x": 0, "y": 0 }, board: empty_board, vertex: [] },
            { start: { "x": 0, "y": 0 }, end: { "x": 0, "y": 0 }, board: empty_board, vertex: [] }
        ]
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

