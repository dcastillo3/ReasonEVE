import { arrowSizes, defaultArrowSize } from "../../styled/styledConsts";
import { toolTipMargins } from "./tooltipConsts";

const buildArrowBorderSizes = (theme, pointerSize) => {
    const arrowSize = pointerSize ? pointerSize : defaultArrowSize;
    const arrowBorders = arrowSizes[arrowSize];
    const arrowBorderSizes = arrowBorders.map(border => theme.spacing(border));

    return arrowBorderSizes;
};

const buildToolTipArrowStyle = ({theme, pointerDirection, pointerSize}) => {
    const [arrowDegree] = buildArrowBorderSizes(theme, pointerSize);
    const pointerDirectionPositions = {
        left: {
            right: '100%',
            bottom: arrowDegree
        },
        right: {
            left: '100%',
            bottom: arrowDegree
        },
        up: {
            bottom: '100%',
            left: arrowDegree
        },
        down: {
            top: '100%',
            left: arrowDegree
        }
    };
    const toolTipArrowStyle = pointerDirectionPositions[pointerDirection];

    return toolTipArrowStyle;
};

const buildToolTipMargins = (theme, pointerDirection, pointerSize) => {
    const arrowSize = pointerSize ? pointerSize : defaultArrowSize;
    const [arrowDegree, arrowWidth] = arrowSizes[arrowSize];
    const initialToolTipMargins = toolTipMargins[pointerDirection];
    const calculatedToolTipMargins = initialToolTipMargins.map(margin => margin > 0 ? (margin + arrowWidth) : margin );
    const toolTipMargin = theme.spacing(...calculatedToolTipMargins);

    return toolTipMargin;
};

const buildToolTipContainerStyle = ({theme, pointerDirection, pointerSize}) => {
    const toolTipMargins = buildToolTipMargins(theme, pointerDirection, pointerSize);
    const bottomPosition = theme.spacing(2);
    const containerPositions = {
        left: {
            left: '100%',
            bottom: bottomPosition,
            margin: toolTipMargins
        },
        right: {
            right: '100%',
            bottom: bottomPosition,
            margin: toolTipMargins
        },
        up: {
            top: '100%',
            margin: toolTipMargins
        },
        down: {
            bottom: '100%',
            margin: toolTipMargins
        }
    };
    const toolTipContainerStyle = containerPositions[pointerDirection];

    return toolTipContainerStyle;
};

export {
    buildToolTipArrowStyle,
    buildToolTipContainerStyle
};