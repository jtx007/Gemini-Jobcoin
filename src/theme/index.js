import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        height: '100%',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
      },
    },
  },
});

export default theme;
