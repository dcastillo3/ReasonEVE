import { productCardButtonStatus } from "./productConsts";

const getProductCardButtonText = (product, cart) => {
    const { active } = product;

    //Product is active
    if (active) {     
        const productInCart = cart.some(({ productName }) => productName === product.productName);
        const productCardButtonText = productInCart
            ? productCardButtonStatus.incart
            : productCardButtonStatus.available;

        return productCardButtonText;
        //Exclusive product has been sold
    } else return productCardButtonStatus.sold;
};

const getProductCardButtonVariant = (product, cart) => {
    const productInCart = cart.some(({ productName }) => productName === product.productName);
    const productCardButtonVariant = productInCart ? 'background' : 'primary';

    return productCardButtonVariant;
};

export {
    getProductCardButtonText,
    getProductCardButtonVariant
};