import { Icon } from '@mui/material';
import styled from 'styled-components';
import { Button, FlexBox, FlexBoxColumn, Image } from '../../styled';

const CartLineItemImage = styled(Image)`
    width: ${({theme}) => theme.spacing(35)};
    height: ${({theme}) => theme.spacing(35)};
    border-radius: ${({theme}) => theme.spacing(1)};
`;

const CartLineItemDetailsContainer = styled(FlexBoxColumn)`
    flex: 1;
`;

const CartLineItemDetails = styled(FlexBoxColumn)`
    flex: 1;
`;

const CartLineItemRemoveButtonContainer = styled(FlexBoxColumn)`
    flex: 1;
`;

const CartLineItemEndContainer = styled(FlexBoxColumn)`
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
    font-size: ${({theme}) => theme.typography.h2.fontSize} !important;
`;

const CartEmptyIcon = styled(Icon)`
    color: ${({theme}) => theme.palette.info.main} !important;
    font-size: ${({theme}) => theme.typography.h1.fontSize} !important;
`;

export {
    CartLineItemImage,
    CartLineItemDetailsContainer,
    CartLineItemDetails,
    CartLineItemEndContainer,
    CartLineItemRemoveButtonContainer,
    CartLineItemRemoveIcon,
    CartTotalContainer,
    CartCheckoutButtonContainer,
    CartLineItemPlayButton,
    CartLineItemPlayButtonIcon,
    CartEmptyIcon
};