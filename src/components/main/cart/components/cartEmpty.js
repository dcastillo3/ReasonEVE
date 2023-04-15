import React from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, FlexBoxColumn, Text, TitleSmall } from "../../../styled";
import { CartEmptyIcon } from "../cartStyledComponents";

function CartEmpty() {
    return (
        <FlexBoxColumn center={'center'} >
            <CartEmptyIcon component={ShoppingCartOutlinedIcon} />

            <Box m={[1, 0]}>
                <TitleSmall>Your cart is empty</TitleSmall>
            </Box>

            <Box m={[4, 0]}>
                <Text>When you add an item to your cart, it will appear here</Text>
            </Box>
        </FlexBoxColumn>
    );
};

export default CartEmpty;