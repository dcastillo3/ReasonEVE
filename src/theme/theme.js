import { createTheme } from '@mui/material/styles';

const muiThemeComponents = {
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

//TO-DO: Attach default, light, dark blacks
const muiThemePalettes = {
    palette: {
        primary: {
            main: "#f54329"
        },
        secondary: {
            main: "#667ff3"
        },
        success: {
            main: "#bcfc37"
        },
        warning: {
            main: "#FF6266"
        },
        error: {
            main: "#FF383D"
        },
        info: {
            main: "#bcfd36"
        },
        background: {
            main: "#e1e3e9",
            light: "#fff",
            medium: "#e1e3e9",
            dark: "#2d3240",
            paper: "#2d3240"
        },
        action: {
            active: "#fff",
            hover: "rgba(255, 255, 255, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(255, 255, 255, 0.16)",
            selectedOpacity: 0.16
        },
        text: {
            disabled: "rgba(255, 255, 255, 0.5)",
            icon: "rgba(255, 255, 255, 0.5)",
            primary: "#fff4f5",
            secondary: "#f6f9ff",
            success: "#2d3240",
            warning: "#fff",
            error: "#fff",
            info: "#294509",
            background: "#2d3240"
        },
    },
};

const muiTheme = createTheme(muiThemePalettes, muiThemeComponents);

export default muiTheme;