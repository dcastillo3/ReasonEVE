import React from 'react';
import { Span, TitleMedium } from '../../styled';
import { HeadingContainer } from './headingStyledComponents';
import { formatHeading } from './headingUtils';

function Heading({heading, variant}) {
    const {
        headingFirstHalf,
        secondToLastWord,
        lastWord
    } = formatHeading(heading);

    return (
        <HeadingContainer m={[10, 1]} $wrap={true}>
            <TitleMedium>
                {headingFirstHalf} <Span rotate={'right'} p={[1, 3]} variant={variant}>{secondToLastWord}</Span> {lastWord}
            </TitleMedium>
        </HeadingContainer>
    );
};

export default Heading;