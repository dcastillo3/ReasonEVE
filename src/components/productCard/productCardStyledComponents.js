import { Icon } from '@mui/material';
import styled from 'styled-components';
import { Box, Button, Card, FlexBoxColumn, Image } from '../styled';

const ProductCard = styled(Card)`
`;

const ProductCardFlexBoxColumnContainer = styled(FlexBoxColumn)`
    height: 100%;
`;

const ProductCardImageContainer = styled(Box)`
    position: relative;
    width: 100%;

    &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
`;

const ProductCardImage = styled(Image)`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${({theme}) => theme.spacing(1, 1, 0, 0)};
    object-fit: cover;
`;

const ProductCardPlayButton = styled(Button)`
    background: transparent !important;
`;

const ProductCardCartButtonIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.caption.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

const ProductCardPlayButtonIcon = styled(Icon)`
    color: ${({theme}) => theme.palette.backgroundLight.main} !important;
    font-size: ${({theme, $isDesktop}) => !$isDesktop ? theme.typography.h2.fontSize : theme.typography.h1.fontSize} !important;
`;

export {
    ProductCard,
    ProductCardFlexBoxColumnContainer,
    ProductCardImageContainer,
    ProductCardImage,
    ProductCardPlayButton,
    ProductCardCartButtonIcon,
    ProductCardPlayButtonIcon
};