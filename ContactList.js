import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Keyboard,
    Modal, 
    Linking, 
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import contacts from './data/contacts.json';

// --- Design Constants ---
const ACCENT_COLOR = '#84DCCF'; // Teal/Cyan for accents
const BACKGROUND_COLOR = '#121212'; // Primary dark background
const CARD_BACKGROUND = '#1E1E1E'; // Card/List Item Background
const TEXT_LIGHT = '#F0F0F0'; // High contrast text
const TEXT_MUTED = '#A0A0A0'; // Muted color for details


// --- Contact Detail Modal Component (No Change) ---
const ContactDetailModal = ({ isVisible, contact, onClose }) => {
    if (!contact) return null;

    const firstName = contact.name.split(' ')[0];

    const handleCall = () => { Linking.openURL(`tel:${contact.phone}`); };
    const handleEmail = () => { Linking.openURL(`mailto:${contact.email}`); };

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
                        source={{ uri: `https://i.pravatar.cc/150?img=${contact.id}` }}
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


// --- Render Item Component (No Change) ---
const renderContact = ({ item, handleContactPress }) => (
    <TouchableOpacity
        style={listStyles.contactCardWrapper}
        onPress={() => handleContactPress(item)} 
        activeOpacity={0.8}
    >
        <View style={listStyles.contactItem}>
            {/* Avatars */}
            <Image
                style={listStyles.avatar}
                source={{ uri: `https://i.pravatar.cc/50?img=${item.id}` }}
            />

            {/* Contact Details */}
            <View style={listStyles.detailsContainer}>
                <Text style={listStyles.nameText}>{item.name}</Text>
                <Text style={listStyles.detailText}>📞 {item.phone}</Text> 
                <Text style={listStyles.detailText}>📧 {item.email}</Text>
            </View>
            
            {/* Action Icon */}
            <Ionicons name="chevron-forward-outline" size={24} color={TEXT_MUTED} />
        </View>
    </TouchableOpacity>
);

// --- Main ContactList Component ---
const ContactList = () => {
    const [searchText, setSearchText] = useState('');
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
            
            {/* --- FIXED: Professional Header Title (Spaced Down) --- */}
            <View style={listStyles.titleContainer}>
                <Text style={listStyles.headerTitle}>All Contacts</Text>
            </View>

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
                        <Ionicons name="close-circle" size={20} color={TEXT_MUTED} />
                    </TouchableOpacity>
                )}
            </View>

            {/* CORRECTED Count Display and Styling */}
            {searchText.length > 0 && (
                <Text style={listStyles.countText}>
                    <Text style={listStyles.countHighlight}>{filteredContacts.length}</Text> results found
                </Text>
            )}

            <FlatList
                data={filteredContacts}
                renderItem={(props) => renderContact({ ...props, handleContactPress })}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={listStyles.flatListContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={listStyles.emptyList}>
                        <Ionicons name="alert-circle-outline" size={40} color={TEXT_MUTED} />
                        <Text style={listStyles.emptyText}>No contacts found.</Text>
                    </View>
                )}
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


// --- List Styles (Enhanced Card Look) ---
const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR, // Primary dark background
    },
    
    // --- Header Title (Spaced Down) ---
    titleContainer: {
        // Generous vertical padding to push the title down from the status bar area
        paddingVertical: 20, 
        paddingHorizontal: 15,
        backgroundColor: BACKGROUND_COLOR, // Use primary background here
    },
    headerTitle: {
        fontSize: 32, // Larger, more modern title size
        fontWeight: 'bold',
        color: TEXT_LIGHT,
    },
    
    // --- Search Area Styles ---
    searchContainer: {
        padding: 15,
        // Card background used for the area immediately surrounding the search field
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
    flatListContent: {
        paddingHorizontal: 15, // Horizontal padding for the list content
        paddingTop: 10,
        paddingBottom: 20,
    },
    countText: {
        fontSize: 14,
        color: TEXT_MUTED,
        textAlign: 'left',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: BACKGROUND_COLOR, 
    },
    countHighlight: {
        fontWeight: 'bold',
        color: ACCENT_COLOR,
    },
    contactCardWrapper: {
        backgroundColor: CARD_BACKGROUND,
        borderRadius: 10,
        marginBottom: 10, // Gap between cards
        overflow: 'hidden',
    },
    contactItem: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: CARD_BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
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
    emptyList: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        color: TEXT_MUTED,
        fontSize: 16,
    }
});

// --- Modal Styles (No change) ---
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
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
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