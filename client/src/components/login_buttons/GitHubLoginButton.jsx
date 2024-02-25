import React from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "../../styles/LoginButton";
import styled from "styled-components";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { appFirebase } from "../../firebase";

const GitHubButton = styled(Button)`
  background-color: #000; 
  &:hover {
    background-color: #333; 
  }
  .icon {
    color: #fff; 
  }
  .text {
    color: #fff; 
  }
`;

const GitHubLoginButton = () => {
    const handleClick = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(appFirebase);
        const result = await signInWithPopup(auth, provider);
      } catch (error) {
        console.log("could not login with google", error);
      }
    };

return (

  <GitHubButton onClick={handleClick}>
    <div className="icon">
      <FaGithub size="24px" />
    </div>
    <span className="text">Login with GitHub</span>
  </GitHubButton>
    );
};

export default GitHubLoginButton;
