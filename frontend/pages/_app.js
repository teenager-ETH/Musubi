import "@/styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "@/components/Header";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { NotificationProvider } from "web3uikit";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// follow the ApolloClient doc
const client = new ApolloClient({
  cache: new InMemoryCache(), // help with refresh
  uri: "https://", // api for subgraph: temperary query url from subgraph if testnet
});

function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Talent Pool</title>
        <meta name="description" content="Talent Pool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Header />
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </div>
  );
}
