import { formatPriceDisplay } from "../../../utils/reactUtils";

const getCartTotal = cart => {
    const cartNumTotal = cart.reduce((prevCartTotal, { selectedPricing }) => prevCartTotal + +selectedPricing.price, 0);
    const cartStrTotal = cartNumTotal.toFixed(2);
    const cartTotal = formatPriceDisplay(cartStrTotal);

    return cartTotal;
};

export {
    getCartTotal
};