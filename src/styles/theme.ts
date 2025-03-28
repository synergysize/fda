import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3edff',
      100: '#b8cdff',
      200: '#8cacff',
      300: '#608bff',
      400: '#346aff',
      500: '#2463ff', // primary
      600: '#1a47c8', // primary-dark
      700: '#123594',
      800: '#0a2362',
      900: '#031232',
    },
    secondary: {
      50: '#fff9e6',
      100: '#ffedb8',
      200: '#ffe28a',
      300: '#ffd65c',
      400: '#ffcb2e',
      500: '#ffc107', // secondary
      600: '#e6ae06', // secondary-dark
      700: '#b38705',
      800: '#805f03',
      900: '#4d3802',
    },
    accent: {
      50: '#fff3e6',
      100: '#ffdcb8',
      200: '#ffc48a',
      300: '#ffad5c',
      400: '#ff952e',
      500: '#ff8c00', // accent
      600: '#e67e00',
      700: '#b36200',
      800: '#804500',
      900: '#4d2900',
    },
    background: {
      primary: '#0f1b3a',
      secondary: '#141f3e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdc3c7',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'background.primary',
        color: 'text.primary',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '8px',
        fontWeight: '600',
        _focus: {
          boxShadow: 'none',
        },
      },
      variants: {
        primary: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        secondary: {
          bg: 'secondary.500',
          color: 'gray.800',
          _hover: {
            bg: 'secondary.600',
          },
        },
        outline: {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.500',
            color: 'white',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
});

export default theme;