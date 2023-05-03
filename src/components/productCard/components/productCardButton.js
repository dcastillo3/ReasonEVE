import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToolTip } from '../../common';
import { Button, FlexBox } from '../../styled';
import ProductCardButtonMenu from './productCardButtonMenu';
import { ProductCardCartButtonIcon } from '../productCardStyledComponents';
import { getCartButtonText, getCartButtonVariant } from '../../../utils/reactUtils';

function ProductCardButton({ product, cart, addCartItem, isDesktop }) {
    const [showProductCardButtonToolTip, setShowProductCardButtonToolTip] = useState(false);
    const { productPricing = [] } = product;
    const buttonVariant = getCartButtonVariant(product, cart)
    const buttonText = isDesktop && getCartButtonText(product, cart);

    const handleToggleProductCardButtonToolTip = () => {
        setShowProductCardButtonToolTip(!showProductCardButtonToolTip);
    };

    const productCardButton = (
        <Button
            onClick={() => addCartItem(productPricing[0], product)}
            $variant={buttonVariant}
            $m={[1, 1, 1, 0]}
            $size={'small'}
        >
            <ProductCardCartButtonIcon component={ShoppingCartIcon} /> {buttonText}
        </Button>
    );

    const productCardToolTipButton = (
        <ToolTip
            variant={'info'}
            pointerDirection={'left'}
            showToolTip={showProductCardButtonToolTip}
            handleToggleToolTip={handleToggleProductCardButtonToolTip}
            toolTipComponent={() => <ProductCardButtonMenu
                cart={cart}
                addCartItem={addCartItem}
                product={product}
                handleToggleToolTip={handleToggleProductCardButtonToolTip}
            />}
        >
            <Button $variant={buttonVariant} $m={[1, 1, 1, 0]} $size={'small'}>
                <ProductCardCartButtonIcon component={ShoppingCartIcon} /> {buttonText}
            </Button>
        </ToolTip>
    );

    const renderProductCardButton = productPricing.length > 1 ? productCardToolTipButton : productCardButton;

    return (
        <FlexBox>
            {renderProductCardButton}
        </FlexBox>
    );
};

export default ProductCardButton;