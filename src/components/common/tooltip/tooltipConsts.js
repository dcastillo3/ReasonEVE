import { pointerDirectionProps, pointerSizeProps, variantProps } from "../../styled";

const toolTipMargins = {
    left: [0, 0, 0, 2],
    right: [0, 2, 0, 0],
    up: [2, 0, 0, 0],
    down: [0, 0, 2, 0]
};

const tooltipProps = {
    variant: variantProps,
    pointerDirection: pointerDirectionProps,
    pointerSize: pointerSizeProps
};

export {
    toolTipMargins,
    tooltipProps
};