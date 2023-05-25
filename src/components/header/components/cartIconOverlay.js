import React from 'react';
import { CartIconOverlayContainer } from '../headerStyledComponents';
import { Box, cardProps } from '../../styled';

function CartIconOverlay({ cartItemCount }) {
    const renderCartIconOverlay = cartItemCount > 0 && (
        <CartIconOverlayContainer $variant={cardProps.variant.success}>
            {cartItemCount}
        </CartIconOverlayContainer>
    );

    return (
        <Box>
            {renderCartIconOverlay}
        </Box>
    );
};

export default CartIconOverlay;