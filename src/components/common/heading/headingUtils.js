import React from "react";
import { Span } from "../../styled";
import { HeadingCircleContainer, HeadingCircleContent, HeadingCircleDummySquare } from "./headingStyledComponents";

const formatHeading = heading => {
    const headingArr = heading.split(' ');
    const headingFirstHalfArr = headingArr.slice(0, -2);
    const headingFirstHalf = headingFirstHalfArr.join(' ');
    const [secondToLastWord, lastWord] = headingArr.slice(-2);
    const formattedHeading = {
        headingFirstHalf,
        secondToLastWord,
        lastWord
    };

    return formattedHeading;
};

const buildStyledWord = (headingStyle, variant, secondToLastWord) => {
    const defaultStyle = (
        <Span $rotate={'right'} p={[1, 3]} variant={variant}>{secondToLastWord}</Span>
    );

    switch (headingStyle) {
        case 'circle': {
            return (
                <HeadingCircleContainer variant={variant} $rotate={'right'} p={[3]}>
                    <HeadingCircleDummySquare />
                    <HeadingCircleContent $content={secondToLastWord} />
                </HeadingCircleContainer>
            );
        };
        
        case 'square': {
            return defaultStyle;
        };
        default: {
            return defaultStyle;
        };
    };
};

export {
    formatHeading,
    buildStyledWord
};