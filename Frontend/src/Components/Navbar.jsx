import React from 'react';
import './Navbar.css';
import {useNavigate} from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const handleSubmit= () => {
     navigate("/Profile")
  };

  return (
    <div>
      <header>
        <div className="logo">Ethnicize</div>
        <button className="account-button" onClick={handleSubmit}>Profile</button>
      </header>
    </div>
  );
}
