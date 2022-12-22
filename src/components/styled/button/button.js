import styled from 'styled-components';
import { buildHoverPalette, buildPalette, buildTypography } from '../styledUtils';

export const Button = styled.button`
    padding: 10px 32px;
    border-radius: 3px;

    /* Style overrides last */
    ${buildPalette}
    ${buildHoverPalette}
    ${(props) => buildTypography(props, 'button')}
`;