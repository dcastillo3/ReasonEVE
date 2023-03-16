import { Icon } from '@mui/material';
import styled from 'styled-components';
import { Button, Card, Image } from '../styled';

const ProductCard = styled(Card)`
    width: ${({theme}) => theme.spacing(87)};
`;

const ProductCardImage = styled(Image)`
    width: ${({theme}) => theme.spacing(87)};
    height: ${({theme}) => theme.spacing(87)};
    border-radius: ${({theme}) => theme.spacing(1, 1, 0, 0)};
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
    font-size: ${({theme}) => theme.typography.h1.fontSize} !important;
`;

export {
    ProductCard,
    ProductCardImage,
    ProductCardPlayButton,
    ProductCardCartButtonIcon,
    ProductCardPlayButtonIcon
};