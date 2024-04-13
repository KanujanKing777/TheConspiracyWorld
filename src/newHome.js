import {React,useEffect, useState} from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import './newHome.css';
import Layout2 from "./Layout/Layout2";
import { useNavigate, useLocation } from "react-router-dom";
import ShareIcon from "./components/Icons/ShareIcon";
import FloatingButton from "./components/floatingButton";
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
    

async function getUserName(id){
    var name = "Anonymous";
    const userDocRef = doc(firestore, 'users', id);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      name = userDocSnapshot.data()['Name'];
    } else {
      console.log('No such user!');
    }
    return name;
}

function NewHome(){
    const [posts, getPost] = useState([]);
    const [names, getNames] = useState([]);
    const [activeTab, setActiveTab] = useState("tab0"); // Default active tab
    const [Likes, setLikes] = useState("");

    const handleTabClick = (tab) => {
      setActiveTab(tab);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const q = query(collection(firestore, "posts"), limit(5));
        const querySnapshot = await getDocs(q);

        const fetchedPosts = querySnapshot.docs.map((doc) => (doc));

        getPost(fetchedPosts);

        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostData();
  }, [firestore]); 
  useEffect(()=>{
    const fetchUserData = async()=>{
        try{
        const namePromises = posts.map(async (post) => {
            const userDocRef = doc(firestore, 'users', post.data()['UserId']);
            const userDocSnapshot = await getDoc(userDocRef);
            return userDocSnapshot.exists() ? userDocSnapshot.data()['Name'] : 'Anonymous';
          });
          const fetchedNames = await Promise.all(namePromises);
          getNames(fetchedNames);
        }
        catch(err){
            console.error('hi' + err);
        }
    };
    fetchUserData();
  }, [posts]);
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = "Home";
    
        // Optionally reset the title when the component is unmounted
        return () => {
          document.title = 'The Conspiracy World';
        };
      }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userid = queryParams.get('userid');
    const usertype = queryParams.get('usertype');
    
    function postClick(id){
        if(usertype === 'normal'){
            var str = '/post?postid=' + id + '&userid=' + userid;
            navigate(str);
        }
        else{
            str = '/postExpert?postid=' + id + '&userid=' + userid;
            navigate(str);
        }
        
    }
    
    return (
        
        <>
        <Layout2/>
        <div className="postbox">
            <div className="posts" >
                {posts.map((box, id) => (
                    <div key={box} className="box">
                        <div className="post-box" onClick={postClick.bind(null, box.id)} >
                        <img style={{
                            display:"inline",
                            marginRight:"1px"
                        }} src="/user.png" alt="Profile" width={35}/>
<h2 style={{
                            color:"white",
                            textAlign:"left",
                            fontSize:"115%",
                            display:"inline"
                        }}>{names[id]}</h2>

                            
                            <h2 className="post-title">{box.data()['Title']}</h2>
                            <p className="post-content">{box.data()['Content']}</p>
                            <div style={{display:"flex"}}>
                            
                             <div className={`tab ${activeTab === "tab1" ? "active" : ""}`} id="likebutton">
                             🤍Like</div>
                              <div className={`tab ${activeTab === "tab2" ? "active" : ""}`} >💬Comment</div>
                              <div className={`tab ${activeTab === "tab3" ? "active" : ""}`} ><ShareIcon /> Share</div>
                              <div style={{
                                backgroundColor:
                                (box.data()['HypothesisVotes']>box.data()['ConspiracyVotes'])&&(box.data()['HypothesisVotes']>box.data()['MythVotes'])?
                                "green":
                                (box.data()['ConspiracyVotes']>box.data()['HypothesisVotes'])&&(box.data()['ConspiracyVotes']>box.data()['MythVotes'])?
                                "blue":
                                (box.data()['MythVotes']>box.data()['HypothesisVotes'])&&(box.data()['MythVotes']>box.data()['ConspiracyVotes'])?
                                "red":"black",
                                width:"max-content",
                                padding:"1%",
                                margin:"1%",
                                marginTop:"1.5%",
                                height:"max-content",
                                borderRadius:"15px",
                              }}>{
                                (box.data()['HypothesisVotes']>box.data()['ConspiracyVotes'])&&(box.data()['HypothesisVotes']>box.data()['MythVotes'])
                                ?"Hypothesis":
                                (box.data()['ConspiracyVotes']>box.data()['HypothesisVotes'])&&(box.data()['ConspiracyVotes']>box.data()['MythVotes'])?
                                "Conspiracy":
                                (box.data()['MythVotes']>box.data()['HypothesisVotes'])&&(box.data()['MythVotes']>box.data()['ConspiracyVotes'])?
                                
                                "Myth":"Pending"
                              } </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            <FloatingButton idbro={userid} usertypebro={usertype}/>

        </div>
        </>
    );
}

export default NewHome;