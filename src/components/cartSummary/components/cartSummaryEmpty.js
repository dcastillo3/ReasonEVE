import React from "react";
import { FlexBoxColumn, SubTitle } from "../../styled";

function CartSummaryEmpty() {
    return (
        <FlexBoxColumn $center={'center'} $p={[2, 4]}>
            <SubTitle>Your cart is empty</SubTitle>
        </FlexBoxColumn>
    );
};

export default CartSummaryEmpty;