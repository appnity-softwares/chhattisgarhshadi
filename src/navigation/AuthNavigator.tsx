import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

// Import Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import GoogleAuthScreen from '../screens/auth/GoogleAuthScreen';
import PhoneVerificationScreen from '../screens/auth/PhoneVerificationScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';
import LanguageSelectionScreen from '../screens/auth/LanguageSelectionScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Splash">
      
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="GoogleAuth" component={GoogleAuthScreen} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;