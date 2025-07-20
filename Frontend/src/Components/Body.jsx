import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Group36 from "../assets/Group36.png";
import './Body.css';
import Login from './Login.jsx'

export default function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = (event) => {
    setIsModalOpen(true);
    const selectedRole=event.target.dataset.role;
    setRole(selectedRole);
  };

  const closeModal = () => setIsModalOpen(false);

  const [role, setRole] = useState("");

  return (
    <div>
      <div className="img_container">
        <div className="img_left">
          <img src={Group36} alt="Image" />
        </div>
        <div className="right">
          <h2 className="text-right">Welcome to Ethnicize <br/>An India Post Initiative Connecting NRIs to the vibrant essence of local Indian markets</h2>
          <div className="button_container">
            <button className="role-button" data-role="customer" onClick={handleLoginClick}>Login for Customers</button>
            <button className="role-button" data-role="merchants" onClick={handleLoginClick}>Login for Merchants</button>
            <button className="role-button" data-role="management" onClick={handleLoginClick}>Login for Management</button>
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <button className="close-modal" onClick={closeModal}>×</button>
                  <Login role={role}/>
                </div>
              </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
