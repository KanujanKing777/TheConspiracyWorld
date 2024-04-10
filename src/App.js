import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Static Pages/Home';
import NoPage from './Static Pages/NoPage';
import Singup from './Pages/Auth/Singup';
import Login from './Pages/Auth/Login';
import Newpost from './Pages/New Post/newpost';
import NewHome from './newHome';
import Post from './Pages/Post/post';
import Chatwithai from './chatwithai';
import PostClient from './Pages/Post/postClient';
import ExpertPage from './Pages/becomeAnExpert';
import Profile from './Pages/Profile/Profile';
import Search from './Pages/Search/Search';
function App() {
  return (
    <Router>
      <Routes>

        <Route index element={<Home />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newpost' element={<Newpost />} />
        <Route path='/home' element={<NewHome />} />
        <Route path='/postExpert' element={<Post />} />
        <Route path='/post' element={<PostClient />} />
        <Route path='/search' element={<Search />} />

        <Route path='/chatwithai' element={<Chatwithai />} />
        <Route path='/becomeanexpert' element={<ExpertPage />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}


export default App;
