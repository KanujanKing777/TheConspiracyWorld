import React, {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Layout2 from "../../Layout/Layout2";
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyCXoH3sRAs9i0aPMRgNCHjNAvnWIzAaT3Y",
    authDomain: "thespaceforconspiracy.firebaseapp.com",
    projectId: "thespaceforconspiracy",
    storageBucket: "thespaceforconspiracy.appspot.com",
    messagingSenderId: "652964257001",
    appId: "1:652964257001:web:461022b1e74763eff3a478"
  };

  const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function Search(){
    const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userid');
  const usertype = queryParams.get('usertype');
  var searchterm = (queryParams.get('term') === null)?"":queryParams.get('term');
  const [postData, setPostData] = useState([]);
  const [names, getNames] = useState([])

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const q = query(collection(firestore, "posts"));
        const querySnapshot = await getDocs(q);
        
          const posts = [];
          querySnapshot.forEach((doc) => {
            var title = doc.data()['Title'];
            if(title.includes(searchterm)){
                posts.push(doc);
            }
            var content = doc.data()['Content'];
            if(content.includes(searchterm)){
                posts.push(doc);
            }
          });
          setPostData(posts);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostData();
  }, [searchterm]);
  useEffect(()=>{
    const fetchUserData = async()=>{
        try{
        const namePromises = postData.map(async (post) => {
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
  }, [postData]);
  function postClick(id){
    if(usertype === 'normal'){
        var str = '/post?postid=' + id + '&userid=' + userId;
        navigate(str);
    }
    else{
        str = '/postExpert?postid=' + id + '&userid=' + userId;
        navigate(str);
    }}
    return (
        <>
        <Layout2/>
        {postData.length > 0 ? (
            postData.map((box, id) => (
              <div key={box} className="box">
                        <div className="post-box" onClick={postClick.bind(null, box.id)} >
                        <img style={{
                            display:"inline",
                            marginRight:"1px"
                        }} src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=EBuuBNxzjeKhkQ&pid=ImgRaw&r=0" alt="Profile Picture" width={35}/>
<h2 style={{
                            color:"white",
                            textAlign:"left",
                            fontSize:"115%",
                            display:"inline"
                        }}>{names[id]}</h2>

                            
                            <h2 className="post-title">{box.data()['Title']}</h2>
                            <p className="post-content">{box.data()['Content']}</p>
                            <h2 style={{
                            backgroundColor:
                            (box.data()['HypothesisVotes']>box.data()['ConspiracyVotes'])&&(box.data()['HypothesisVotes']>box.data()['MythVotes'])?
                            "green":
                            (box.data()['ConspiracyVotes']>box.data()['HypothesisVotes'])&&(box.data()['ConspiracyVotes']>box.data()['MythVotes'])?
                            "blue":
                            (box.data()['MythVotes']>box.data()['HypothesisVotes'])&&(box.data()['MythVotes']>box.data()['ConspiracyVotes'])?
                            "red":"black",
                            width:"max-content",
                            padding:"1%",
                            borderRadius:"15px",
                            marginLeft:"85%"
                        }}>{
                            (box.data()['HypothesisVotes']>box.data()['ConspiracyVotes'])&&(box.data()['HypothesisVotes']>box.data()['MythVotes'])
                            ?"Hypothesis":
                            (box.data()['ConspiracyVotes']>box.data()['HypothesisVotes'])&&(box.data()['ConspiracyVotes']>box.data()['MythVotes'])?
                            "Conspiracy":
                            (box.data()['MythVotes']>box.data()['HypothesisVotes'])&&(box.data()['MythVotes']>box.data()['ConspiracyVotes'])?
                            
                            "Myth":"Pending"
                            } </h2>
                        </div>
                    </div>
            ))
          ) : (
            <p style={{marginLeft:"15px"}}>No Results found.</p>
          )}
        </>
    );
}

export default Search;