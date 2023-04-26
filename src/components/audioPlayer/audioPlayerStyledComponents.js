import styled from 'styled-components';
import { Icon } from "@mui/material";
import { Box } from '../styled';

const AudioPlayerContainer = styled(Box)`
    position: relative;
    z-index: ${({theme}) => theme.zIndex.appBar};
`;

const AudioPlayerCartButtonIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.caption.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

export {
    AudioPlayerContainer,
    AudioPlayerCartButtonIcon
};