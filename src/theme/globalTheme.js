import { createGlobalStyle } from 'styled-components';

const GlobalTheme = createGlobalStyle`
    body {
        margin: 0;
    }

    .active {
        font-weight: 600;
    }
`;

export default GlobalTheme;