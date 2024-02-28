import React from "react";
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";

function SupportPage() {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Submitted successfully!",
      description:
        "We've received your inquiry and will get back to you shortly.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={4}>
        Support Page
      </Heading>
      <Text fontSize="lg" mb={4}>
        Have questions or need help? Check out our FAQ or get in touch with our
        support team.
      </Text>

      <Heading as="h2" size="lg" mb={4}>
        Frequently Asked Questions
      </Heading>
      <Accordion allowToggle mb={8}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How can I reset my password?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            You can reset your password by going to the login page and clicking
            on the "Forgot password?" link.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Heading as="h2" size="lg" mb={4}>
        Contact Us
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input placeholder="Your name" required />
          <Input type="email" placeholder="Your email" required />
          <Textarea placeholder="Your message" required />
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default SupportPage;
