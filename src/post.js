import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useLocation, useNavigate } from 'react-router-dom';
import './post.css';
import VotingBox from "./components/voting";
import ChatComponent from "./components/chatting";
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

function Post() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postid = queryParams.get('postid');
    const userid= queryParams.get('userid');
    const [activeTab, setActiveTab] = useState("tab1"); // Default active tab

    const [post, setPost] = useState({ Title: "", Content: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const documentRef = doc(firestore, 'posts', postid);
                const data = await getDoc(documentRef);

                if (data.exists()) {
                    const postData = data.data();
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
    function formatReference() {
        var s = post.Reference;
        // Split the text at commas
        const chunks = s.split(',');

        // Remove symbols from each chunk and join with <a> tags and <br> tags
        const result = chunks
            .map(chunk => {
                if (chunk.startsWith(' ')) {
                    chunk = chunk.replace(' ', '');
                }
                // Remove symbols from the chunk using a regular expression

                // Create the <a> tag with the cleaned chunk
                return `<a class="a" target="blank" href="${chunk}">${chunk}</a>`;
            })
            .join("<br>");

        return result;

    }
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = post.Title;
    
        // Optionally reset the title when the component is unmounted
        return () => {
          document.title = 'The Conspiracy World';
        };
      }, [post.Title]);
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
                        
                        <div className="tabs">
                            <div className={`tab ${activeTab === "tab1" ? "active" : ""}`} onClick={() => handleTabClick("tab1")}>💬</div>
                            <div className={`tab ${activeTab === "tab2" ? "active" : ""}`} onClick={() => handleTabClick("tab2")}>📚</div>
                            <div className={`tab ${activeTab === "tab3" ? "active" : ""}`} onClick={() => handleTabClick("tab3")}>🗳️</div>
                        </div>
                        <div className="tabContent">
                            {activeTab === "tab1" && <div className="tabc"><ChatComponent data={postid} user={userid}/></div>}
                            {activeTab === "tab2" && <div className="tabc" id="ref" dangerouslySetInnerHTML={{ __html: formatReference() }}></div>}
                            {activeTab === "tab3" && <div className="tabc"><VotingBox data={postid} /></div>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}


export default Post;