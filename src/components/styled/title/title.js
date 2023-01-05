import styled from 'styled-components';
import { h1, h2, h3 } from '../styledConsts';
import { buildTypography } from '../styledUtils';

export const Title = styled.h1`
    ${(props) => buildTypography(props, h1)}
`;

export const TitleMedium = styled.h2`
    ${(props) => buildTypography(props, h2)}
`;

export const TitleSmall = styled.h3`
    ${(props) => buildTypography(props, h3)}
`;