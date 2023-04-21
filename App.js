import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View
      style={styles.container}
    >
      <StatusBar style="auto" />
      <WebView
        source={{ uri: 'http://bestsesin.com' }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: Constants.statusBarHeight,
  },
});

