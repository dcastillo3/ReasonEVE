import styled from 'styled-components';
import { buildHoverPalette, buildPalette, buildStyles } from '../styledUtils';

export const Text = styled.p`
    /* Style overrides last */
    ${buildStyles}
`;

export const TextCaption = styled(Text)`
`;