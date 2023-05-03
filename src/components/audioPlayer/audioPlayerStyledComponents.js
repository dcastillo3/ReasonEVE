import styled from 'styled-components';
import { Icon } from "@mui/material";
import { Box, Button, FlexBox } from '../styled';

const AudioPlayerContainer = styled(Box)`
    position: relative;
    z-index: ${({theme}) => theme.zIndex.appBar};

    &> div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.css-5f91ah-MuiPaper-root > div.MuiBox-root.css-v9o3i7 > div.MuiBox-root.css-r8kwtw {
        ${({theme, $isDesktop}) => !$isDesktop && `width: ${theme.spacing(20)};`}
    }

    &> div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.css-5f91ah-MuiPaper-root > div.MuiBox-root.css-v9o3i7 > div.MuiBox-root.css-r8kwtw > div.MuiBox-root.css-1am57kc {
        text-overflow: ellipsis;
    }
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