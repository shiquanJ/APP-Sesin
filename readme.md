<!-- EXPO + React Native 안드로이드 및 IOS 웹뷰 형태의 하이브리드 앱 출시 가능합니다 -->

- npm install
- npm install --global eas-cli (eas 설치)
- eas build:configure (app.json 을 빌드)
- eas build --platform android (.aab)
- eas build -p android --profile preview (.apk) 
- eas build --platform ios (.ipa)
- eas submit -p ios

apk: eas build -p android --profile preview
"build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  } 
aab: eas build --platform android
"build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  }
