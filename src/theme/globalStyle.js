import { createGlobalStyle } from 'styled-components';
import { theme } from './';

const GlobalStyle = createGlobalStyle`
    body {
        padding: 0px 0px 60px 0px;
        background: ${theme.palette.background.main};
        color: ${theme.palette.text.background};
        font-family: ${theme.typography.fontFamily};
        letter-spacing: 0.2px;

        /* Reset style */
        margin: 0;
    }

    h1, h2, h3, h4, h5, h6, p {
        /* Reset style */
        margin: 0;
    }

    button {
        /* Reset style */
        outline: none;
        border: none;

        &:focus {
            outline: none;
        }
    }

    a {
        color: ${theme.palette.text.background};

        /* Reset style */
        text-decoration: none;
    }
`;

export default GlobalStyle;