const attachCartButtonToAudioPlayer = () => {
    const audioPlayerNavigationButtonRow = document.querySelector('#music-player > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.css-5f91ah-MuiPaper-root > div > div.MuiBox-root.css-1vjixiu');
    const audioPlayerCartButton = document.getElementById('audio-player-cart-button');

    audioPlayerNavigationButtonRow.before(audioPlayerCartButton);
};

export {
    attachCartButtonToAudioPlayer
};