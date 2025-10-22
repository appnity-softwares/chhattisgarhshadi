import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/screens/auth/SplashScreen';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import GoogleAuthScreen from './src/screens/auth/GoogleAuthScreen';
import PhoneVerificationScreen from './src/screens/auth/PhoneVerificationScreen';
import OtpVerificationScreen from './src/screens/auth/OtpVerificationScreen';
import { colors } from './src/theme/colors';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGoogleAuth, setShowGoogleAuth] = useState(true);
  const [showPhoneVerification, setShowPhoneVerification] = useState(true);
  const [showOtpVerification, setShowOtpVerification] = useState(true);
  const [phoneData, setPhoneData] = useState({ phone: '', countryCode: '' });

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
        onAuthSuccess={() => setShowGoogleAuth(false)}
        onBack={() => setShowWelcome(true)}
      />
    );
  }

  if (showPhoneVerification) {
    return (
      <PhoneVerificationScreen
        onVerifyPhone={(phone, countryCode) => {
          console.log('Phone:', phone, 'Country Code:', countryCode);
          setPhoneData({ phone, countryCode });
          setShowPhoneVerification(false);
        }}
        onBack={() => setShowGoogleAuth(true)}
      />
    );
  }

  if (showOtpVerification) {
    return (
      <OtpVerificationScreen
        phoneNumber={phoneData.phone}
        countryCode={phoneData.countryCode}
        onVerifySuccess={() => {
          console.log('OTP Verified Successfully!');
          setShowOtpVerification(false);
        }}
        onBack={() => setShowPhoneVerification(true)}
        onResendOtp={() => {
          console.log('Resending OTP...');
        }}
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
        <Text style={styles.text}>✅ Screen 5: Phone Verification Complete!</Text>
        <Text style={styles.text}>✅ Screen 6: OTP Verification Complete!</Text>
        <Text style={styles.subText}>
          Ready for Screen 7: Language Selection Screen
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
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginVertical: 3,
  },
  subText: {
    fontSize: 16,
    color: colors.success,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;