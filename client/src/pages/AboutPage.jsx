import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react";

function AboutPage() {
  return (
    <Container maxW="container.md" py={{ base: "12", md: "24" }} centerContent>
      <VStack spacing={5}>
        <Heading textAlign="center" size="lg">
          Thank You for Choosing Login-Template!
        </Heading>
        <Text textAlign="center" fontSize="lg">
          I am genuinely excited to see you using my login template. Your trust
          in my solution inspires me to continuously improve and innovate,
          ensuring that you have the best possible experience.
        </Text>
        <Text textAlign="center">
          Should you have any feedback or need assistance, please don't hesitate
          to reach out via our{" "}
          <Link as={RouterLink} to="/support" color="teal.500">
            Support Page
          </Link>
          .
        </Text>
        <Box></Box>
        <Text textAlign="center" fontSize="sm">
          © {new Date().getFullYear()} Login-Template. All rights reserved.
        </Text>
      </VStack>
    </Container>
  );
}

export default AboutPage;
