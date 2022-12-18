import styled from 'styled-components';
import { buildHoverPalette, buildPalette, buildStyles } from '../styledUtils';

export const Box = styled.div`
    /* Style overrides last */
    ${buildStyles}
`;

export const Card = styled(Box)`
    /* Style overrides last */
    ${buildPalette}
    ${props => props.hover ? buildHoverPalette(props) : ''}
`;