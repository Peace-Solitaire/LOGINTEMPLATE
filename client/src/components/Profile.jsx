import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

function Profile({ user, handleSignOut }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Delete account logic goes here");
  };

  return (
    <>
      {/* Profile Picture Outside - Circular with Border */}
      <div
        className="relative inline-block"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={user.profilePic}
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
        />
      </div>

      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 rounded-lg">
            {/* Profile Picture Inside the Modal - Circular with Camera Icon */}
            <div className="relative inline-block">
              <img
                src={user.profilePic}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-gray-300 object-cover"
              />
              <FaCamera className="h-6 w-6 absolute bottom-0 right-0 text-blue-400 cursor-pointer" />
              {/* Assuming clicking the camera icon here would open an edit photo modal */}
            </div>
            <p className="text-lg font-semibold mt-2">{user.name}</p>
            <p>{user.email}</p>
            <button
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <button
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition ml-2"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
            <button
              className="mt-4 py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400 transition ml-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
