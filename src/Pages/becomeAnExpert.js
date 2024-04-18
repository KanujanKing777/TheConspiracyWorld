import './output.css';
import './output2.css';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationu
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

function ExpertPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userid = queryParams.get('userid');
    const categorieslist = [
        "Astrophysics", "Modern Physics", "Quantum Physics", "Biology", "Mathematics",
        "Genetics", "Medicine"
    ];
    var selectedlist = [];
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = 'Become an Expert';

        // Optionally reset the title when the component is unmounted
        return () => {
            document.title = 'The Conspiracy World';
        };
    }, []);
    return (
        <>
            <div className='funtableselect'>
                <div className='selectiontable'>
                    <h1 style={{
                        fontSize: "5vh",
                        textAlign: "center",
                        marginBottom: '2vh'
                    }}>Become An Expert</h1>
                    <p className="fundudede">Select Your Expertised Fields</p>
                    <ul style={{
                        marginTop: '0'
                    }} id='funfunfunxxx' class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">

                        {categorieslist.map((item, index) => (
                            <li style={{
                                margin: "1vh",
                            }} className='li' id={item.replace(" ", "")} key={index} onClick={() => {
                                var datanew = document.getElementById(item.replace(" ", "")).innerText;
                                if (datanew.includes('\u2713')) {
                                    document.getElementById(item.replace(" ", "")).innerText = datanew.replace('\u2713 ', '');
                                    selectedlist.pop(item);
                                } else {
                                    document.getElementById(item.replace(" ", "")).innerText = '\u2713 ' + datanew;
                                    selectedlist.push(item);
                                }
                            }}>{item}</li>
                        ))}


                    </ul>

                    <p className="fundudede">Describe your Talents</p>
                    <textarea style={{
                        backgroundColor: "#353535",
                        padding: "1vh",
                        width: "95%",
                        margin: "2vh",
                        resize: "none",
                        marginTop: "0"
                    }}
                        id='describedtalent'>

                    </textarea>
                    <ul id='funfunfunxxx' class="*:rounded-full *:border  *:px-2 *:py-0.5 dark:text-sky-300  "
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <li className='li' id='submitexpert' onClick={async () => {
                            var talents = document.getElementById('describedtalent').value;
                            console.log(selectedlist);
                            console.log(talents);
                            selectedlist =  selectedlist.map((ele) => {
                                return ele.replace(' ','')
                            });
                            await addDoc(collection(firestore, "experts"), {
                                User: userid,
                                ExpertAt:selectedlist.join(' '),
                                Talent: talents,
                            });
                            alert('Request Sent');
                        }}>Submit</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ExpertPage;