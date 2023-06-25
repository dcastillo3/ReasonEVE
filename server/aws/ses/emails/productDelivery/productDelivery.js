const {
    style: {
        containerStyle,
        headingStyle,
        paragraphStyle,
        signatureStyle
    },
    companyName
} = require('./productDeliveryConsts');
const { buildProductDeliveryDetails, buildDynamicTextFields } = require('./productDeliveryUtils');

const productDelivery = (customerName, productDetails) => {
    const customerFirstName = customerName.split(' ')[0];
    const {
        productText,
        linkText,
        downloadText
    } = buildDynamicTextFields(productDetails);
    const productDeliveryDetails = buildProductDeliveryDetails(productDetails);

    return `
        <div style="${containerStyle}">
            <h2 style="${headingStyle}">Hi ${customerFirstName},</h2>

            <p style="${paragraphStyle}">Thank you for your purchase!</p>

            <p style="${paragraphStyle}">
                You can access your ${productText} by clicking the ${linkText} below:
            </p>

            ${productDeliveryDetails}

            <p style="${paragraphStyle}">
                If you have any questions or concerns about your ${downloadText}, feel free to reach out.
            </p>

            <p style="${signatureStyle}">
                Cheers,
                <br>
                ${companyName}
            </p>
        </div>
    `;
};

module.exports = productDelivery;