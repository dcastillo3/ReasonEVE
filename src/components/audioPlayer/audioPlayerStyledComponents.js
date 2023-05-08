import styled from 'styled-components';
import { Icon } from "@mui/material";
import { Box, Button, Card } from '../styled';

const AudioPlayerContainer = styled(Box)`
    position: relative;
    z-index: ${({theme}) => theme.zIndex.appBar};

    /* Needs to be updated if drawer enabled/disabled */
    &> div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.css-zo9pk0-MuiPaper-root > div > div.MuiBox-root.css-r8kwtw {
        ${({theme, $isDesktop}) => !$isDesktop && `width: ${theme.spacing(20)};`}
    }

    /* Needs to be updated if drawer enabled/disabled */
    &> div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.css-zo9pk0-MuiPaper-root > div > div.MuiBox-root.css-r8kwtw > div {
        text-overflow: ellipsis;
    }
`;

const AudioPlayerCartButtonContainer = styled(Card)`
    position: fixed;
    bottom: ${({theme}) => theme.spacing(15)};
    left: 0;
    right: 0;
    border-bottom: ${({theme}) => theme.palette.background.main} solid 1px;
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