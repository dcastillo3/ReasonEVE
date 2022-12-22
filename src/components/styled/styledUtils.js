import { defaultElement, defaultVariant } from "./styledConsts";

const buildPalette = ({ theme, variant = defaultVariant }) => ({
    background: theme.palette[variant].main,
    color: theme.palette.text[variant],
    transition: theme.transitions.easing.sharp
});

const buildHoverPalette = ({ theme, variant = defaultVariant }) => {
    const bgHoverColor = theme.palette[variant].light;
    const cssProps = `
        &:hover {
            background: ${bgHoverColor};
            cursor: pointer;
        }
    `;

    return cssProps;
};

const buildTypography = ({ theme }, element = defaultElement) => {
    const typography = theme.typography[element];

    return typography;
};

export {
    buildPalette,
    buildHoverPalette,
    buildTypography
};