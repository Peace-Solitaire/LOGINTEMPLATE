import { useState } from "react";
import { Link } from "react-router-dom";
// import Profile from "./Profile";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy user info - replace with actual data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    profilePic: "/path/to/profile/pic.jpg", // Placeholder path
  };

  const handleSignOut = () => {
    // Handle sign out
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true); // Open confirmation modal
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </div>
      {/* <Profile user={user} handleSignOut={handleSignOut} /> */}
    </div>
  );
}

export default Header;
