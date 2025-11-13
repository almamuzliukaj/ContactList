import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// **1. Import the ContactList component**
import ContactList from './ContactList'; 

export default function App() {
  return (
    // **2. Change View to SafeAreaView**
    // SafeAreaView ensures content is below the device's status bar/notch.
    <SafeAreaView style={styles.safeArea}>
      {/* Optional: Add a header outside the list */}
      <Text style={styles.header}>My Contact List</Text>
      
      {/* **3. Render the ContactList component** */}
      <ContactList />
      
      {/* StatusBar for styling the system status bar (optional) */}
      <StatusBar style="auto" /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // **4. Update the container style to safeArea**
  safeArea: {
    // We need 'flex: 1' so the list takes up the whole screen
    flex: 1, 
    backgroundColor: '#fff',
    // Remove alignItems and justifyContent from here, 
    // as ContactList will manage its own content alignment.
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});