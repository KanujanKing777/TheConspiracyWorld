import {React, useEffect} from "react";
import './newpost.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useLocation, useNavigate } from 'react-router-dom';
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

function Newpost() {
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = "New Post";
    
        // Optionally reset the title when the component is unmounted
        return () => {
          document.title = 'The Conspiracy World';
        };
      }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userid = queryParams.get('userid');
    const usertype= queryParams.get('usertype');
    console.log('userid: '+userid);
    async function PostTheory() {
        var reference = document.getElementById('refp').innerHTML;
        reference = reference.replace(/<br>/g, ',');
        if (reference.endsWith(',')) {
            reference = reference.slice(0, -1);
        }
        var content = document.getElementById('content').value;
        var title = document.getElementById('title').value;
        const Data = {
            Title: title,
            Content: content,
            Reference: reference,
            Likes: "",
            HypothesisVotes: 0,
            ConspiracyVotes: 0,
            MythVotes: 0,
            UserId: userid,
            Chats: [],
            CreatedDT:Timestamp.now()
        };
        try{
            await addDoc(collection(firestore,'posts'), Data);
            alert('Post saved');
            navigate('/home?userid='+userid+'&usertype='+usertype);
        }
        catch(error){
            alert(error.message);
        }
        
    }


    function add() {
        var p = document.getElementById('refp');
        p.style.display = "block";
        var data = document.getElementById('ref-in').value;
        if (data.startsWith('http')) {
            if (
                data.includes('facebook.com') || data.includes('instagram.com') ||
                data.includes('youtube.com') || data.includes('twitter.com') ||
                data.includes('snapchat.com') || data.includes('reddit.com') ||
                data.includes('whatsapp.com')) {
                alert('Social Media posts cannot be considered as a reference.');
            }
            else {
                p.innerHTML += data + "<br>";
            }

        }
        else {
            alert('This is not a valid url');
        }

    }
    return (
        <div className="body">
            <div className="form">
                <form>
                    <div className="Title">
                        <label>Title: </label>
                        <input id='title' className="text-input" type="text" />
                    </div>
                    <label>Content:</label>
                    <textarea id="content" /><br />
                    <label>References:</label>
                    <div className="title">
                        <input className="text-input" id="ref-in" type="text" />
                        <button className="add" onClick={add} type="button" style={{
                            fontSize: "150%",
                            paddingLeft:"2%",
                            paddingRight:"2%",
                            width:"max-content",
                            backgroundColor: "#555555",
                            color:"InfoBackground",
                            borderRadius:"5px"
                        }}>+</button>
                        <div id="refp" hidden> </div>
                    </div>

                    <button type="button" className="Post" onClick={PostTheory} style={{
                        fontSize: "100%",
                        width: "100%",
                        padding: "1%",
                        textAlign:"center",
                        marginTop:"2%",
                        border:"1px solid white"
                    }}>Post</button>
                </form>
            </div>
        </div>
    );
}

export default Newpost;