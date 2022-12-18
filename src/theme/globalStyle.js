import { createGlobalStyle } from 'styled-components';
import { theme } from './';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 60px 0px;
        background: ${theme.palette.background.main};
        color: ${theme.palette.text.background};
    }

    a {
        color: ${theme.palette.text.background};
    }

    .active {
        font-weight: 600;
    }
`;

export default GlobalStyle;