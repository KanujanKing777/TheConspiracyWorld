import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import './Singup.css'; // Import the CSS file
// Import the functions you need from the SDKs you need
import Notification from '../../components/Notification';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { login } from "../../authService";
import { loginWithGoogle } from "../../authService";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const handleGoogleSignIn = async () => {
  try {
    await loginWithGoogle();
    alert("Google sign-in successful!");
  } catch (error) {
    alert("Error signing in with Google: " + error.message);
  }

  // var str = '/home?userid=' + usernameid[username] + '&usertype=' + usertypes[username];
  // navigate(str);
};


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      console.log("data", data)
      alert("Login successful!");
    }
    catch (error) {
      alert("Error logging in: " + error.message);
    }

    // var str = '/home?userid=' + usernameid[username] + '&usertype=' + usertypes[username];
    // navigate(str);
  }
  useEffect(() => {

    document.title = 'Log in';


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
          <label htmlFor="username">Email</label>
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
          <button id='loginGooglebutton' type="submit" onClick={handleGoogleSignIn}>Log In with Google</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
