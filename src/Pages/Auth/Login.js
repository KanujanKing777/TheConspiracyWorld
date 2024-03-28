import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import './Singup.css'; // Import the CSS file
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Notification from '../../components/Notification';
import { collection, addDoc, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const userdata = {};
      const usernameid = {};
      const usertypes = {};
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        usernameid[doc.data()['Name']] = doc.id;
        userdata[doc.data()['Name']] = doc.data()['Password'];
        usertypes[doc.data()['Name']] = doc.data()['type'];
      });
      if (userdata[username] === password) {
        
        var str = '/home?userid='+usernameid[username]+'&usertype='+usertypes[username];
        navigate(str);
      }
      else {
        alert('Wrong UserName or Password');
      }

    } catch (error) {
      console.error('Error storing user details:', error.message);
    }
  }
  useEffect(() => {
    // Set the document title when the component is mounted
    document.title = 'Log in';

    // Optionally reset the title when the component is unmounted
    return () => {
      document.title = 'The Conspiracy World';
    };
  }, []);


  return (
    <div className='whole' style={{
      padding:"1vh"
    }}>
      <div className="signup-container">
        <form className="signup-form">
          <h2>Log in</h2>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />



          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password"
            value={password}
            style={{
              color:"black"
            }}
            onChange={(e) => setPassword(e.target.value)}
            required />


          <button id='loginbutton' type="submit" onClick={handleFormSubmit}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
