import styled from 'styled-components';
import { Box, FlexBox, FlexBoxColumn, Image } from '../styled';

const CartSummaryContainer = styled(FlexBoxColumn)`
    width: ${({theme}) => theme.spacing(80)};
    max-height: ${({theme}) => theme.spacing(95)};
    overflow-y: auto;
`;

const CartSummaryLineItemImageContainer = styled(Box)`
    position: relative;
    width: ${({theme}) => theme.spacing(14)};
    align-items: flex-start;

    &:after {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
`;

const CartSummaryLineItemImage = styled(Image)`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${({theme}) => theme.spacing(1)};
    object-fit: cover;
`;

const CartSummaryLineItemDetails = styled(FlexBoxColumn)`
    max-width: ${({theme}) => theme.spacing(26)};
    flex: 1;
`;

const CartSummaryLineItemPriceContainer = styled(FlexBoxColumn)`
    flex: 1;
    align-items: flex-end;
`;

const CartSummaryButtonContainer = styled(FlexBox)`
    justify-content: flex-end;
`;

export {
    CartSummaryContainer,
    CartSummaryLineItemImageContainer,
    CartSummaryLineItemImage,
    CartSummaryLineItemDetails,
    CartSummaryLineItemPriceContainer,
    CartSummaryButtonContainer
};