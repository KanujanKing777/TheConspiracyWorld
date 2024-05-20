import React from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import './homecontent.css';
const HomePageContent = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <div className='apple'  >
          <div className="leftC">
            <p>
              <i>Are you a person wondering about the Conspiracy Theories that surround us?</i><br/>
              <br/>Conspiracy theories are everywhere! 
              From the belief that governments are hiding evidence of extraterrestrial life to assertions that Humans will be replaced by AI, these theories thrive in the digital age, fueled by social media and the internet.
            </p>
          </div>
          <div className="rightC">
           <img id='pyramid' src='/intrp.jpg' className='imgPic' alt='img1' /> 
          </div>
        </div>
        <div className='apple'  >

          <div className="leftC">
            <img id='flat' src='/flat.jpg' className='imgPic' alt='img1' />

          </div>
          <div className="rightC">
            <p>
              <i>Not All Conspiracies are Facts, Not All Conspiracies are Myths</i><br/><br/>
              It is important to recognize that some of today's well-established theories and widely accepted truths were once dismissed as conspiracy theories. 
              It is our duty to separate fact from fiction and the maintain an open yet critical mindset.
            </p>
          </div>
        </div>
        
        <div id="thelast" className='apple'  >
          <div id='two' className='rightC'>
            <img src='/funfadafun.jpg' className='imgPic' alt='The Conspiracy World' />
          </div>
          <div className='leftC'>

            <p><i>The Conspiracy World</i><br/><br/>
            A dynamic platform designed for intelligent minds like you to 
            analyse conspiracy theories with experts who have expertise in the respective field, and finding out the truths hiding among it, while bursting the myths.
            </p>
          </div>
          <div id='one' className='rightC'>
            <img src='/funfadafun.jpg' className='imgPic' alt='The Conspiracy World' />
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
          padding: "1%",
          backgroundColor:"#FFFFFF40"
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
          Dear Customers, please be advised that this website is currently undergoing active development to enhance and optimize your online experience. 
          We are committed to providing you with a seamless and user-friendly platform. 
          We are actively seeking talented developers to join our dynamic team and contribute to the evolution of this website. 
          If you are passionate about technology, innovation, and want to be part of a growing project, we encourage you to explore the opportunities available and consider joining us on this exciting journey. 
          Your expertise could play a vital role in shaping the future of our platform, and together. 
        </p>
        <p style={{ padding: "0 2%" }} >Email:- hiquershiquers@gmail.com   <br/><br />   
</p>
        <footer>

          <p>&copy; 2024 Conspiracy World</p>
          
        </footer>
        <br />
      </div>
    </>
  );
};

export default HomePageContent;
