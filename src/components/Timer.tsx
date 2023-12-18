import { Theme, Typography } from '@mui/material';
import React from 'react';

type TimerProp = {
    enabled: boolean,
    theme: Theme,
    solved: boolean,
    playing: boolean
}

const Timer = ({ enabled, theme, solved, playing }: TimerProp): JSX.Element => {

    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
        if (enabled) {
            const id = setInterval(() => {
                setTime(t => t < 5999 ? t + 1 : t);
            }, 1000);
            return () => clearInterval(id);
        }
        else if (!playing && !solved) {
            setTime(0);
        }
    }, [enabled, playing, solved]);

    const m = Math.floor(time / 60);
    const s = time % 60;

    return (
        <Typography
            id={"timer"}
            variant={"h3"}
            sx={{
                width: theme.spacing(12),
                height: theme.spacing(5),
                paddingTop: theme.spacing(0.85),
                margin: `${theme.spacing(3)} auto 0 auto`,
                textAlign: "center",
                borderRadius: "4px 4px 0 0",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: solved ? "#ffffff" : "#d9dde0",
                borderBottomWidth: "0",
                "@media screen and (max-width:704px)": {
                    marginTop: theme.spacing(1)
                }
            }}
        >
            {m < 10 ? "0" : ""}{m}:{s < 10 ? "0" : ""}{s}
        </Typography>
    );
};

export default React.memo(Timer);