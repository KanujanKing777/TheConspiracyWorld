import React from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import './homecontent.css';
const HomePageContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <div className="container">
          <div className="leftC">
            <p>
              Are you a person wondering about the Conspiracy Theories that surround us?

            </p>
          </div>
          <div className="rightC">
            <img id='pyramid' src='/intrp.jpg' style={{
              width: "100%"
            }} className='imgPic' alt='img1' />
          </div>
        </div>
        <div className="container">

          <div className="leftC">
            <img id='flat' src='/flat.jpg' className='imgPic' alt='img1' />

          </div>
          <div className="rightC">
            <p>
              And aware of the fact that some of the well known theories of today was once been conspiracy theories?
            </p>
          </div>
        </div>
        <div id="thelast" className='container'>

          <div className='leftC' style={{ padding: "1%" }}>

            <img id='reallogo' src='/yinyang.png' className='App-logo' alt='logo' />
            <h1 className="h1" style={{ display: "inline", fontSize: "120%" }}>The Conspiracy World</h1>
            <div style={{ height: "2vh" }}></div>
            <p style={{ padding: "1%" }}>A dynamic platform designed for intelligent minds like you to Explore, Engage and Empower conspiracy theories with expert precision!
            </p>
          </div>
          <div className='rightC'>
            <img src='/funfadafun.jpg' className='imgPic' alt='img1' />
          </div>
        </div>

        <br />
      </div>
      <div style={{
        height: "120vh",
        display: "flex",
        margin: "0",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(sci.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <button type='button' style={{
          fontSize: "250%",
          width: "max-content",
          padding: "1%"
        }}
          onClick={function () {
            navigate('/signup');
          }}>
          Try Now
        </button>

      </div>
      <div className='home-container' >
        <br />
        <p style={{ padding: "0 2%" }}>
          Dear Customers, please be advised that this website is currently undergoing active development to enhance and optimize your online experience. We are committed to providing you with a seamless and user-friendly platform. In light of our dedication to progress, we are actively seeking talented developers to join our dynamic team and contribute to the evolution of this website. If you are passionate about technology, innovation, and want to be part of a growing project, we encourage you to explore the opportunities available and consider joining us on this exciting journey. Your expertise could play a vital role in shaping the future of our platform, and together, we can create something truly exceptional. Thank you for your patience and understanding as we work diligently to bring you a top-notch website.
        </p>
        <p style={{ padding: "0 2%" }} >Email:- hiquershiquers@gmail.com</p>
        <footer>

          <p>&copy; 2024 Conspiracy World</p>
        </footer>
        <br />
      </div>
    </>
  );
};

export default HomePageContent;
