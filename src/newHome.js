import {React,useEffect} from "react";
import { collection, query, getDocs, limit } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import './newHome.css';
import Layout2 from "./Layout/Layout2";
import { useNavigate, useLocation } from "react-router-dom";
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
    
const q = query(collection(firestore, "posts"), limit(5));
const querySnapshot = await getDocs(q);
var array = [];
querySnapshot.forEach((doc) => {
  array.push(doc);
});
function NewHome(){
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
                {array.map((box) => (
                    <div key={box} className="box">
                        <div className="post-box" onClick={postClick.bind(null, box.id)}>
                            <h2 className="post-title">{box.data()['Title']}</h2>
                            <p className="post-content">{box.data()['Content']}</p>
                        </div>
                    </div>
                ))}
            </div>
            <FloatingButton data={userid}/>

        </div>
        </>
    );
}

export default NewHome;