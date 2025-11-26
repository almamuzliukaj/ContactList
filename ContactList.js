import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
    Keyboard,
    Modal, // Modal needed for the detail view
    Linking, // Needed for Call/Email actions in the Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import contacts from './data/contacts.json';

// --- Design Constants ---
const ACCENT_COLOR = '#84DCCF'; // Teal/Cyan for accents
const BACKGROUND_COLOR = '#121212'; // Primary dark background
const CARD_BACKGROUND = '#1E1E1E'; // Slightly lighter dark background for search area
const TEXT_LIGHT = '#F0F0F0'; // High contrast text
const TEXT_MUTED = '#A0A0A0'; // Muted color for details


// --- Helper Functions (Preserved) ---
const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};


// --- Contact Detail Modal Component (Integrated Here for simplicity, but best to separate) ---

const ContactDetailModal = ({ isVisible, contact, onClose }) => {
    if (!contact) return null;

    const firstName = contact.name.split(' ')[0];

    // Helper to open the phone dialer
    const handleCall = () => {
        Linking.openURL(`tel:${contact.phone}`);
    };

    // Helper to open the email app
    const handleEmail = () => {
        Linking.openURL(`mailto:${contact.email}`);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                    
                    {/* --- Close Button --- */}
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <Ionicons name="close-circle-outline" size={32} color={TEXT_MUTED} />
                    </TouchableOpacity>

                    {/* --- Profile Header --- */}
                    <Image
                        style={modalStyles.profileImage}
                        source={{ uri: `https://i.pravatar.cc/150?img=${contact.id}` }} // Larger avatar
                    />
                    <Text style={modalStyles.nameText}>{contact.name}</Text>
                    <Text style={modalStyles.greetingText}>Connect with {firstName}!</Text>

                    {/* --- Action Cards --- */}
                    <View style={modalStyles.actionsContainer}>
                        <TouchableOpacity style={modalStyles.actionCard} onPress={handleCall}>
                            <Ionicons name="call-outline" size={28} color={ACCENT_COLOR} />
                            <Text style={modalStyles.actionText}>Call</Text>
                            <Text style={modalStyles.actionDetail}>{contact.phone}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={modalStyles.actionCard} onPress={handleEmail}>
                            <Ionicons name="mail-outline" size={28} color={ACCENT_COLOR} />
                            <Text style={modalStyles.actionText}>Email</Text>
                            <Text style={modalStyles.actionDetail}>{contact.email}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- General Info (Optional) --- */}
                    <View style={modalStyles.generalInfo}>
                        <Ionicons name="information-circle-outline" size={20} color={TEXT_MUTED} />
                        <Text style={modalStyles.generalText}>Contact ID: {contact.id}</Text>
                    </View>

                </View>
            </View>
        </Modal>
    );
};


// --- Render Item Component (Redesigned) ---
const renderContact = ({ item, handleContactPress }) => (
    <TouchableOpacity
        style={listStyles.contactCardWrapper}
        onPress={() => handleContactPress(item)} 
        activeOpacity={0.7}
    >
        <View style={listStyles.contactItem}>
            {/* Avatars */}
            <Image
                style={listStyles.avatar}
                source={{ uri: `https://i.pravatar.cc/50?img=${item.id}` }}
            />

            {/* Contact Details (Styled for Dark Mode) */}
            <View style={listStyles.detailsContainer}>
                <Text style={listStyles.nameText}>{item.name}</Text>
                {/* FIX: Ensure all text, including emojis, is within <Text> tags */}
                <Text style={listStyles.detailText}>📞 {item.phone}</Text> 
                <Text style={listStyles.detailText}>📧 {item.email}</Text>
            </View>
            
            {/* Action Icon */}
            <Ionicons name="chevron-forward-outline" size={24} color={TEXT_MUTED} />
        </View>
    </TouchableOpacity>
);

