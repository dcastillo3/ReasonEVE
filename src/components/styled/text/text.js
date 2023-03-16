import styled from 'styled-components';
import { body2, caption } from '../styledConsts';
import { buildPalette, buildSpacing, buildTypography } from '../styledUtils';

export const Text = styled.p`
    ${(props) => buildTypography(props)}
`;

export const TextSmall = styled.p`
    ${(props) => buildTypography(props, body2)}
`;

export const TextCaption = styled.p`
    ${(props) => buildTypography(props, caption)}
`;

export const Span = styled.span`
    display: inline-block;
    ${({rotate}) => rotate === 'right' && 'rotate: 8deg;'}
    ${({rotate}) => rotate === 'left' && 'rotate: -8deg;'}

    /* Style overrides last */
    ${buildPalette}
    ${buildSpacing}
`;