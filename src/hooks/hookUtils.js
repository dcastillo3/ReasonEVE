import { protectedRoutes } from "../routes/routesConsts";

const formatCheckoutData = cart => {
    const { path } = protectedRoutes.find(({id}) => id === 6);

    const formattedCheckoutData = {
        products: cart,
        successUrl: `${window.location.origin}${path}`,
        cancelUrl: `${window.location.href}`
    };

    return formattedCheckoutData;
};

export {
    formatCheckoutData
};