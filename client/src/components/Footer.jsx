import React from "react";
import {
  Box,
  useBreakpointValue,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <Box
      as="footer"
      bg="white"
      color="black"
      mt="auto"
      py={5}
      border="1px solid"
      borderColor="gray.300"
      display={useBreakpointValue({ base: "none", md: "block" })}
    >
      <Container maxWidth="container.xl">
        <Heading
          size="md"
          fontWeight="bold"
          fontStyle="italic"
          fontFamily="revert-layer"
          pb={5}
        >
          Login-Template
        </Heading>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={6}
          justifyContent="space-between"
          justifyItems="center"
        >
          <VStack align="start" spacing={3}>
            <Heading size="sm">ABOUT Peace-Solitaire</Heading>
            <Link>Who Am I</Link>
            <Link>Contact Me</Link>
          </VStack>

          <VStack align="start" spacing={3}>
            <Heading size="sm">More from Peace-Solitaire</Heading>
            <Link>CropXpert</Link>
            <Link>YogaManagementApp</Link>
          </VStack>

          <VStack align="start" spacing={3}>
            <Heading size="sm">LEARN MORE</Heading>
            <Link>Privacy</Link>
            <Link>Security</Link>
            <Link>Terms</Link>
          </VStack>

          <VStack align="start" spacing={3}>
            <Heading size="sm">Social Links</Heading>
            <Flex justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={4}>
                <Link href="https://github.com" isExternal>
                  <Box as={FaGithub} size="24px" color="#333" />
                </Link>
                <Link href="https://linkedin.com" isExternal>
                  <Box as={FaLinkedin} size="24px" color="#0077b5" />
                </Link>
              </Stack>
            </Flex>
          </VStack>
        </Grid>
        <Divider my={4} borderColor="gray.300" borderWidth="1px" />{" "}
        <Text fontSize="sm" textAlign="justify">
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners. 2024- © Peace-Solitaire™ Ltd.
          All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
