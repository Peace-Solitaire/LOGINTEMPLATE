import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../../styles/LoginButton";
import { useToast } from "@chakra-ui/react";

import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { appFirebase } from "../../firebase";

import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/slices/userSlice";


const GoogleLoginButton = () => {

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = async (e) =>{
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(appFirebase);
      const result = await signInWithPopup(auth,provider);
      
       const config = {
         headers: {
           "Content-type": "application/json",
         },
       };

       const { data } = await axios.post("/api/auth/google/login", result.user, {
         ...config,
         withCredentials: true,
       });

       toast({
         title: "Logged with Google Successfully",
         status: "success",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });

       dispatch(signInSuccess(data));
       navigate("/profile");
    } catch (error) {
      console.log("could not login with google",error);
    }
  }

  return (
    <Button onClick={handleClick}>
      <div className="icon">
        <FcGoogle size="24px" />
      </div>
      <span className="text">Login with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
