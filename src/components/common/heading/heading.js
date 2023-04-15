import React from 'react';
import { TitleMedium } from '../../styled';
import { HeadingContainer } from './headingStyledComponents';
import { buildStyledWord, formatHeading } from './headingUtils';

function Heading({heading, variant, headingStyle}) {
    const {
        headingFirstHalf,
        secondToLastWord,
        lastWord
    } = formatHeading(heading);

    const renderStyledWord = buildStyledWord(headingStyle, variant, secondToLastWord);

    return (
        <HeadingContainer m={[10, 0]} $wrap={true}>
            <TitleMedium>
                {headingFirstHalf} {renderStyledWord} {lastWord}
            </TitleMedium>
        </HeadingContainer>
    );
};

export default Heading;