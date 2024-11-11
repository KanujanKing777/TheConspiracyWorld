import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import './Singup.css'; // Import the CSS file
// Import the functions you need from the SDKs you need
import Notification from '../../components/Notification';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { login } from "../authService";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      alert("Login successful!");
    } 
    catch (error) {
      alert("Error logging in: " + error.message);
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
      padding: "1vh"
    }}>
      <div className="signup-container">
        <form className="signup-form">
          <h2 style={{
            textAlign: 'center',
            fontSize: '5vh'
          }}>Log in</h2>
          <label htmlFor="username">Username</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='formlogininput' required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className='formlogininput'
            value={password}
            style={{
              color: "black"
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
