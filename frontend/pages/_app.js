import "@/styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "@/components/Header";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { NotificationProvider } from "web3uikit";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Talent Pool</title>
        <meta name="description" content="Talent Pool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Header />
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}
