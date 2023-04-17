import React from 'react';
import { Box, Button, FlexBoxColumn, Label } from '../../styled';
import { ProductCardCartButtonIcon } from '../productCardStyledComponents';
import { formatPriceDisplay } from '../../../utils/reactUtils';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductCardButtonMenu({ product, addCartItem, cart, handleToggleToolTip }) {
    const { productPricing } = product;

    const handleAddCartItem = (productPricingItem, product) => {
        addCartItem(productPricingItem, product);

        handleToggleToolTip();
    };

    const renderPriceButtons = productPricing.map((productPricingItem, idx) => {
        const { id, price, purchaseType } = productPricingItem;
        const productInCart = cart.some(({ selectedPricing }) => selectedPricing.id === id);
        const buttonText = productInCart ? '' : formatPriceDisplay(price);
        const buttonVariant = productInCart ? 'background' : 'secondary';
        const handlePricingItemButtonClick = productInCart ? null : () => handleAddCartItem(productPricingItem, product);

        const renderInCartIcon = productInCart === true && (
            <ProductCardCartButtonIcon component={ShoppingCartIcon} />
        );

        return (
            <FlexBoxColumn m={[2, 0]} key={idx}>
                <Label>{purchaseType}:</Label>
                <Button
                    disabled={productInCart}
                    onClick={handlePricingItemButtonClick}
                    variant={buttonVariant}
                    m={[1, 0]}
                    size={'small'}
                >
                    {renderInCartIcon}{buttonText}
                </Button>
            </FlexBoxColumn>
        );
    });

    return (
        <Box>
            <FlexBoxColumn>
                {renderPriceButtons}
            </FlexBoxColumn>
        </Box>
    );
};

export default ProductCardButtonMenu;