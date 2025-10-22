import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/screens/auth/SplashScreen';
import { colors } from './src/theme/colors';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>✅ Splash Screen Complete!</Text>
        <Text style={styles.subText}>Ready for Screen 2: Onboarding</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: colors.success,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default App;