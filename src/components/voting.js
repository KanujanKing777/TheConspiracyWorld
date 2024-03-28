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
      const [ConspiracyVotes, setConspiracyVotes] = useState(0);
      const [HypothesisVotes, setHypothesisVotes] = useState(0);
      const [MythVotes,       setMythVotes      ] = useState(0);

      const [userVote, setUserVote] = useState(null);
      useEffect(() => {
        // Fetch initial chat data when the component mounts
        const fetchInitialChats = async () => {
            try {
                const ref = doc(firestore, 'posts', docID.data);
                const docSnap = await getDoc(ref);

                if (docSnap.exists()) {
                    const x = docSnap.data()['ConspiracyVotes'];
                    const y = docSnap.data()['HypothesisVotes'];
                    const z = docSnap.data()['MythVotes'];
                    setConspiracyVotes(x);
                    setHypothesisVotes(y);
                    setMythVotes(z);
                }
            } catch (error) {
                console.error('Error fetching initial chats: ', error);
            }
        };


        fetchInitialChats();
    }, [docID.data]);
    
      

  const gradient = '#F2F2F2';
  
  const handleVote = async(voteType) => {
    if(userVote === 'conspiracy'){
      setConspiracyVotes(ConspiracyVotes - 1);
      const ref = doc(firestore, 'posts', docID.data);
      await updateDoc(ref, {
        ConspiracyVotes: ConspiracyVotes-1, // Replace with the field you want to update and its new value
      });
      document.getElementById('oppose').removeAttribute('style');
    }
    else if(userVote === 'hypothesis'){
      setHypothesisVotes(HypothesisVotes - 1);
        const ref = doc(firestore, 'posts', docID.data);
        await updateDoc(ref, {
            HypothesisVotes: HypothesisVotes-1, // Replace with the field you want to update and its new value
        });
        document.getElementById('support').removeAttribute('style');
    }
    else if(userVote === 'myth'){
      setMythVotes(MythVotes + 1);
      const ref = doc(firestore, 'posts', docID.data);
      await updateDoc(ref, {
        MythVotes: MythVotes+1, // Replace with the field you want to update and its new value
      });
      document.getElementById('myth').removeAttribute('style');
    }
    
      if (voteType === 'conspiracy') {
        setConspiracyVotes(ConspiracyVotes + 1);
        const ref = doc(firestore, 'posts', docID.data);
        await updateDoc(ref, {
          ConspiracyVotes: ConspiracyVotes+1, // Replace with the field you want to update and its new value
        });
        document.getElementById('oppose').style.background = gradient;
        document.getElementById('oppose').style.color = "black";

      } else if (voteType === 'hypothesis') {
        setHypothesisVotes(HypothesisVotes + 1);
        const ref = doc(firestore, 'posts', docID.data);
        await updateDoc(ref, {
            HypothesisVotes: HypothesisVotes+1, // Replace with the field you want to update and its new value
        });
        document.getElementById('support').style.background = gradient;
        document.getElementById('support').style.color = "black";
      }
      else{
        setMythVotes(MythVotes + 1);
        const ref = doc(firestore, 'posts', docID.data);
        await updateDoc(ref, {
          MythVotes: MythVotes+1, // Replace with the field you want to update and its new value
        });
        document.getElementById('myth').style.background = gradient;
        document.getElementById('myth').style.color = "black";
      }
      setUserVote(voteType);
    

  };
    
    

 
  

  return (
    <div className="voting-box">
      <div className="vote-counts" id='voting'> 
        <div className="support">
          <button
            onClick={() => handleVote('hypothesis')}
            
            id='support'
          >
            Hypothesis
          </button>
        </div>
        <div className="oppose">
          <button
            onClick={() => handleVote('conspiracy')}
            id='oppose'
          >
            Conspiracy
          </button>
        </div>
        <div className="oppose">
          <button
            onClick={() => handleVote('myth')}
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
