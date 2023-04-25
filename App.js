import React, { useRef, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet,BackHandler,ToastAndroid  } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";

export default () => {
  const webview = useRef();
  let exitApp = false;
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const onPressHardwareBackButton = () => {
    if (webview.current && isCanGoBack) {
      webview.current.goBack();
      return true;
    } else {
      if (exitApp == undefined || !exitApp) {
        exitApp = true
        ToastAndroid.show("한번 더 뒤로가기 입력시 종료됩니다.",ToastAndroid.SHORT)
        timeOut = setTimeout(() => {
          exitApp = false
        }, 2000)
      } else {
        clearTimeout(timeOut)
        BackHandler.exitApp()// 앱종료 
      }
      return true
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    }
  }, [isCanGoBack]);
  return (
    <View
      style={styles.container}
    >
      <StatusBar style="auto" />
      <WebView
        ref={webview}
        source={{ uri: 'http://bestsesin.com' }}
        injectedJavaScript={`
          (function() {
            function wrap(fn) {
              return function wrapper() {
                var res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage('navigationStateChange');
                return res;
              }
            }
      
            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function() {
              window.ReactNativeWebView.postMessage('navigationStateChange');
            });
          })();
      
          true;
        `}
      onMessage={({ nativeEvent: state }) => {
        if (state.data === 'navigationStateChange') {
          // Navigation state updated, can check state.canGoBack, etc.
          setIsCanGoBack(state.canGoBack);
        }
      }}/>
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

