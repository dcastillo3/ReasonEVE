import React from "react";
import { Span } from "../../styled";
import { HeadingCircleContainer, HeadingCircleContent, HeadingCircleDummySquare } from "./headingStyledComponents";

const formatHeading = heading => {
    const headingArr = heading.split(' ');
    const headingFirstWordsArr = headingArr.slice(0, -2);
    const headingFirstWords = headingFirstWordsArr.join(' ');
    const [secondToLastWord, lastWord] = headingArr.slice(-2);
    const formattedHeading = {
        headingFirstWords,
        secondToLastWord,
        lastWord
    };

    return formattedHeading;
};

const buildStyledWord = (headingStyle, variant, secondToLastWord, isDesktop) => {
    const defaultStyle = (
        <Span $rotate={'right'} p={[1, 3]} variant={variant}>{secondToLastWord}</Span>
    );

    switch (headingStyle) {
        case 'circle': {
            const headingCirclePadding = isDesktop ? [3] : [2];

            return (
                <HeadingCircleContainer variant={variant} $rotate={'right'} p={headingCirclePadding}>
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