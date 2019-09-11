const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#D77A61',
    accent: '#4ECDC4',
    dark: '#223843',
    grey: '#9DA0A3',
    light: '#EFF1F3',
    white: '#FFF',
    black: '#1C1F23',
    blackLg: '#292F36',
  },
  fonts: {
    weight: {
      regular: 400,
      bold: 700,
    },
  },
  flexboxgrid: {
    // Defaults
    gridSize: 12, // columns
    gutterWidth: 1, // rem
    outerMargin: 2, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76, // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 64, // em
      lg: 75, // em
    },
  },
};

export default theme;
