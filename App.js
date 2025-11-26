import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Fixes the deprecated warning by importing the community library
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; 

import ContactList from './ContactList'; 

export default function App() {
  return (
    // Wrap the entire application for SafeArea compatibility
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Header (Styled for Dark Mode) */}
        <Text style={styles.header}>My Contact List</Text>
        
        {/* Contact List component handles the rest */}
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
    // Primary Dark Background Color
    backgroundColor: '#121212', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    // Slightly lighter dark background for the header area
    backgroundColor: '#1E1E1E', 
    borderBottomWidth: 1,
    borderBottomColor: '#252525', // Subtle divider
    color: '#F0F0F0', // White text
  }
});