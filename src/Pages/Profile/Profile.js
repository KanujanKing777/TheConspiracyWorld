import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


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

  
function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userid');
  const usertype = queryParams.get('type');
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(firestore, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const q = query(collection(firestore, "posts"), where('UserId', '==', userId));
        const querySnapshot = await getDocs(q);
        
          const posts = [];
          querySnapshot.forEach((doc) => {
            posts.push(doc);
          });
          setPostData(posts);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPostData();
  }, [userId]);
  function postClick(id){
    if(usertype === 'normal'){
        var str = '/post?postid=' + id + '&userid=' + userId;
        navigate(str);
    }
    else{
        str = '/postExpert?postid=' + id + '&userid=' + userId;
        navigate(str);
    }
    
}
  return (
    
    <div>
      {/* Render user data */}
      {userData && (
        <div>
          <h1>User Profile</h1>
          <p>Name: {userData.Name}</p>
          <p>Email: {userData.Email}</p>
          <h1>Posts</h1>
          {/* Render post data */}
          {postData.length > 0 ? (
            postData.map((box) => (
              <div key={box} className="box">
                <div className="post-box" onClick={postClick.bind(null, box.id)}>
                  <h2 className="post-title">{box.data()['Title']}</h2>
                  <p className="post-content">{box.data()['Content']}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
