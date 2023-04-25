import React, { useContext } from "react";
import _ from "lodash";
import { Heading } from "../../common";
import { Box, FlexBoxColumn } from "../../styled";
import { CartContext } from "../../../context";
import CartCheckoutButton from "./components/cartCheckoutButton";
import CartLineItem from "./components/cartLineItem";
import CartTotal from "./components/cartTotal";
import CartEmpty from "./components/cartEmpty";

function Cart() {
    const { cart, removeCartItem, updateCartItem, checkoutCart } = useContext(CartContext);

    const renderCartLineItems = !_.isEmpty(cart) && cart.map((product, idx) => (
        <CartLineItem key={idx} product={product} removeCartItem={removeCartItem} updateCartItem={updateCartItem} />
    ));

    const stockedCart = (
        <FlexBoxColumn>
            {renderCartLineItems}

            <CartTotal cart={cart} />

            <CartCheckoutButton checkoutCart={checkoutCart} />
        </FlexBoxColumn>
    );

    const emptyCart = (
        <CartEmpty />
    );

    const renderCart = _.isEmpty(cart) ? emptyCart : stockedCart;

    return (
        <Box m={[0, 8]}>
            <Heading headingStyle={'circle'} heading={`Start your next project`} />

            {renderCart}
        </Box>
    );
};

export default Cart;