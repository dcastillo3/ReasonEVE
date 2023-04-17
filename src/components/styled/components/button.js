import styled from 'styled-components';
import { buildButtonSize, buildHoverPalette, buildPalette, buildSpacing, buildTypography } from '../styledUtils';

export const Button = styled.button`
    border-radius: 3px;

    /* Style overrides last */
    ${buildPalette}
    ${buildHoverPalette}
    ${buildSpacing}
    ${buildButtonSize}
    ${(props) => buildTypography(props, 'button')}
`;