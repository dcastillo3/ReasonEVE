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

export {
    apis,
    localStorageKeys,
    initialStates
};