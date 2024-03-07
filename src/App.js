import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Static Pages/Home';
import NoPage from './NoPage';
import Singup from './Singup';
import Login from './Login';
import Newpost from './newpost';
import NewHome from './newHome';
import Post from './post';

function App() {
  return (
    <Router>
      <Routes>

        <Route index element={<Home />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newpost' element={<Newpost />} />
        <Route path='/home' element={<NewHome />} />
        <Route path='/post' element={<Post />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}


export default App;
