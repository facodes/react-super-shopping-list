import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
    }

    button {
      outline: none;
      cursor: pointer;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html {
      font-size: 62.5%; //1rem = 10px
      box-sizing: border-box;
      --color-primary: ${(props) => props.theme.colors.primary};
      --color-secondary: ${(props) => props.theme.colors.secondary};
      --color-accent: ${(props) => props.theme.colors.accent};
      --color-dark: ${(props) => props.theme.colors.dark};
      --color-light: ${(props) => props.theme.colors.light};
      --color-white: ${(props) => props.theme.colors.white};
      --color-grey: ${(props) => props.theme.colors.grey};
      --color-black: ${(props) => props.theme.colors.black};
      --color-black-lg: ${(props) => props.theme.colors.blackLg};
      --font-weight-regular: ${(props) => props.theme.fonts.weight.regular};
      --font-weight-bold: ${(props) => props.theme.fonts.weight.bold};
    }

    body {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      line-height: 1.6;
    }

    form,
    input,
    textarea,
    button,
    select,
    a {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
`;
