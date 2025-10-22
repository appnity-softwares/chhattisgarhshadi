import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/screens/auth/SplashScreen';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import GoogleAuthScreen from './src/screens/auth/GoogleAuthScreen';
import PhoneVerificationScreen from './src/screens/auth/PhoneVerificationScreen';
import OtpVerificationScreen from './src/screens/auth/OtpVerificationScreen';
import LanguageSelectionScreen from './src/screens/auth/LanguageSelectionScreen';
import { colors } from './src/theme/colors';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGoogleAuth, setShowGoogleAuth] = useState(true);
  const [showPhoneVerification, setShowPhoneVerification] = useState(true);
  const [showOtpVerification, setShowOtpVerification] = useState(true);
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);
  const [phoneData, setPhoneData] = useState({ phone: '', countryCode: '' });
  const [selectedLanguage, setSelectedLanguage] = useState('en');

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

  if (showLanguageSelection) {
    return (
      <LanguageSelectionScreen
        onLanguageSelect={(languageCode) => {
          console.log('Language Selected:', languageCode);
          setSelectedLanguage(languageCode);
          setShowLanguageSelection(false);
        }}
        onSkip={() => {
          console.log('Language Selection Skipped');
          setShowLanguageSelection(false);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎉 Authentication Flow Complete!</Text>
        
        <View style={styles.completedList}>
          <Text style={styles.text}>✅ Screen 1: Splash Screen</Text>
          <Text style={styles.text}>✅ Screen 2: Onboarding Screen</Text>
          <Text style={styles.text}>✅ Screen 3: Welcome Screen</Text>
          <Text style={styles.text}>✅ Screen 4: Google Auth Screen</Text>
          <Text style={styles.text}>✅ Screen 5: Phone Verification</Text>
          <Text style={styles.text}>✅ Screen 6: OTP Verification</Text>
          <Text style={styles.text}>✅ Screen 7: Language Selection</Text>
        </View>

        <View style={styles.selectedInfo}>
          <Text style={styles.infoLabel}>Selected Language:</Text>
          <Text style={styles.infoValue}>
            {selectedLanguage === 'en' && '🇬🇧 English'}
            {selectedLanguage === 'hi' && '🇮🇳 हिन्दी (Hindi)'}
            {selectedLanguage === 'cg' && '🏠 छत्तीसगढ़ी (Chhattisgarhi)'}
          </Text>
        </View>

        <Text style={styles.nextText}>
          🚀 Ready for Profile Creation Flow!
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
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.main,
    textAlign: 'center',
    marginBottom: 30,
  },
  completedList: {
    backgroundColor: colors.neutral.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'left',
    marginVertical: 4,
  },
  selectedInfo: {
    backgroundColor: colors.success + '15',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
  },
  nextText: {
    fontSize: 16,
    color: colors.accent.main,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;