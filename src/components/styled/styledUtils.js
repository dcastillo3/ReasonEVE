const buildPalette = ({theme, variant = 'primary', shade = 'main'}) => {
    const bgColor = theme?.palette?.[variant]?.[shade];
    const textColor = theme?.palette?.text?.[variant];
    const transition = theme?.transitions?.easing?.sharp;
    const cssProps = `
        background: ${bgColor};
        color: ${textColor};
        transition: ${transition};
    `;
    
    return cssProps;
};

const buildHoverPalette = ({theme, variant = 'primary', shade = 'light'}) => {
    const bgHoverColor = theme?.palette?.[variant]?.[shade];
    const cssProps = `
        &:hover {
            background: ${bgHoverColor};
            cursor: pointer;
        }
    `;
    
    return cssProps;
};

//Camel to kebab case
const getCSSPropName = prop => {
    let propName = [].reduce.call(prop, (kebabStr, currLetter) => {
        let newKebabStr;
        const upperCaseLetter = currLetter.toUpperCase();

        if (currLetter === upperCaseLetter) {
            const lowerCaseLetter = currLetter.toLowerCase();

            newKebabStr = `${kebabStr}-${lowerCaseLetter}`;
        } else newKebabStr = `${kebabStr}${currLetter}`;

        return newKebabStr;
    }, '');

    return propName;
};

const buildStyles = ({sx = {}}) => {
    let styles = '';

    for (let prop in sx) {
        let propValue = sx[prop];
        let propName = getCSSPropName(prop);
        let style = `${propName}: ${propValue};`;

        styles += style;
    };

    return styles;
};

export {
    buildPalette,
    buildHoverPalette,
    buildStyles
};