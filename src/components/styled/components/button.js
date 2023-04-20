import styled from 'styled-components';
import { buildButtonSize, buildHoverPalette, buildPalette, buildSpacing, buildTypography } from '../styledUtils';

export const Button = styled.button`
    border-radius: 3px;

    /* Style overrides last */
    ${buildButtonSize}
    ${buildPalette}
    ${buildHoverPalette}
    ${buildSpacing}
    ${(props) => buildTypography(props, 'button')}
`;