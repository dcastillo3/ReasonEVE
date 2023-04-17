import { useState } from "react";
import { apis, initialStates, localStorageKeys } from "../../utils/consts";
import { formatCartItem } from "../../utils/reactUtils";
import { getStateFromLocalStorage, removeLocalStorageState, setLocalStorageState } from "../../utils/helpers";
import axios from "axios";
import { formatCheckoutData } from "../hookUtils";

function useCart() {
    const [cart, setCart] = useState(() => getStateFromLocalStorage(localStorageKeys.cart));

    const checkoutCart = async () => {
        try {
            const checkoutData = formatCheckoutData(cart);
            const res = await axios.post(apis.checkout, checkoutData);

            if (!res?.data?.success) {
                const { err = {} } = res.data;

                console.error(err);
            } else if (res?.data?.success) {
                //Redirect to Stripe checkout url
                window.location.href = res.data.data;
            };
        } catch (err) {
            console.error(err.response);
        };
    };

    const addCartItem = (productPricingItem, product) => {
        const newCartItem = formatCartItem(productPricingItem, product);
        //Currently customers can checkout one of each item per cart. Will need to change if quantity enabled
        const filteredCart = cart.filter(({ productName }) => productName !== newCartItem.productName);
        const newCart = [...filteredCart, newCartItem];

        // Persist cart in local storage
        setLocalStorageState(localStorageKeys.cart, newCart);

        setCart(newCart);
    };

    const removeCartItem = product => {
        const newCart = cart.filter(({productName}) => productName !== product.productName);

        // Persist cart in local storage
        setLocalStorageState(localStorageKeys.cart, newCart);

        setCart(newCart);
    };

    const updateCartItem = (productPricingItem, product) => {
        const newCartItem = formatCartItem(productPricingItem, product);
        const newCart = cart.map(cartItem =>
            (cartItem.productName === newCartItem.productName) ? newCartItem : cartItem);

        // Persist cart in local storage
        setLocalStorageState(localStorageKeys.cart, newCart);

        setCart(newCart);
    };

    const clearCart = () => {
        //Remove cart from local storage
        removeLocalStorageState(localStorageKeys.cart);

        // Reset cart state
        setCart(initialStates.cart);
    };

    return {
        cart,
        checkoutCart,
        addCartItem,
        removeCartItem,
        updateCartItem,
        clearCart
    };
};

export default useCart;