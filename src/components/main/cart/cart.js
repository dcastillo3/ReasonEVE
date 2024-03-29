import React, { useContext } from "react";
import _ from "lodash";
import { Heading, headingProps } from "../../common";
import { Box, FlexBoxColumn, variantProps } from "../../styled";
import { CartContext } from "../../../context";
import CartCheckoutButton from "./components/cartCheckoutButton";
import CartLineItem from "./components/cartLineItem";
import CartTotal from "./components/cartTotal";
import CartEmpty from "./components/cartEmpty";
import { useMediaQuery } from "../../../hooks";
import { CartLineItemDivider } from "./cartStyledComponents";
import { cartHeading } from "./cartConsts";

function Cart() {
    const { isDesktop } = useMediaQuery();
    const { cart, removeCartItem, updateCartItem, checkoutCart } = useContext(CartContext);
    const cartMargin = isDesktop ? [0, 8] : [0, 5];

    const renderCartLineItems = !_.isEmpty(cart) && cart.map((product, idx) => {
        const nextProduct = (idx + 1) < cart.length;
        const renderCartLineItemDivider = !isDesktop && nextProduct && (
            <CartLineItemDivider $variant={variantProps.backgroundLight} />
        );

        return (
            <Box key={idx}>
                <CartLineItem product={product} removeCartItem={removeCartItem} updateCartItem={updateCartItem} isDesktop={isDesktop} />

                {renderCartLineItemDivider}
            </Box>
        );
    });

    const stockedCart = (
        <FlexBoxColumn>
            {renderCartLineItems}

            <Box $m={cartMargin}>
                <CartTotal cart={cart} />

                <CartCheckoutButton checkoutCart={checkoutCart} isDesktop={isDesktop} />
            </Box>
        </FlexBoxColumn>
    );

    const emptyCart = (
        <CartEmpty />
    );

    const renderCart = _.isEmpty(cart) ? emptyCart : stockedCart;

    return (
        <FlexBoxColumn>
            <Box $m={cartMargin}>
                <Heading headingStyle={headingProps.headingStyle.circle} heading={cartHeading} />
            </Box>

            {renderCart}
        </FlexBoxColumn>
    );
};

export default Cart;