import styled from 'styled-components';
import { body2, caption } from '../styledConsts';
import { buildTypography } from '../styledUtils';

export const Text = styled.p`
    ${(props) => buildTypography(props)}
`;

export const TextSmall = styled.p`
    ${(props) => buildTypography(props, body2)}
`;

export const TextCaption = styled(Text)`
    ${(props) => buildTypography(props, caption)}
`;