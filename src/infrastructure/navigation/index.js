import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// navigator
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';

// context
import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
