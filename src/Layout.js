import { Outlet, Link } from "react-router-dom";
import './Layout.css'; // Create a separate CSS file for styling

const Layout = () => {
  return (
    <>

      <nav className="navbar">
        <div className="left-section">
          <img src='/yinyang.png' className='App-logo' alt='logo' />
          <h1 className="h1">The Conspiracy World</h1>
      </div>

      <div className="right-section">
        <ul className="nav-list">
          <div >
            <li className="nav-item log">
              <Link to="/login" className="nav-link">Log in</Link>
            </li>
          </div>
          <div >
            <li className="nav-item try">
              <Link to="/signup" className="nav-link" id="trytext">Try</Link>
            </li>
          </div>
        </ul>
      </div>
    </nav >

    </>
  );
};

export default Layout;
