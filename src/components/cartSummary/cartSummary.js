import React from "react";
import _ from "lodash";
import CartSummaryLineItem from "./components/cartSummaryLineItem";
import CartSummaryEmpty from "./components/cartSummaryEmpty";
import { Box, FlexBoxColumn } from "../styled";
import { CartSummaryContainer } from "./cartSummaryStyledComponents";
import CartSummaryButton from "./components/cartSummaryButton";

function CartSummary({handleToggleCartSummary, isDesktop, cart, path, navigate}) {
    const handleViewCart = () => {
        navigate(path);
        handleToggleCartSummary();
    };

    const renderCartSummaryLineItems = !_.isEmpty(cart) && cart.map((product, idx) => (
        <Box key={idx}>
            <CartSummaryLineItem product={product} />
        </Box>
    ));

    const stockedCart = (
        <FlexBoxColumn>
            {renderCartSummaryLineItems}

            <CartSummaryButton viewCart={handleViewCart} />
        </FlexBoxColumn>
    );

    const emptyCart = (
        <CartSummaryEmpty />
    );

    const renderCartSummary = _.isEmpty(cart) ? emptyCart : stockedCart;

    return (
        <CartSummaryContainer $isDesktop={isDesktop}>
            {renderCartSummary}
        </CartSummaryContainer>
    );
};

export default CartSummary;