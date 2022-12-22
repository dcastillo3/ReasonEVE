import styled from 'styled-components';
import { buildTypography } from '../styledUtils';

export const Text = styled.p`
    ${(props) => buildTypography(props)}
`;

export const TextCaption = styled(Text)`
    ${(props) => buildTypography(props, 'caption')}
`;