// --- Main ContactList Component (Preserved Logic) ---
const ContactList = () => {
    const [searchText, setSearchText] = useState('');
    // States for Modal Management
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const clearSearch = () => {
        setSearchText('');
        Keyboard.dismiss();
    };

    const handleContactPress = (contact) => {
        setSelectedContact(contact);
        setIsModalVisible(true);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.phone.includes(searchText)
    );

    return (
        <View style={listStyles.container}>
            {/* SEARCH INPUT FIELD & BUTTONS */}
            <View style={listStyles.searchContainer}>
                <Ionicons 
                    name="search-outline" 
                    size={20} 
                    color={ACCENT_COLOR} 
                    style={listStyles.searchIcon}
                />
                <TextInput
                    style={listStyles.searchInput}
                    placeholder="Search contacts..."
                    placeholderTextColor={TEXT_MUTED}
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {searchText.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={listStyles.clearButton}>
                        {/* FIX: Using an Icon instead of plain 'X' text */}
                        <Ionicons name="close-circle" size={20} color={TEXT_MUTED} />
                    </TouchableOpacity>
                )}
            </View>

            {/* CORRECTED Count Display and Styling */}
            {searchText.length > 0 && (
                <Text style={listStyles.countText}>
                    {/* FIX: Using Text components to show the count without markdown errors */}
                    <Text style={listStyles.countHighlight}>{filteredContacts.length}</Text> results found
                </Text>
            )}

            <FlatList
                data={filteredContacts}
                // Pass the handler down to the render function
                renderItem={(props) => renderContact({ ...props, handleContactPress })}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={listStyles.separator} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
            
            {/* Contact Detail Modal */}
            <ContactDetailModal
                isVisible={isModalVisible}
                contact={selectedContact}
                onClose={() => setIsModalVisible(false)}
            />
        </View>
    );
};


// --- List Styles (Dark Mode) ---
const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR, // Primary dark background
    },
    
    // --- Search Area Styles ---
    searchContainer: {
        padding: 15,
        backgroundColor: CARD_BACKGROUND, 
        borderBottomWidth: 1,
        borderBottomColor: '#252525',
        flexDirection: 'row', 
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1, 
        height: 40,
        backgroundColor: CARD_BACKGROUND,
        fontSize: 16,
        color: TEXT_LIGHT,
    },
    clearButton: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    // --- List Item Styles ---
    countText: {
        fontSize: 14,
        color: TEXT_MUTED,
        textAlign: 'left',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: BACKGROUND_COLOR, 
    },
    // NEW: Style for the bold, accented count number
    countHighlight: {
        fontWeight: 'bold',
        color: ACCENT_COLOR,
    },
    separator: {
        height: 1,
        backgroundColor: '#252525', 
        marginLeft: 85, 
        marginRight: 15,
    },
    contactCardWrapper: {},
    contactItem: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: BACKGROUND_COLOR, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    detailsContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 17,
        fontWeight: '600',
        color: TEXT_LIGHT,
        marginBottom: 2,
    },
    detailText: {
        fontSize: 14,
        color: TEXT_MUTED,
        lineHeight: 20,
    },
});

// --- Modal Styles (Integrated) ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        backgroundColor: CARD_BACKGROUND,
        width: '100%',
        padding: 25,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: ACCENT_COLOR,
    },
    nameText: {
        fontSize: 26,
        fontWeight: '700',
        color: TEXT_LIGHT,
    },
    greetingText: {
        fontSize: 16,
        color: ACCENT_COLOR,
        marginBottom: 30,
        fontWeight: '600',
    },
    actionsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    actionCard: {
        backgroundColor: BACKGROUND_COLOR,
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_LIGHT,
        marginLeft: 15,
        flex: 1,
    },
    actionDetail: {
        fontSize: 14,
        color: TEXT_MUTED,
    },
    generalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: 8,
    },
    generalText: {
        fontSize: 14,
        color: TEXT_MUTED,
        marginLeft: 8,
    },
});

export default ContactList;