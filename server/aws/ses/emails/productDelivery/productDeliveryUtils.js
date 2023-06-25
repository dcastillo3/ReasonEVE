const {
    style: {
        smallHeadingStyle,
        linkStyle,
        productContainerStyle
    }, products,
    product,
    link,
    links,
    downloads,
    download
} = require('./productDeliveryConsts');

const buildDynamicTextFields = productDetails => {
    const multipleProducts = productDetails.length > 1;
    const dynamicTextFields = {
        productText: multipleProducts ? products : product,
        linkText: multipleProducts ? links : link,
        downloadText: multipleProducts ? downloads : download
    };

    return dynamicTextFields;
};

const buildProductDeliveryDetails = productDetails =>
    productDetails.reduce((prevProductHTML, { productName, purchaseType, url }) => {
        const currProductHTML = `
            <div style="${productContainerStyle}">
                <b style="${smallHeadingStyle}">${productName} | ${purchaseType}</b>
                <br>
                <a href=${url} style="${linkStyle}">
                    Download
                </a>
            </div>
        `;
        
        return `
            ${prevProductHTML}

            ${currProductHTML}
        `;
    }, '');

module.exports = {
    buildDynamicTextFields,
    buildProductDeliveryDetails
};