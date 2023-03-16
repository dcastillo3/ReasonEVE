const formatPriceDisplay = price => `$${price}`;

const formatPricesForCartMenu = (mp3Price, leasePrice, exclusivePrice) => {
    const formattedPrices = [
        { 
            title: 'mp3', 
            amount: formatPriceDisplay(mp3Price)
        },
        { 
            title: 'lease', 
            amount: formatPriceDisplay(leasePrice)
        },
        { 
            title: 'exclusive', 
            amount: formatPriceDisplay(exclusivePrice)
        }
    ];

    return formattedPrices;
};

export {
    formatPricesForCartMenu
};