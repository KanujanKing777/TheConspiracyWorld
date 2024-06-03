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

const ChatComponent = ({data, userid}) => {
    const [messages, setMessages] = useState([]);
    var [newMessage, setNewMessage] = useState('');
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
            if(userid === value['UserId']){
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
                    const supposeChats = docSnap.data()['Chats'];
                    
                    const fetchedSupposeMessages = await Promise.all(supposeChats.map(bigUser));

                    if(fetchedSupposeMessages.length === 0){
                        document.getElementById('chatboxi').style.height = 'max-content';
                    }
                    setMessages(fetchedSupposeMessages);
                }
            } catch (error) {
                console.error('Error fetching initial chats: ', error);
            }
        };


        fetchInitialChats();
    }, [data]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        setMessages([...messages, { text: newMessage, sender: 'me' }]);
        setNewMessage('');
            try {
                const ref = doc(firestore, 'posts', data);
                console.log('newmessage ' + newMessage);
                console.log('userId ' + userid);
                await updateDoc(ref, {
                    Chats: arrayUnion({
                        Message: newMessage,
                        UserId: userid
                    }), // Replace with the field you want to update and its new value
                });
                document.getElementById('chatboxi').style.height = '40vh';
            } catch (error) {
                console.error('Error updating document: ', error);
            }
            
        
    };
    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: 'max-content',
                    marginBottom: '25px',
                    borderRadius: '8px',
                    overflowY: 'auto',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#F2F2F2 transparent',
                }}
                id='chatboxi'
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
                            paddingTop:"0",
                            margin: '4px',
                            maxWidth: '70%',
                        }}
                    >
                        <div style={{
                            textAlign:"right",
                            margin:"0",
                            padding:"0"}}><img style={{display:"inline"}} src='https://cdn-icons-png.freepik.com/256/1077/1077114.png' width={15}></img>
                            <p style={{
                                color:"blue",
                                display:"inline"
                            }}>{message.sender}</p></div>
                        
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
                        outline: 'none',
                        color:"black"
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
