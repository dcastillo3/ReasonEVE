const apiDirectory = '/api';

const apis = {
    tracks: `${apiDirectory}/tracks/v2`,
    packs: `${apiDirectory}/packs`,
    checkout: `${apiDirectory}/checkout`,
    playlist: `${apiDirectory}/playlist/v2`
};

const localStorageKeys = {
    cart: `cart`
};

const initialStates = {
    currTrack: {},
    cart: [],
    tracks: [],
    playlist: [],
    trackPlaying: false
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