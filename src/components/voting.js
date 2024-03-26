import React, { useState, useEffect } from 'react';
import './voting.css';
import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

import 'firebase/firestore';
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


const VotingBox = (docID) => {
  const [supportVotes, setSupportVotes] = useState(0);
      const [opposeVotes, setOpposeVotes] = useState(0);
      const [userVote, setUserVote] = useState(null);
      useEffect(() => {
        // Fetch initial chat data when the component mounts
        const fetchInitialChats = async () => {
            try {
                const ref = doc(firestore, 'posts', docID.data);
                const docSnap = await getDoc(ref);

                if (docSnap.exists()) {
                    const x = docSnap.data()['SupposeVotes'];
                    const y = docSnap.data()['OpposeVotes'];
                    setSupportVotes(x);
                    setOpposeVotes(y);
                }
            } catch (error) {
                console.error('Error fetching initial chats: ', error);
            }
        };


        fetchInitialChats();
    }, [docID.data]);
    
      

  const totalVotes = supportVotes + opposeVotes;
  const supportPercentage = totalVotes === 0 ? 0 : (supportVotes / totalVotes) * 100;
  const opposePercentage = totalVotes === 0 ? 0 : (opposeVotes / totalVotes) * 100;
  const gradient = '#F2F2F2';
  
  const handleVote = async(voteType) => {
    if (userVote === null) {
      if (voteType === 'support') {
        setSupportVotes(supportVotes + 1);
        const ref = doc(firestore, 'posts', docID.data);
        await updateDoc(ref, {
            SupposeVotes: supportVotes+1, // Replace with the field you want to update and its new value
        });
        document.getElementById('support').style.background = gradient;
        document.getElementById('support').style.color = "black";

      } else if (voteType === 'oppose') {
        setOpposeVotes(opposeVotes + 1);
        const ref = doc(firestore, 'posts', docID.data);
        await updateDoc(ref, {
            OpposeVotes: opposeVotes+1, // Replace with the field you want to update and its new value
        });
        document.getElementById('oppose').style.background = gradient;
        document.getElementById('oppose').style.color = "black";
      }
      else{
        document.getElementById('myth').style.background = gradient;
        document.getElementById('myth').style.color = "black";
      }
      setUserVote(voteType);
      
    }
  };
    
    

 
  

  return (
    <div className="voting-box">
      <div className="vote-counts" id='voting'> 
        <div className="support">
          <button
            onClick={() => handleVote('support')}
            disabled={userVote !== null}
            
            id='support'
          >
            Hypothesis
          </button>
        </div>
        <div className="oppose">
          <button
            onClick={() => handleVote('oppose')}
            disabled={userVote !== null}
            id='oppose'
          >
            Conspiracy
          </button>
        </div>
        <div className="oppose">
          <button
            onClick={() => handleVote('myth')}
            disabled={userVote !== null}
            id='myth'
          >
            Myth
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default VotingBox;
