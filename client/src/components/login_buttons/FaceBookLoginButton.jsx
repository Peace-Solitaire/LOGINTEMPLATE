import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "../../styles/LoginButtonComponents";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react";

const FacebookButton = styled(Button)`
  background-color: #4267b2;
  &:hover {
    background-color: #365899;
  }
  .icon {
    color: #fff;
    left: 10.5px;
  }
  .text {
    color: #fff;
  }
`;

const FaceBookLoginButton = () => {
  const toast = useToast();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      toast({
        title: "Comming Soon...!",
        description: "Login with FaceBook is unavailable at the moment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <FacebookButton onClick={handleClick}>
      <div className="icon">
        <FaFacebookF size="24px" />
      </div>
      <span className="text">Login with Facebook</span>
    </FacebookButton>
  );
};

export default FaceBookLoginButton;
