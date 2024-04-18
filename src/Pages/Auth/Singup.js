import React, {useEffect, useState} from 'react';
import './Singup.css'; // Import the CSS file
// Import the functions you need from the SDKs you need
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

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
function Signup(){
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function handleFormSubmit(e){
    e.preventDefault();

    try {
      if(password === passwordConfirm){
        await addDoc(collection(firestore, "users"), {
          Name:username,
          Email:email,
          Password:password,
          type:"normal"
        });
        
        navigate('/login');
      }
      else{
        var fake = document.getElementById('confirmPassword');
        fake.innerHTML = "Password doesn't match";
        fake.style.fontWeight += "bold";
        function blink(){
          fake.style.opacity = 0;
        }
        function fold(){
          fake.style.opacity = 1;
        }
        setTimeout(blink,10);
        setTimeout(fold,2000);
      }
      
    } catch (error) {
      console.error('Error storing user details:', error.message);
    }
  }
  useEffect(() => {
    // Set the document title when the component is mounted
    document.title = 'Sign up';

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
        <h2  style={{
            textAlign:'center',
            fontSize:'5vh'
          }}>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='formlogininput'
          required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='formlogininput'
          required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='formlogininput'
          required style={{
            color:"black"
          }}/>

        <label htmlFor="confirmPassword" id='confirmPassword'>Confirm Password:</label>
        <input type="password" name="confirmPassword" 
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className='formlogininput'
          required />
        <button id='loginbutton' type="submit" onClick={handleFormSubmit}>Sign Up</button>
      </form>
    </div>
    </div>
  );
}

export default Signup;
