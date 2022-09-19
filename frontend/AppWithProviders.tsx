import React from "react";
import App from "./App";
import { Providers } from "./Providers";
import { View, Text, Button, StyleSheet, FlatList, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => (
  //maybe remove this? Ask ETH mentor.
  <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
    <Providers>
      <App />
    </Providers>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {

    flex: 1
  }
})