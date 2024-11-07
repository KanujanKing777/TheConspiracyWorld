import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, query, collection, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Layout2 from '../../Layout/Layout2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


import './Profile.css';
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
  const usertype = queryParams.get('usertype');
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  const [editPost, setEditPost] = useState(null);



  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setUserData(userDocSnapshot.data());
      } else {
        console.log('No such user document!');
      }
    };
    fetchUserData();
  }, [userId]);

  const fetchPostData = async () => {
    try {
      const q = query(collection(firestore, "posts"), where('UserId', '==', userId));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Access document data
      }));
      setPostData(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPostData(); // Fetch posts on mount
  }, [userId]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(firestore, "posts", postId));
      fetchPostData(); // Refresh data after delete
      alert("Post deleted successfully!");
    }
  };

  const handleEditClick = (post) => {
    setEditPost(post);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();
    var reference = e.target.reference.value.trim();
    reference = reference.replace(/<br>/g, ',');
    if (reference.endsWith(',')) {
      reference = reference.slice(0, -1);
    }
    if (!title || title == " " || !content || content == " " || !reference || reference == " ") {
      alert('Please fill in all fields.');
      return;
    }

    const updatedData = {
      Title: title,
      Content: content,
      Reference: reference,
    };


    const postRef = doc(firestore, 'posts', editPost.id);
    await updateDoc(postRef, updatedData);
    setEditPost(null);
    fetchPostData(); // Re-fetch posts after update
  };

  const postClick = (id) => {
    navigate(`/post${usertype === 'normal' ? '' : 'Expert'}?postid=${id}&userid=${userId}`);
  };

  return (
    <div>
      <Layout2 />
      {userData && (
        <div className="profile-container">
          <img className="profile-picture" src="user.png" alt="Profile" />
          <div className="user-info">
            <h2>{userData.Name}</h2>
            <p>{userData.Email}</p>
          </div>
          <div id='postsection' className="placeholder-content">
            {postData.length > 0 ? (
              postData.map((box) => (
                <div key={box.id} className="box">
                  <div className="post-box" onClick={() => postClick(box.id)}>
                    <div className="post-header">
                      <h2 style={{
                        backgroundColor: (box.HypothesisVotes > box.ConspiracyVotes && box.HypothesisVotes > box.MythVotes) ? "green" :
                          (box.ConspiracyVotes > box.HypothesisVotes && box.ConspiracyVotes > box.MythVotes) ? "blue" :
                            (box.MythVotes > box.HypothesisVotes && box.MythVotes > box.ConspiracyVotes) ? "red" : "grey",
                        width: "max-content",
                        padding: "1%",
                        borderRadius: "15px",
                      }}>
                        {(box.HypothesisVotes > box.ConspiracyVotes && box.HypothesisVotes > box.MythVotes) ? "Hypothesis" :
                          (box.ConspiracyVotes > box.HypothesisVotes && box.ConspiracyVotes > box.MythVotes) ? "Conspiracy" :
                            (box.MythVotes > box.HypothesisVotes && box.MythVotes > box.ConspiracyVotes) ? "Myth" : "Pending"}
                      </h2>
                      <div className="post-icons">
                        <FontAwesomeIcon icon={faEdit} className="icon edit-icon" onClick={(e) => { e.stopPropagation(); handleEditClick(box); }} />
                        <FontAwesomeIcon icon={faTrash} className="icon delete-icon" onClick={(e) => { e.stopPropagation(); handleDelete(box.id); }} />
                      </div>
                    </div>
                    <h2 className="post-title">{box.Title}</h2>
                    <p className="post-content">{box.Content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
          {editPost && (
            <div className="edit-form-container">
              <h2>Edit Post</h2>
              <form onSubmit={handleEditSubmit}>
                <label>Title:</label>
                <input type="text" name="title" defaultValue={editPost.Title} />
                <label>Content:</label>
                <textarea name="content" defaultValue={editPost.Content} />
                <label>References:</label>
                <input type="text" name="reference" defaultValue={editPost.Reference} />
                <div className="button-group">
                  <button type="submit" className="save-button">Update Post</button>
                  <button type="button" className="cancel-button" onClick={() => setEditPost(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
