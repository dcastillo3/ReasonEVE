import React from "react";
import { Button } from "../../../styled";
import { CartLineItemRemoveButtonContainer, CartLineItemRemoveIcon } from "../cartStyledComponents";
import NotInterestedIcon from '@mui/icons-material/NotInterested';

function CartLineItemRemoveButton({product, removeCartItem}) {
    return (
        <CartLineItemRemoveButtonContainer>
            <Button size={'small'} variant={'warning'} onClick={() => removeCartItem(product)}>
                <CartLineItemRemoveIcon component={NotInterestedIcon} />
            </Button>
        </CartLineItemRemoveButtonContainer>
    );
};

export default CartLineItemRemoveButton;