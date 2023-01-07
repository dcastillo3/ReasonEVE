import styled from 'styled-components';
import { buildHoverPalette, buildPalette, buildSpacing, buildTypography } from '../styledUtils';

export const Button = styled.button`
    padding: 10px 32px;
    border-radius: 3px;

    /* Style overrides last */
    ${buildPalette}
    ${buildHoverPalette}
    ${buildSpacing}
    ${(props) => buildTypography(props, 'button')}
`;