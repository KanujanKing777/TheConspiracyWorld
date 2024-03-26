import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingButton = ({idbro, usertypebro}) => {
  const navigate = useNavigate();
  const [isButtonVisible, setButtonVisibility] = useState(true);

  const funny = () => {
    if(idbro === null){
      navigate('/login');
    }
    else{
      var str = '/newpost?userid='+idbro+'&usertype='+usertypebro;
      navigate(str);  
      
    }
  };
  

  const toggleButtonVisibility = () => {
    setButtonVisibility((prevState) => !prevState);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
      {isButtonVisible && (
        <button
            id='floatingbutton'
          onClick={funny}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#9b59b6',
            color: 'white',
            fontSize: 18,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          }}
          title='New Post'
        >
          +
        </button>
      )}
    </div>
  );
};

export default FloatingButton;
