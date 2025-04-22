/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExplorerProvider } from './src/context/ExplorerContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ExplorerProvider>
        <AppNavigator />
      </ExplorerProvider>
    </SafeAreaProvider>
  );
}

export default App;
