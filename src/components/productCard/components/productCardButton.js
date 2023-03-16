import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToolTip } from '../../common';
import { Button } from '../../styled';
import ProductCardButtonMenu from './productCardButtonMenu';
import { ProductCardCartButtonIcon } from '../productCardStyledComponents';

function ProductCardButton({ trackPrices }) {

    return (
        <ToolTip variant={'info'} pointerDirection={'left'} toolTipComponent={() => <ProductCardButtonMenu prices={trackPrices} />}>
            <Button variant={"primary"} m={[1, 1, 1, 0]} size={"small"}>
                <ProductCardCartButtonIcon component={ShoppingCartIcon} /> Add to Cart
            </Button>
        </ToolTip>
    );
};

export default ProductCardButton;