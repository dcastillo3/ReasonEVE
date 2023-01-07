import styled from 'styled-components';
import { buildHoverPalette, buildPalette, buildSpacing } from '../styledUtils';

export const Box = styled.div`
    /* Style overrides last */
    ${buildSpacing}
`;

export const Card = styled(Box)`
    /* Style overrides last */
    ${buildPalette}
    ${props => props.hover ? buildHoverPalette(props) : ''}
`;