const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const deliveryEmail = require('./emails/productDelivery/productDelivery');
const { clientParams } = require('../awsConsts');
const { sourceEmail, productText } = require('./sesConsts');
const { buildSignedUrl } = require('../s3/s3');

const sesClient = new SESClient(clientParams);

const getDeliveryDetailsForProducts = async products => {
    let deliveryDetailsForProducts = [];

    for (let i = 0; i < products.length; i++) {
        const { productName, purchaseType, s3Key } = products[i];
        const signedUrl = await buildSignedUrl(s3Key, productName, purchaseType);
        const productDeliveryDetails = {
            productName,
            purchaseType,
            url: signedUrl
        };

        deliveryDetailsForProducts.push(productDeliveryDetails);
    };

    return deliveryDetailsForProducts;
};

const buildProductDeliveryEmailParams = async (customer_details, products) => {
    const signedUrls = await getDeliveryDetailsForProducts(products);
    const subjectProductText = signedUrls.length > 1 ? productText.products : productText.product;
    const productDeliveryEmailParams = {
        Destination: {
            ToAddresses: [customer_details.email]
        },
        Message: {
            Body: {
                Html: {
                    Data: deliveryEmail(customer_details.name, signedUrls)
                }
            },
            Subject: {
                Data: `ReasonEVE | Your ${subjectProductText}`
            }
        },
        Source: sourceEmail
    };

    return productDeliveryEmailParams;
};

const sendProductDeliveryEmail = async (customer_details, products) => {
    const productDeliveryEmailParams = await buildProductDeliveryEmailParams(customer_details, products);
    const sesCommand = new SendEmailCommand(productDeliveryEmailParams);
    const response = await sesClient.send(sesCommand);

    console.log(`
        Successfully sent product delivery email to ${customer_details.email} with AWS SES. 
        MessageId: ${response.MessageId}
    `);

    return response;
};

module.exports = {
    sendProductDeliveryEmail
};