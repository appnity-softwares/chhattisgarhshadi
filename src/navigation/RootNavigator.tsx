import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ProfileNavigator from './ProfileNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // In real app, check AsyncStorage for auth token and profile completion
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    checkAuth();
  }, []);

  // This function will be called when auth is completed
  const handleAuthComplete = () => {
    console.log('✅ Auth Complete - Moving to Profile Creation');
    setIsAuthenticated(true);
  };

  // This function will be called when profile is completed
  const handleProfileComplete = () => {
    console.log('✅ Profile Complete - Moving to Main App');
    setHasProfile(true);
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {(props) => <AuthNavigator {...props} onAuthComplete={handleAuthComplete} />}
          </Stack.Screen>
        ) : !hasProfile ? (
          <Stack.Screen name="Profile">
            {(props) => <ProfileNavigator {...props} onProfileComplete={handleProfileComplete} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;