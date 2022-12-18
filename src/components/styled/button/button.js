import styled from 'styled-components';
import { buildHoverPalette, buildPalette, buildStyles } from '../styledUtils';

export const Button = styled.button`
    font-size: 1em;
    padding: 10px 32px;
    border-radius: 3px;
    border: none;

    /* Style overrides last */
    ${buildPalette}
    ${buildHoverPalette}
    ${buildStyles}

    &:focus {
        outline: none;
    }
`;