import React from 'react';
import { Box, Button, FlexBoxColumn, Label, buttonProps } from '../../styled';
import { formatPriceDisplay } from '../../../utils/reactUtils';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AudioPlayerCartButtonIcon } from '../audioPlayerStyledComponents';

function AudioPlayerButtonMenu({ product, addCartItem, cart, handleToggleToolTip }) {
    const { productPricing } = product;

    const handleAddCartItem = (productPricingItem, product) => {
        addCartItem(productPricingItem, product);

        handleToggleToolTip();
    };

    const renderPriceButtons = productPricing.map((productPricingItem, idx) => {
        const { id, price, purchaseType } = productPricingItem;
        const productInCart = cart.some(({ selectedPricing }) => selectedPricing.id === id);
        const buttonText = formatPriceDisplay(price);
        const buttonVariant = productInCart ? buttonProps.variant.background : buttonProps.variant.secondary;
        const handlePricingItemButtonClick = productInCart ? null : () => handleAddCartItem(productPricingItem, product);

        const inCartIcon = (
            <AudioPlayerCartButtonIcon component={ShoppingCartIcon} />
        );

        const renderButtonContent = productInCart ? inCartIcon : buttonText;

        return (
            <FlexBoxColumn $m={[2, 0]} key={idx}>
                <Label>{purchaseType}:</Label>
                <Button
                    disabled={productInCart}
                    onClick={handlePricingItemButtonClick}
                    $variant={buttonVariant}
                    $m={[1, 0]}
                    $size={buttonProps.size.small}
                >
                    {renderButtonContent}
                </Button>
            </FlexBoxColumn>
        );
    });

    return (
        <Box $p={[2, 4]}>
            <FlexBoxColumn>
                {renderPriceButtons}
            </FlexBoxColumn>
        </Box>
    );
};

export default AudioPlayerButtonMenu;