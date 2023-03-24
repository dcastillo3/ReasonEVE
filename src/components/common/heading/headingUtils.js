const formatHeading = heading => {
    const headingArr = heading.split(' ');
    const headingFirstHalfArr = headingArr.slice(0, -2);
    const headingFirstHalf = headingFirstHalfArr.join(' ');
    const [secondToLastWord, lastWord] = headingArr.slice(-2);
    const formattedHeading = {
        headingFirstHalf,
        secondToLastWord,
        lastWord
    };

    return formattedHeading;
};

export {
    formatHeading
};