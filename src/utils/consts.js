const apiDirectory = '/api';

const apis = {
    tracks: `${apiDirectory}/tracks`,
    packs: `${apiDirectory}/packs`,
    checkout: `${apiDirectory}/checkout`,
    playlist: `${apiDirectory}/playlist`
};

const localStorageKeys = {
    cart: `cart`
};

const initialStates = {
    cart: [],
    tracks: [],
    playlist: []
}

const productCardButtonStatus = {
    available: 'Add to Cart',
    sold: 'Sold',
    incart: 'In Cart'
};

export {
    apis,
    localStorageKeys,
    initialStates,
    productCardButtonStatus
};