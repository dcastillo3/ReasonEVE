import React from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FlexBox, FlexBoxColumn } from "../../../styled";
import { CartEmptyIcon, CartEmptyText, CartEmptyTitle } from "../cartStyledComponents";

function CartEmpty() {
    return (
        <FlexBoxColumn center={'center'} >
            <CartEmptyIcon component={ShoppingCartOutlinedIcon} />

            <FlexBox center={true} m={[1, 5]}>
                <CartEmptyTitle>Your cart is empty</CartEmptyTitle>
            </FlexBox>

            <FlexBox center={true} m={[4, 5]}>
                <CartEmptyText>When you add an item to your cart, it will appear here</CartEmptyText>
            </FlexBox>
        </FlexBoxColumn>
    );
};

export default CartEmpty;