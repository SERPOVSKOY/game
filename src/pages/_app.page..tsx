import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import GlobalStyles from '@mui/material/GlobalStyles';

import { globalStyles } from '@/shared/styles/global-styles';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['cyrillic'] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Box className={inter.className} sx={{ width: '100%', height: '100%' }}>
      <GlobalStyles styles={globalStyles} />
      <Component {...pageProps} />
    </Box>
  );
};

export default App;
