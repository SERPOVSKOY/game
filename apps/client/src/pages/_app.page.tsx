import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';

import { useApolloClientConfig, ApolloProvider } from '@game/graphql/apollo-client';

import GlobalStyles from '@mui/material/GlobalStyles';
import { globalStyles } from '@/shared/styles/global-styles';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['cyrillic'] });

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApolloClientConfig();

  return (
    <ApolloProvider client={apolloClient}>
      <Box className={inter.className} sx={{ width: '100%', height: '100%' }}>
        <GlobalStyles styles={globalStyles} />
        <Component {...pageProps} />
      </Box>
    </ApolloProvider>
  );
};

export default App;
