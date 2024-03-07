import '../App.css';
import Layout from '../Layout';
import background from '../background.mp4';
import './Home.css';
import HomePageContent from './homecontent';
function Home() {
  return (
    <>
      <Layout />



      <div className='fun' >
        <video id='background-video' className='videoTag' autoPlay loop muted>
          <source src={background} type='video/mp4' />
        </video>
        <div className='startP'>
          Welcome to The Conspiracy World
        </div>

      </div>
      <div style={{
        height: "30vh"
      }}>

      </div>
      <HomePageContent />
    </>
  );
}

export default Home;