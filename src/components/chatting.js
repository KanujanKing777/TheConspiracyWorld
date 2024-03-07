import React, { useState, useRef, useEffect } from 'react';
import SendIcon from './sendicon';
import './chatting.css';

import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCXoH3sRAs9i0aPMRgNCHjNAvnWIzAaT3Y",
    authDomain: "thespaceforconspiracy.firebaseapp.com",
    projectId: "thespaceforconspiracy",
    storageBucket: "thespaceforconspiracy.appspot.com",
    messagingSenderId: "652964257001",
    appId: "1:652964257001:web:461022b1e74763eff3a478"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const ChatComponent = ({data, user}) => {
    const [messages, setMessages] = useState([]);
    var [newMessage, setNewMessage] = useState('');
    const [supposeIs, setSupposeIs] = useState(false);
    const messagesRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the messages when they change
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);
    const bigUser = async(value) =>{
        const ref2 = doc(firestore, 'users', value['UserId']);
        const docSnap2 = await getDoc(ref2);

        if(docSnap2.exists()){
            const userName = docSnap2.data()['Name'];
            if(user === value['UserId']){
                const newvalue ={ text: value['Message'], sender: 'me', category: 'suppose' };
                return newvalue;

            }
            else{
                const newvalue ={ text: value['Message'], sender: userName, category: 'suppose' }
                return (newvalue);
            }
            
        }
        else{
            return;
        }
    }
    useEffect(() => {
        // Fetch initial chat data when the component mounts
        const fetchInitialChats = async () => {
            try {
                const ref = doc(firestore, 'posts', data);
                const docSnap = await getDoc(ref);

                if (docSnap.exists()) {
                    const supposeChats = docSnap.data()['SupposeChats'];
                    const opposeChats = docSnap.data()['OpposeChats'];
                    
                    const fetchedSupposeMessages = await Promise.all(supposeChats.map(bigUser));
                    console.log(fetchedSupposeMessages);

                    const fetchedOpposeMessages = await Promise.all(opposeChats.map(bigUser));
                    console.log(fetchedOpposeMessages);

                    const allMessages = [...fetchedSupposeMessages, ...fetchedOpposeMessages];
                    setMessages(allMessages);
                }
            } catch (error) {
                console.error('Error fetching initial chats: ', error);
            }
        };


        fetchInitialChats();
    }, [data]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
        setSupposeIs(e.target.value.toLowerCase().includes('suppose'));
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        console.log('messages', messages);
        setMessages([...messages, { text: newMessage, sender: 'me' }]);
        setNewMessage('');
        if (supposeIs) {
            try {
                const ref = doc(firestore, 'posts', data);
                await updateDoc(ref, {
                    SupposeChats: arrayUnion({
                        Message: newMessage,
                        UserId: user
                    }), // Replace with the field you want to update and its new value
                });
                console.log(user, 'Document successfully updated!');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
        else {
            try {
                const ref = doc(firestore, 'posts', data);
                await updateDoc(ref, {
                    OpposeChats: arrayUnion({
                        Message: newMessage,
                        UserId: user
                    }), // Replace with the field you want to update and its new value
                });

                console.log(user, 'Document successfully updated!');
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    };

    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: '40vh',
                    marginBottom: '25px',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#F2F2F2 transparent',
                }}
                ref={messagesRef}
                className={`scrollable-container scrolling`}
            >
                {messages.map((message, index) => (
                    <div
                        key={index}
                        style={{
                            alignSelf: message.sender === 'me' ?  'flex-end':'flex-start',
                            backgroundColor: message.sender === 'me' ? '#ecf0f1':'#3498db',
                            color: message.sender === 'me' ? '#2c3e50':'#ffffff',
                            borderRadius: '8px',
                            padding: '8px',
                            margin: '4px',
                            maxWidth: '70%',
                        }}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 'auto', display: 'flex' }}>
                <input
                    type="text"
                    id='msgInput'
                    value={newMessage}
                    onChange={handleInputChange}
                    style={{
                        flex: '2',
                        padding: '8px',
                        borderRadius: '4px',
                        margin: 5,
                        marginRight: 0,
                        position: 'absolute',
                        bottom: 5,
                        right: 100,
                        height: 35,
                        outline: 'none'
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{
                        backgroundColor: '#2ecc71',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: 'max-content',
                        margin: 5,
                        height: 35,
                        position: 'fixed',
                        bottom: 5,
                        right: 45,
                    }}
                >
                    <SendIcon />
                </button>
            </div>
        </>
    );
};

export default ChatComponent;
