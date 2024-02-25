import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "../../styles/LoginButton";
import styled from "styled-components";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { appFirebase } from "../../firebase";

const FacebookButton = styled(Button)` 
  background-color: #4267B2; 
  &:hover {
    background-color: #365899; 
  }
  .icon {
    color: #fff; 
  }
  .text {
    color: #fff; 
  }
`;

const FaceBookLoginButton = () => {
    const handleClick = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(appFirebase);
        const result = await signInWithPopup(auth, provider);
      } catch (error) {
        console.log("could not login with google", error);
      }
    };
 return (<FacebookButton onClick={handleClick}>
    <div className="icon">
      <FaFacebookF size="24px" />
    </div>
    <span className="text">Login with Facebook</span>
  </FacebookButton>);
}; 

export default FaceBookLoginButton;
