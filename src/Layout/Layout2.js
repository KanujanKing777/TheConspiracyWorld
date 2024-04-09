import './Layout2.css'; // Create a separate CSS file for styling
import { BrowserRouter as Router, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Layout2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userid = queryParams.get('userid');
    const usertype = queryParams.get('usertype');

    function themeChange() {
        document.body.style.backgroundColor = "#ddd";
        document.body.style.color = "#333";
        var element = document.querySelector('.navbar');
        element.style.backgroundColor = 'white';
        element.style.color = 'black';
        document.querySelector('h1').style.color = 'black';
        document.getElementById('day').hidden = false;
        document.getElementById('night').hidden = true;

        var posts = document.querySelectorAll('.post-box');
        posts.forEach(function(post){
            post.style.color = '#333';
            post.style.backgroundColor = '#eee';
            post.style.border = '1px solid #bbb';
        });
        var postss = document.querySelectorAll('.post-box:hover');
        postss.forEach(function(post){
            post.style.backgroundColor = '#ddd';
        });
        
        

    }
    function themeChange2() {
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "white";
        var element = document.querySelector('.navbar');
        element.style.backgroundColor = '#000';
        element.style.color = 'white';
        document.querySelector('h1').style.color = 'white';
        document.getElementById('day').hidden = true;
        document.getElementById('night').hidden = false;

        var posts = document.querySelectorAll('.post-box');
        posts.forEach(function(post){
            post.style.color = 'white';
            post.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            post.style.border = '1px solid #555';
        });
        var postss = document.querySelectorAll('.post-box:hover');
        postss.forEach(function(post){
            post.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

    }
    return (
        <div>
            <nav className="navbar">
                <div className="left-section">
                    <img src='/yinyang.png' className='App-logo' alt='logo' />
                    <h1 className='h1'>The Conspiracy World</h1>
                    <button style={{
                        marginLeft:"45px"
                    }} type='button'>&#127968;Home</button>
                    <button style={{
                        marginLeft:"15px"
                    }} type='button'>&#128269;Search</button>
                    <button style={{
                        marginLeft:"15px"
                    }} type='button' onClick={()=>{
                        navigate('/profile?userid='+userid+'&type='+usertype);
                    }}>&#x1F464;Profile</button>

                </div>

                <span className="right-section">
                    <ul className="nav-list">
                        <button style={{
                            
                        }}  type='button' id='experti' onClick={()=>{
                            navigate('/becomeanexpert?userid='+userid+'');
                        }}>
                            Become An Expert
                        </button>
                        <button id='day'  type='button' onClick={themeChange2} hidden>
                            &#127769;
                        </button>
                        <button id='night' type='button' onClick={themeChange}>
                            &#9728;
                        </button>
                    </ul>
                </span>
            </nav >

        </div>
    );
};

export default Layout2;
