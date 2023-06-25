import React from 'react';
import { CartIconOverlayButton, CartIconOverlayContainer } from '../headerStyledComponents';
import { Box, cardProps } from '../../styled';

function CartIconOverlay({ cartItemCount, handleCartClick }) {
    const renderCartIconOverlay = cartItemCount > 0 && (
        <CartIconOverlayContainer $variant={cardProps.variant.success}>
            {cartItemCount}
        </CartIconOverlayContainer>
    );

    return (
        <Box>
            <CartIconOverlayButton onClick={handleCartClick}>
                {renderCartIconOverlay}
            </CartIconOverlayButton>
        </Box>
    );
};

export default CartIconOverlay;