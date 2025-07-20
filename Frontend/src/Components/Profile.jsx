import "tailwindcss";
import React, { useState } from 'react';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    role: 'Buyer', 
    profilePic: 'https://via.placeholder.com/150',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Shri Ram tulsi, near tilak bazar, 63673-3254-4353-343432-53 sai nagar road, dadar east',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Save updated data (e.g., API call)
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleRoleChange = () => {
    setUserData((prevData) => ({
      ...prevData,
      role: prevData.role === 'Buyer' ? 'Seller' : 'Buyer',
    }));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Profile</h1>
        {!isEditing && (
  <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto">
    <div className="flex flex-col items-center mb-6">
      <div>
        <img
          src={userData.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md"
        />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">{userData.name}</h2>
      <p className="text-blue-600 text-sm font-medium mt-1">{userData.role}</p>
      <button
        onClick={handleRoleChange}
        className="mt-4  bg-violet-500 hover:bg-purple-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-sm transition-transform hover:scale-105"
      >
        Switch to {userData.role === 'Buyer' ? 'Seller' : 'Buyer'}
      </button>
    </div>

    <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
      <div>
        <p className="text-gray-500 font-medium">Name:</p>
        <p className=" border shadow rounded px-3 py-2 text-gray-800 text-lg font-semibold">{userData.name}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Email:</p>
        <p className="  border shadow rounded px-3 py-2 text-gray-800 text-lg font-semibold">{userData.email}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Phone:</p>
        <p className="  border shadow rounded px-3 py-2 text-gray-800 text-lg font-semibold">{userData.phone}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Address:</p>
        <p className=" border shadow rounded px-3 py-2 text-gray-800 text-lg font-semibold">{userData.address}</p>
      </div>
    </div>

    <div className="text-center mt-8">
      <button
        className=" bg-violet-500 hover:bg-purple-500 text-white text-sm font-medium py-2 px-8 rounded-lg shadow-md transition-transform hover:scale-105"
        onClick={handleEditClick}
      >
        Edit Profile
      </button>
    </div>
  </div>
)}

       
        {isEditing && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <form>
              <div className="text-center mb-4">
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <div className="mt-4 text-center text-sm ">
  <label
    htmlFor="fileInput"
    className=" bg-violet-500 hover:bg-purple-500 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md inline-flex items-center space-x-2 transition-transform hover:scale-105"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-9-4.5l-3.5 3.5M12 12L8.5 8.5M12 12l3.5-3.5m0 0L12 4.5m3.5 3.5H8.5"
      />
    </svg>
    <span>Upload Profile Picture</span>
  </label>
  <input
    id="fileInput"
    type="file"
    accept="image/*"
    className="hidden "
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setUserData({
          ...userData,
          profilePic: URL.createObjectURL(file),
        });
      }
    }}
  />
</div>

              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                  Address:
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your address"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="bg-violet-500 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
