import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";
import {
  REACT_NATIVE_FIREBASE_API_KEY,
  REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
  REACT_NATIVE_FIREBASE_PROJECT_ID,
  REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  REACT_NATIVE_FIREBASE_APP_ID,
} from "@env";

// fonts
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

// infrastructure
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

// context
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: REACT_NATIVE_FIREBASE_API_KEY,
  authDomain: REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_NATIVE_FIREBASE_PROJECT_ID,
  storageBucket: REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_NATIVE_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
