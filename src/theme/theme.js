import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const themeComponents = {
    components: {
        // component name
        MuiPaper: {
            styleOverrides: {
                // slot to target
                root: {
                    borderRadius: "0px"
                }
            },
        }
    }
};

const themePalettes = {
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
        background: {
            paper: "#0A1929",
        },
        action: {
            active: "#fff",
            hover: "rgba(255, 255, 255, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(255, 255, 255, 0.16)",
            selectedOpacity: 0.16,
        },
        text: {
            disabled: "rgba(255, 255, 255, 0.5)",
            icon: "rgba(255, 255, 255, 0.5)",
            primary: "#fff",
            secondary: "#AAB4BE",
        },
    },
};

const theme = createTheme(themePalettes, themeComponents);

export default theme;