import styled from 'styled-components';
import { Box } from '../../styled';

const OverlayContainer = styled(Box)`
    position: absolute;
    z-index: ${({theme}) => theme.zIndex.fab};
`;

export {
    OverlayContainer
};