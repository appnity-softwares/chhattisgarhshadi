import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/screens/auth/SplashScreen';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import GoogleAuthScreen from './src/screens/auth/GoogleAuthScreen';
import { colors } from './src/theme/colors';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGoogleAuth, setShowGoogleAuth] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
    );
  }

  if (showWelcome) {
    return (
      <WelcomeScreen
        onSignIn={() => setShowWelcome(false)}
        onCreateAccount={() => setShowWelcome(false)}
      />
    );
  }

  if (showGoogleAuth) {
    return (
      <GoogleAuthScreen
        onAuthSuccess={() => {
          console.log('Google Auth Success!');
          setShowGoogleAuth(false);
        }}
        onBack={() => setShowWelcome(true)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>✅ Screen 1: Splash Complete!</Text>
        <Text style={styles.text}>✅ Screen 2: Onboarding Complete!</Text>
        <Text style={styles.text}>✅ Screen 3: Welcome Complete!</Text>
        <Text style={styles.text}>✅ Screen 4: Google Auth Complete!</Text>
        <Text style={styles.subText}>
          Ready for Screen 5: Phone Verification Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: 4,
  },
  subText: {
    fontSize: 16,
    color: colors.success,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;