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
           <img id='pyramid' src='/intrp.jpg' className='imgPic' alt='img1' /> 
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
                  <svg height="100%" width="100%" version="1.1" viewBox="0 -25 380 400" xmlns="http://www.w3.org/2000/svg"><g id="head" transform="translate(82.000000, 0.000000)"><g id="Head/Front/Long" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M95.7620125,45.2901669 C99.2090333,57.9923169 103.701116,86.5437798 99.1172687,91.0224659 L70.1172687,91.0224659 C70.1143073,90.9710129 70.1114038,90.9196907 70.108558,90.8684989 C59.3599056,89.678999 51,80.5657798 51,69.5 L51,48.5 C51,36.6258779 60.6258779,27 72.5,27 L74.5,27 C85.2832975,27 94.2124503,34.9385375 95.7620125,45.2901669 Z" id="Hair-Back" fill="rgb(25, 24, 71)"></path><g id="Head" transform="translate(54.000000, 31.000000)" fill="rgb(178, 139, 103)"><path d="M8.26227388,34.4901268 C3.65436435,29.0813759 0.535634794,22.4528771 1.05677633,15.0254539 C2.55833022,-6.37502057 32.3485306,-1.66718886 38.1433414,9.13393292 C43.9381521,19.9350547 43.249578,47.3329958 35.7603014,49.2634576 C32.7735882,50.033323 26.4110012,48.1474609 19.935372,44.244306 L24,73 L0,73 L8.26227388,34.4901268 Z"></path></g><path d="M68.7499646,61.874834 C69.855742,73.75284 69.4127345,87.3172649 66.1172687,90.5371269 L37.1172687,90.5371269 C35.5014749,62.4634848 51.1172687,73.3348557 51.1172687,46.9027926 C52.0908529,45.9515442 53.0108111,45.0100255 53.9211179,44.1980592 L53.888877,43.4207004 C58.9105508,33.1402335 65.2813979,28 73.0014183,28 C84.581449,28 88.2365853,33.3883223 91.3486809,37.9630857 C89.0215226,45.9481754 79.9904303,47.1321867 71.9657406,52.1095118 C71.0198539,51.3410043 69.8137154,50.8804131 68.5,50.8804131 C65.4624339,50.8804131 63,53.3428469 63,56.3804131 C63,59.4179792 65.4624339,61.8804131 68.5,61.8804131 C68.5837722,61.8804131 68.6671069,61.8785402 68.7499646,61.874834 Z" id="Hair-Front" fill="rgb(25, 24, 71)"></path></g></g><g id="bottom" transform="translate(0.000000, 187.000000)"><g id="Bottom/Sitting/Skinny-Jeans-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Objects/Seat/Cube" transform="translate(10.000000, 42.000000)"><g id="Seat" transform="translate(55.000000, 0.000000)"><polygon id="Seat-Stuff" fill="#C5CFD6" points="27.6226415 0 104.877193 0 115 124 0 124"></polygon><polygon id="Seat-Stuff" fill-opacity="0.1" fill="#000000" points="27.6226415 0 51.3828011 0 65.6037736 124 0 124"></polygon></g></g><path d="M257.953294,20.7561262 C266.190093,15.8101469 280.009488,22.164715 280,29.2384154 C279.971611,50.4029106 260.656682,150.1511 259.648224,156.456711 C258.639766,162.762321 247.83665,164.42787 247.20755,156.477375 C246.206544,143.826795 244.3468,100.033121 246.20755,79.7626522 C246.975628,71.3954284 247.802807,63.4267637 248.617148,56.3175946 C238.481902,74.6206031 222.807229,100.825998 201.593128,134.933778 L190.076573,129.672175 C199.120166,99.8760987 206.535776,78.8408618 212.323403,66.5664641 C222.233227,45.5497154 231.525307,27.551672 235.436043,21.2120072 C241.587634,11.2397104 252.295462,14.7191925 257.953294,20.7561262 Z" id="Skin" fill="rgb(178, 139, 103)"></path><path d="M208.819223,123.340112 L213.936922,21.8299349 C217.625361,4.27739957 248.84365,12.4235349 248.830812,21.8299349 C248.801666,43.1853748 235.973522,116.956762 235.964839,123.319261 L208.819223,123.340112 Z" id="LegLower" fill="#1F28CF" transform="translate(228.825019, 67.419630) rotate(20.000000) translate(-228.825019, -67.419630) "></path><g id="Accessories/Shoe/Flat-Sneaker" transform="translate(215.500000, 133.000000) rotate(30.000000) translate(-215.500000, -133.000000) translate(185.000000, 113.000000)" fill="#E4E4E4"><path d="M2.67813181,25.4019242 C1.55937727,28.3884109 1,30.6229931 1,32.1056708 C1,33.908957 1.3004142,36.5404001 1.90124261,40 C3.99318117,40 22.7937852,40 58.3030548,40 C59.768738,35.1545073 58.9226607,32.5385816 55.7648228,32.1522232 C52.606985,31.7658647 49.9837155,31.4170139 47.8950143,31.1056708 L21.6799926,19.4188835 C21.1755635,19.1940064 20.584344,19.4206282 20.359467,19.9250573 C20.35562,19.9336867 20.3518954,19.9423702 20.3482945,19.9511052 L18.6632131,24.038695 C15.7398812,25.4026522 13.3643706,26.0846307 11.5366811,26.0846307 C10.0517269,26.0846307 8.00099246,25.4849054 5.38447792,24.2854549 L5.38448339,24.285443 C4.38038273,23.8251478 3.19325534,24.2659892 2.73296014,25.2700899 C2.71312074,25.3133681 2.69483298,25.3573409 2.67813181,25.4019242 Z" id="shoe"></path></g><g id="Accessories/Shoe/Flat-Sneaker" transform="translate(242.000000, 126.000000)" fill="#E4E4E4"><path d="M2.67813181,25.4019242 C1.55937727,28.3884109 1,30.6229931 1,32.1056708 C1,33.908957 1.3004142,36.5404001 1.90124261,40 C3.99318117,40 22.7937852,40 58.3030548,40 C59.768738,35.1545073 58.9226607,32.5385816 55.7648228,32.1522232 C52.606985,31.7658647 49.9837155,31.4170139 47.8950143,31.1056708 L21.6799926,19.4188835 C21.1755635,19.1940064 20.584344,19.4206282 20.359467,19.9250573 C20.35562,19.9336867 20.3518954,19.9423702 20.3482945,19.9511052 L18.6632131,24.038695 C15.7398812,25.4026522 13.3643706,26.0846307 11.5366811,26.0846307 C10.0517269,26.0846307 8.00099246,25.4849054 5.38447792,24.2854549 L5.38448339,24.285443 C4.38038273,23.8251478 3.19325534,24.2659892 2.73296014,25.2700899 C2.71312074,25.3133681 2.69483298,25.3573409 2.67813181,25.4019242 Z" id="shoe"></path></g><path d="M282.770373,36.4330278 C282.770373,63 270.1536,124.970293 270.145616,130.820112 L243,130.840963 C246.973277,75.5454811 248.382172,47.5998928 247.226683,47.0041979 C245.49345,46.1106556 176.175838,53.9250306 155.386358,53.9250306 C125.407825,53.9250306 113.006307,35.0203971 112,-4.40536496e-13 L171.386358,-4.40536496e-13 C183.477954,1.29386693 246.548825,14.0152568 269.972097,18.3884129 C280,20.2606358 282.770373,29.1145109 282.770373,36.4330278 Z" id="Leg-and-Butt" fill="#2B44FF"></path></g></g><g id="torso" transform="translate(22.000000, 82.000000)"><g id="Body/Jacket-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M198,77.6170876 L234.234567,61.7041739 C240.582018,55.3790221 246.711387,50.5716141 252.622674,47.2819501 C254.390261,46.7192094 257.410101,46.5491987 254.188168,51.2551684 C250.966235,55.961138 247.78889,61.0560141 249.076289,62.7052963 C250.363689,64.3545786 254.093006,62.5342201 255.566345,65.2162765 C256.548571,67.0043141 250.262286,69.1431805 236.707491,71.6328758 L209.56994,92.4392868 L198,77.6170876 Z M51.5082829,82 L72,86.0658446 C51.3920824,124.471059 40.3404263,144.825845 38.8450319,147.130202 C35.4803944,152.315007 38.6196693,161.817238 39.7793043,166.821179 C32.5044044,168.51462 35.3734014,157.565005 26.1671562,159.851185 C17.7641225,161.937904 10.6393632,167.293169 2.8038784,160.07074 C1.84055159,159.182785 1.13535082,156.407288 4.41981989,154.983749 C12.6026301,151.437195 24.6920431,144.796343 26.6523424,142.218096 C29.3255608,138.702197 37.6108743,118.629498 51.5082829,82 Z" id="Skin" fill="rgb(178, 139, 103)"></path><path d="M123.280247,9.87718027 L131.765198,7.64600959 C152.120135,24.2050747 163.602366,67.2616718 176.61267,71.9556463 C188.913385,76.3936093 205.208593,69.6320097 224.503164,60.7390322 L231.796052,73.8353428 C215.409826,95.0000245 178.298612,114.916545 161.84294,106.839809 C135.533742,93.9267871 125.046804,40.501408 123.280247,9.87718027 Z" id="Coat-Back" fill="#DB2721" transform="translate(177.538150, 58.161768) rotate(5.000000) translate(-177.538150, -58.161768) "></path><path d="M90,114 C124.671756,114 150.175573,114 166.511451,114 C170.007634,114 169.348845,108.951637 168.84345,106.404206 C163.010588,77.0037663 140.241304,45.3115155 140.241304,3.4607303 L118.1718,0 C99.917485,29.3584068 93.6048263,65.5045499 90,114 Z" id="Shirt" fill="#DDE3E9"></path><path d="M82.3687546,84.2331696 C66.7713811,112.367832 53.6609446,132.623442 43.0374452,145 L27,141.85882 C37.3305927,77.7906722 67.2466105,30.5043988 116.748053,3.81764932e-14 L117,2.9470116e-14 L125.486398,0 C145.298923,67.5369477 150.760885,112.536948 141.872285,135 L73,135 C74.0896281,118.56345 77.5833963,101.181199 82.3687561,84.2331662 Z" id="Coat-Front" fill="#FF4133"></path></g></g></svg>

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
        <p style={{ padding: "0 2%" }} >Email:- hiquershiquers@gmail.com   <br/><br />   <div id="container-f626769ef77cf3ce697290ef5bdd1151"></div>
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
