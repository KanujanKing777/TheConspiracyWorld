import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from 'react-router-dom';
import Notification from "../../components/Notification";
import './post.css';
import shareicon from "../../components/Icons/ShareIcon";
import ChatComponent from "../../components/chatting";
import ShareIcon from "../../components/Icons/ShareIcon";
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

function PostClient() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postid = queryParams.get('postid');
    const userid = queryParams.get('userid');
    const [activeTab, setActiveTab] = useState("tab0"); // Default active tab

    const [post, setPost] = useState({ Title: "", Content: "", Reference: ""});
    const [Likes, setLikes] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const documentRef = doc(firestore, 'posts', postid);
                const data = await getDoc(documentRef);

                if (data.exists()) {
                    const postData = data.data();
                    setLikes(data.data()['Likes']);
                    setPost(postData);
                } else {
                    console.log("Document does not exist");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchData();
    }, [firestore, postid]);
    useEffect(() => {
        var a = document.getElementById('likebutton');
        if (Likes.includes(userid)) {
            a.innerHTML = '❤️Like';
            
        } else {
            a.innerHTML = '🤍Like';
        }
    });
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = post.Title;

        // Optionally reset the title when the component is unmounted
        return () => {
            document.title = 'The Conspiracy World';
        };
    }, []);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const copyfun = () => {
        var text = document.URL;
        var ntext = text.substring(0, text.length - 20);
        ntext = ntext + 'guest';
        navigator.clipboard.writeText(ntext);
        document.getElementById('notification').style.display = 'block';
        setTimeout(function () {
            // Your code to execute after 1 second
            document.getElementById('notification').style.display = 'none';
        }, 2000);
    }
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = post.Title;

        // Optionally reset the title when the component is unmounted
        return () => {
            document.title = 'The Conspiracy World';
        };
    }, [post.Title]);
    useEffect(()=>{
        var text = post.Reference;
        text = text.replace(' ', '');
        const References = text.split(',');
        const container = document.getElementById('refContainer');
        References.forEach((string) => {
            if(string === ''){

            }
            else{
                if(container.innerHTML.includes(string)){

                }else{
                    const a = document.createElement('a');
                    a.href = string;
                    a.textContent = string;
                    a.text = string;
                    a.target = "_blank";
                    
                    container.append(a);
                    container.append(document.createElement('br'));
                }
                
            }
            
            
        });
    });
    const openPopup = () => {
        document.getElementById('popup').style.display = 'block';
        handleTabClick("tab3");
    }

    // Function to close the popup
    const closePopup = () => {
        document.getElementById('popup').style.display = 'none';
        setActiveTab('tab0');
    }
    
    return (
        <>
            <div className="postbox">
                <div className="box">
                    <div className="post-box">
                        <h2 className="post-title">{post.Title}</h2>
                        <p style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#F2F2F2 transparent',
                        }} className="post-contentx">{post.Content}</p>
                        
                        
                        <div className="ref" id="refContainer">References <br></br></div>
                        <div className="tabs sticky">
                            <div className={`tab ${activeTab === "tab1" ? "active" : ""}`} id="likebutton" onClick={async () => {
                                var a = document.getElementById('likebutton');
                                
                                    handleTabClick("tab1")
                                    if (a.innerHTML === '❤️Like') {
                                        const documentRef = doc(firestore, 'posts', postid);
                                        await updateDoc(documentRef, {
                                            Likes: Likes.replace(userid, ''),
                                        });
                                        a.innerHTML = '🤍Like';
                                        setActiveTab('tab0');
                                    } else {
                                        const documentRef = doc(firestore, 'posts', postid);
                                        await updateDoc(documentRef, {
                                            Likes: Likes + ' ' + userid,
                                        });
                                        a.innerHTML = '❤️Like';

                                    }
                                    
                                
                            }}></div>
                            <div className={`tab ${activeTab === "tab2" ? "active" : ""}`} onClick={() => handleTabClick("tab2")}>💬Comment</div>
                            <div className={`tab ${activeTab === "tab3" ? "active" : ""}`} onClick={() => handleTabClick('tab3')}><ShareIcon /> Share</div>
                        </div>
                        <div className="tabContent">
                            {activeTab === "tab1" && <div className="tabc"></div>}
                            {activeTab === "tab2" && <div className="tabc" id="ref" ><ChatComponent data={postid} userid={userid} /></div>}
                            {activeTab === "tab3" && <div className="tabc" > 
                                <div id="popup" className="popup">
                                    Copy URL
                                    <button type="button" onClick={copyfun}>📄 Copy Link</button>
                                </div>
                            </div>}
                        </div>
                    </div>
                   
                    <Notification data={"URL Copied"}></Notification>
                </div>
            </div>
        </>
    );
}


export default PostClient;