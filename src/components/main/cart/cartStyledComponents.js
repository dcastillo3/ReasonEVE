import { Icon } from '@mui/material';
import styled from 'styled-components';
import { Box, Button, FlexBox, FlexBoxColumn, Image, Text, TitleSmall } from '../../styled';

const CartLineItemImageContainer = styled(Box)`
    position: relative;
    width: 20vw;
    max-width: ${({theme}) => theme.spacing(35)};
    min-width: ${({theme}) => theme.spacing(16)};

    &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
`;

const CartLineItemImage = styled(Image)`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${({theme}) => theme.spacing(1)};
    object-fit: cover;
`;

const CartLineItemDivider = styled(Box)`
    border-bottom: ${({theme}) => theme.spacing(1)} dashed ${({theme, $variant}) => theme.palette[$variant].main};
`;

const CartLineItemDetailsContainer = styled(FlexBoxColumn)`
`;

const CartLineItemDetails = styled(FlexBoxColumn)`
    flex: 1;
`;

const CartLineItemRemoveButtonContainer = styled(FlexBoxColumn)`
    flex: 1;
`;

const CartLineItemStartContainer = styled(FlexBoxColumn)`
    align-items: flex-start;
`;

const CartLineItemEndContainer = styled(FlexBoxColumn)`
    flex: 1;
    align-items: flex-end;
`;

const CartLineItemRemoveIcon = styled(Icon)`
    font-size: ${({theme}) => theme.typography.caption.fontSize} !important;
    position: relative !important;
    top: 3px !important;
`;

const CartTotalContainer = styled(FlexBox)`
    justify-content: flex-end;
`;

const CartCheckoutButtonContainer = styled(FlexBox)`
    justify-content: flex-end;
`;

const CartLineItemPlayButton = styled(Button)`
    background: transparent !important;
`;

const CartLineItemPlayButtonIcon = styled(Icon)`
    color: ${({theme}) => theme.palette.backgroundLight.main} !important;
    font-size: ${({theme, $isDesktop}) => 
        $isDesktop ? theme.typography.h2.fontSize : theme.typography.h4.fontSize} !important;
`;

const CartEmptyIcon = styled(Icon)`
    color: ${({theme}) => theme.palette.info.main} !important;
    font-size: ${({theme}) => theme.typography.h1.fontSize} !important;
`;

const CartEmptyTitle = styled(TitleSmall)`
    text-align: center;
`;

const CartEmptyText = styled(Text)`
    text-align: center;
    max-width: ${({theme}) => theme.spacing(54)};
`;

export {
    CartLineItemImageContainer,
    CartLineItemImage,
    CartLineItemDivider,
    CartLineItemDetailsContainer,
    CartLineItemDetails,
    CartLineItemStartContainer,
    CartLineItemEndContainer,
    CartLineItemRemoveButtonContainer,
    CartLineItemRemoveIcon,
    CartTotalContainer,
    CartCheckoutButtonContainer,
    CartLineItemPlayButton,
    CartLineItemPlayButtonIcon,
    CartEmptyIcon,
    CartEmptyTitle,
    CartEmptyText
};