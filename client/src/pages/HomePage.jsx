import React from "react";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import { Container, Text, VStack } from "@chakra-ui/react";
import WaveText from "../styles/HeadingAnimation";

function HomePage() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Container centerContent py={{ base: "4", md: "8" }} maxW="container.md">
      {currentUser ? (
        <VStack spacing={4} align="center">
          <WaveText
            text="Welcome-to-Our-Platform!"
            size="3em"
          />
          <Text fontSize="lg">
            🎉 We're glad to see you here. Explore what's new today.
          </Text>
        </VStack>
      ) : (
        <LoginPage />
      )}
    </Container>
  );
}

export default HomePage;
