import styled from 'styled-components';
import { Icon } from "@mui/material";

const AudioPlayerCartButtonIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.caption.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

export {
    AudioPlayerCartButtonIcon
};