import getConfig from "next/config";
import {ApolloClient, InMemoryCache} from "@apollo/client";

const useApolloClientConfig = () => {
  const { publicRuntimeConfig } = getConfig() || {};

  return new ApolloClient({
    uri: `${publicRuntimeConfig.NEXT_PUBLIC_HASURA_STAND}/v1/graphql`,
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    headers: {
      "x-hasura-admin-secret":
          "sSzO3VE9BCRxuxZieZvlH9Z9iQzYRSxOO0C6tA2Cvi2x1br5rbBebVvTl9wyM9od",
    },
  });
};

export { useApolloClientConfig };
