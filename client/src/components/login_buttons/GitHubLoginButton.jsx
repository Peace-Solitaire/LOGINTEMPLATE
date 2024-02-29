import React from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "../../styles/LoginButtonComponents";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      toast({
        title: "Comming Soon...!",
        description: "Login with GitHub is unavailable at the moment.",
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
    <GitHubButton onClick={handleClick}>
      <div className="icon">
        <FaGithub size="24px" />
      </div>
      <span className="text">Login with GitHub</span>
    </GitHubButton>
  );
};

export default GitHubLoginButton;
