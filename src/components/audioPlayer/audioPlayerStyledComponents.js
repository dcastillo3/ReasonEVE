import styled from 'styled-components';
import { Icon } from "@mui/material";
import { Box, Button, FlexBox } from '../styled';

const AudioPlayerContainer = styled(Box)`
    position: relative;
    z-index: ${({theme}) => theme.zIndex.appBar};
`;

const AudioPlayerCartButtonContainer = styled(FlexBox)`
    position: fixed;
    bottom: ${({theme}) => theme.spacing(15)};
    left: ${({theme}) => theme.spacing(2)};
`;

const AudioPlayerCartButtonIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.caption.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

const AudioPlayerCartCustomButton = styled(Button)`
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
`;

export {
    AudioPlayerContainer,
    AudioPlayerCartButtonContainer,
    AudioPlayerCartButtonIcon,
    AudioPlayerCartCustomButton
};