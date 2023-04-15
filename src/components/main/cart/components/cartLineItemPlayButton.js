import React from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CartLineItemPlayButtonIcon, CartLineItemPlayButton as CartLineItemPlayButtonStyled } from '../cartStyledComponents';

function CartLineItemPlayButton() {
    return (
        <CartLineItemPlayButtonStyled p={[0, 0]}>
            <CartLineItemPlayButtonIcon component={PlayCircleIcon} />
        </CartLineItemPlayButtonStyled>
    );
};

export default CartLineItemPlayButton;