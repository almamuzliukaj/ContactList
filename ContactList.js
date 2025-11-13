import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Image
} from 'react-native';

import contacts from './data/contacts.json';

// --- Helper Functions ---
const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};

const showDetailsAlert = (contact) => {
    const title = `Contact Details: ${contact.name}`;
    const message = `Phone: ${contact.phone}\nEmail: ${contact.email}`;
    Alert.alert(title, message, [{ text: "OK" }]);
};


const renderContact = ({ item }) => (
    <TouchableOpacity
        style={styles.contactCardWrapper}
        onPress={() => showDetailsAlert(item)}
    >
        <View style={styles.contactItem}>
            {/* 🟢 NEW: Using Pravatar URL for consistent, unique avatars */}
            <Image
                style={styles.avatar}
                // Pravatar uses 'item.id' to seed the unique image (e.g., https://i.pravatar.cc/50?img=1)
                source={{ uri: `https://i.pravatar.cc/50?img=${item.id}` }}
            />

            {/* Contact Details (Unchanged) */}
            <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.detailText}>Phone: {item.phone}</Text>
                <Text style={styles.detailText}>Email: {item.email}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


// --- Main ContactList Component (FINALIZED) ---
const ContactList = () => {
    const [searchText, setSearchText] = useState('');

    // Function to clear the search input
    const clearSearch = () => {
        setSearchText('');
    };

    // Filtering logic: case-insensitive search by name
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* SEARCH INPUT FIELD, CLEAR BUTTON, AND ALIGNMENT */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search contacts..."
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {/* Clear Button (only shown if text is present) */}
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <Text style={styles.clearButtonText}>X</Text>
                    </TouchableOpacity>
                )}
            </View>

            // FILTERED COUNT DISPLAY
            // 🟢 NEW: Only show the count if searchText is not an empty string
            {searchText.length > 0 && (
                <Text style={styles.countText}>
                    **{filteredContacts.length}** results found
                </Text>
            )}
            <FlatList
                data={filteredContacts} // Use the filtered list
                renderItem={renderContact}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};


// --- Styling (UPDATED for horizontal search bar and new elements) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    // UPDATED: Added flexDirection and alignItems for horizontal layout
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row', // <-- ALIGNS INPUT AND BUTTON
        alignItems: 'center',
    },
    // UPDATED: Added flex: 1 and marginRight to make room for the button
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        flex: 1, // <-- TAKES UP SPACE
        marginRight: 10, // <-- SPACE FOR BUTTON
    },
    // NEW: Clear button styles
    clearButton: {
        backgroundColor: '#ccc',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#444',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // NEW: Count display styles
    countText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    // Existing Card, Avatar, and Text Styles
    contactCardWrapper: {
        marginVertical: 5
    },

    contactItem: {
        padding: 15,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },

    detailsContainer: {
        marginLeft: 15, flex: 1
    }
    ,
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center'
    },


    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },

    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1a1a1a'
    },

    detailText: {
        fontSize: 14,
        color: '#555'
    },
});

export default ContactList;