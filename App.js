import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; 

import ContactList from './ContactList'; 

// --- Configuration Constant ---
const BACKGROUND_COLOR = '#121212'; // Primary dark background

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Contact List component handles the title, search, and list */}
        <ContactList />
        
        {/* Status bar text is white/light for the dark background */}
        <StatusBar style="light" /> 
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: BACKGROUND_COLOR, 
  },
});