import React, { useCallback, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button, Divider, Fab, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { gh_dark as theme } from '../theme/gh_dark';
import { generate } from '../puzzle/generate';
import Measure from 'react-measure'
import { PuzzleData, puzzle_initial_data } from '../puzzle/const';
import Canvas from './Canvas';
import icon from '../images/icon.png';
import Timer from './Timer';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format, isBefore } from 'date-fns';
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const ReflecMino = (): JSX.Element => {

    // const [seed, setSeed] = useState<number>(Number(format(new Date(), "yyyyMMdd")));
    // const HandleTextChange = useCallback(
    //     (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setSeed(Number(event.target.value));
    //     }, []
    // );

    const [date, setDate] = useState<Date>(new Date());
    const HandleDayChange = useCallback(
        (value: Date | null) => {
            if (!Number.isNaN(value?.getTime()) && value !== null) {
                const new_date = isBefore(value, new Date()) ? value : new Date();
                // console.log(format(new_date, "yyyyMMdd"));
                setDate(new_date);
                // setSeed(Number(format(new_date, "yyyyMMdd")));
            }
        }, []
    );
    const [puzzle_data, setPuzzleData] = useState<PuzzleData>(puzzle_initial_data);
    const [complete, setComplete] = useState<boolean>(false);

    const [size, setSize] = useState<{ x: number, y: number }>({ x: 100, y: 100 });
    const onResize = useCallback(
        ({ bounds }: { bounds?: { width?: number, height?: number } }) => {
            setSize({
                x: bounds?.width ?? 0,
                y: bounds?.height ?? 0
            });
        }, []
    );

    const [playing, setPlaying] = useState<boolean>(false);
    const [timer_enabled, setTimerEnabled] = useState<boolean>(false);
    const game_start = useCallback(
        () => {
            setPuzzleData(generate(Number(format(date, "yyyyMMdd"))));
            setPlaying(true);
            setTimerEnabled(true);
        }, [date]
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
                        >
                            <Paper
                                elevation={5}
                                sx={{
                                    padding: theme.spacing(1),
                                    marginTop: theme.spacing(1),
                                    marginRight: theme.spacing(1),
                                    position: "absolute",
                                    width: theme.spacing(20),
                                    height: theme.spacing(20),
                                    display: playing ? "block" : "none",
                                    backgroundColor: complete ? theme.palette.primary.main : undefined,
                                    transition: "background-color 1s",
                                    "@media screen and (max-width:704px)": {
                                        position: "static",
                                        width: theme.spacing(22),
                                        height: theme.spacing(16),
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: theme.spacing(1),
                                    },
                                }}
                            >
                                < Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Timer enabled={timer_enabled && !complete} theme={theme} />
                                    <Fab
                                        variant="extended"
                                        color="primary"
                                        sx={{
                                            display: complete ? "none" : "inline-flex",
                                            height: theme.spacing(2),
                                            padding: "0",
                                            backgroundColor: "#d9dde0",
                                            borderRadius: "0 0 4px 4px",
                                            "&:hover": {
                                                backgroundColor: "#40c0ff"
                                            }
                                        }}
                                        onClick={useCallback(() => setTimerEnabled(!timer_enabled), [timer_enabled])}
                                    >
                                        <PauseIcon
                                            sx={{
                                                display: timer_enabled ? "inline-block" : "none",
                                                width: theme.spacing(12),
                                                margin: "0 auto",
                                                color: "#32373f"
                                            }}
                                        />
                                        <PlayArrowIcon
                                            sx={{
                                                display: timer_enabled ? "none" : "inline-block",
                                                width: theme.spacing(12),
                                                margin: "0 auto",
                                                color: "#32373f"
                                            }}
                                        />
                                    </Fab>
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        textAlign="center"
                                        sx={{
                                            display: complete ? "block" : "none",
                                            height: theme.spacing(2),
                                            width: theme.spacing(12),
                                            padding: "auto",
                                            backgroundColor: "#ffffff",
                                            borderRadius: "0 0 4px 4px"
                                        }}
                                    >
                                        Solved
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            marginTop: theme.spacing(1),
                                        }}
                                    >
                                        Challenge for
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                    >
                                        {format(date, "yyyy/MM/dd")}
                                    </Typography>
                                </Grid>
                            </Paper>
                            <Paper
                                elevation={5}
                                sx={{
                                    padding: theme.spacing(1),
                                    width: theme.spacing(43),
                                    height: complete ? theme.spacing(22) : theme.spacing(32.65),
                                    transition: "height 1s",
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
                                                setComplete={setComplete}
                                                timer_enabled={timer_enabled}
                                            />
                                        </Box>
                                    )}
                                </Measure>
                            </Paper>
                            <Paper
                                elevation={5}
                                sx={{
                                    padding: theme.spacing(1),
                                    width: theme.spacing(43),
                                    height: theme.spacing(32.65),
                                    position: "absolute",
                                    boxShadow: "none",
                                    display: playing ? "none" : "block",
                                    "@media screen and (max-width:704px)": {
                                        width: theme.spacing(22),
                                        marginLeft: 0,
                                        marginRight: 0
                                    }
                                }}
                            >
                                < Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Box
                                        sx={{
                                            width: theme.spacing(5),
                                            height: theme.spacing(5),
                                            marginTop: theme.spacing(3),
                                        }}
                                    >
                                        <img src={icon} alt={"icon"} width={"100%"} height={"100%"} />
                                    </Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            marginTop: theme.spacing(2),
                                        }}
                                    >
                                        ReflecMino
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            format="yyyy/MM/dd"
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    size: 'small'
                                                },
                                            }}
                                            sx={{
                                                width: theme.spacing(14),
                                                marginTop: theme.spacing(2),
                                            }}
                                            value={date}
                                            maxDate={new Date()}
                                            onChange={HandleDayChange}
                                        />
                                    </LocalizationProvider>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            width: theme.spacing(10),
                                            marginTop: theme.spacing(3),
                                            backgroundColor: "#ffffff",
                                            "&:hover": {
                                                backgroundColor: "#40c0ff",
                                            }
                                        }}
                                        onClick={game_start}
                                    >
                                        Play
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            width: theme.spacing(10),
                                            marginTop: theme.spacing(1),
                                            color: "#ffffff",
                                            borderColor: "#ffffff",
                                            "&:hover": {
                                                color: "#40c0ff",
                                            }
                                        }}
                                    >
                                        How to play
                                    </Button>
                                </Grid>
                            </Paper>
                            <Paper
                                elevation={5}
                                sx={{
                                    width: theme.spacing(43),
                                    marginBottom: theme.spacing(1),
                                    padding: complete ? theme.spacing(1) : "0px",
                                    height: complete ? theme.spacing(9.6) : "0px",
                                    marginTop: complete ? theme.spacing(1) : "0px",
                                    transition: "height 1s, padding 1s, margin-top 1s",
                                    "@media screen and (max-width:704px)": {
                                        width: theme.spacing(22),
                                    }
                                }}
                            >
                            </Paper>
                        </Grid>
                    </Box>
                </ThemeProvider>
            </body>
        </>
    )
}

export default React.memo(ReflecMino);
// export default App;