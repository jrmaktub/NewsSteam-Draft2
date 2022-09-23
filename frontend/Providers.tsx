import React from 'react';
import {MoralisProvider} from 'react-moralis';
import Moralis from 'moralis/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableViaWalletConnect} from './Moralis/enableViaWalletConnect';
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from './WalletConnect';
import {Platform} from 'react-native';
//import Qrcode from "./Qrcode";
//import { expo } from "../app.json";
import {MoralisDappProvider} from './providers/MoralisDappProvider/MoralisDappProvider';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { mapping, dark } from '@eva-design/eva';
import {
  REACT_APP_MORALIS_APPLICATION_ID,
  REACT_APP_MORALIS_SERVER_URL,
} from '@env';

// import { default as theme } from './theme.json';

interface ProvidersProps {
  readonly children: JSX.Element;
}



/**
 * Initialization of Moralis
 */
const appId = 'WFhlK2uNcLX5WKDpQx2DVlIVLp0smvUxYEkClJrd';
const serverUrl = 'https://pivnwf6cjq7d.usemoralis.com:2053/server';
const environment = 'native';

// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;
// console.log(AsyncStorage.getAllKeys(), 'KEYS');

const walletConnectOptions: WalletConnectProviderProps = {
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      'rainbow',
      'metamask',
      'argent',
      'trust',
      'imtoken',
      'pillar',
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  //renderQrcodeModal: Qrcode,
};

export const Providers = ({children}: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}>
        <MoralisDappProvider>
          {/* <ApplicationProvider {...eva} theme={eva.dark}> */}
          <ApplicationProvider {...eva} theme={{ ...eva.dark}}>
            {children}
          </ApplicationProvider>
        </MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
