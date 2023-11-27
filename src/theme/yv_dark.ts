import { createTheme } from '@mui/material/styles';

export const yv_dark = createTheme({
    typography: {
        fontFamily: "Share Tech Mono",
        button: {
            fontWeight: 600,
        },
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#00b0ff",
            contrastText: "#2a3648",
        },
        secondary: {
            main: "#ef6c00",
        },
        background: {
            default: "#101d31",
            paper: "#101d31",
        },
        error: {
            main: "#ff1744",
        },
    },
    spacing: 16,
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(30, 160, 255, 0.3);
                border-radius: 8px;
                opacity: 0.1;
            }
            @font-face {
              font-family: 'Share Tech Mono';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            `
        },
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.size === "medium" && {
                        boxSizing: "border-box",
                        height: "40px",
                        paddingTop: "8px",
                    })
                })
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    boxSizing: "border-box",
                    height: "40px"
                }
            }
        }
    }
});
