import styled from 'styled-components';
import { buildHoverPalette, buildPalette } from '../styledUtils';

export const Box = styled.div`
`;

export const Card = styled(Box)`
    /* Style overrides last */
    ${buildPalette}
    ${props => props.hover ? buildHoverPalette(props) : ''}
`;