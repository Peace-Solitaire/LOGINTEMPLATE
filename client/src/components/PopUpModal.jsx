import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  InputGroup,
  InputLeftElement,
  Text,
  Input,
} from "@chakra-ui/react";
import {
  FiCamera,
  FiUser,
} from "react-icons/fi";

export const LogoutPopUpModal =  (
  {logoutConfirmationDisclosure,
  handleLogout}
) => {
  return (
    <>
      <Modal
        isOpen={logoutConfirmationDisclosure.isOpen}
        onClose={logoutConfirmationDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to logout?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleLogout}>
              Yes
            </Button>
            <Button
              variant="ghost"
              onClick={logoutConfirmationDisclosure.onClose}
              _hover={{
                border: "2px solid",
                borderColor: "rgba(255, 75, 43, 0.6)",
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export const DeletePopUpModal =  (
  {deleteConfirmationDisclosure,
  handleDeleteAccount}
) => {
  return (
    <>
      <Modal
        isOpen={deleteConfirmationDisclosure.isOpen}
        onClose={deleteConfirmationDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteAccount}>
              Yes
            </Button>
            <Button
              variant="ghost"
              onClick={deleteConfirmationDisclosure.onClose}
              _hover={{
                border: "2px solid",
                borderColor: "rgba(255, 75, 43, 0.6)",
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export const EditPopUpModal =  (
  {editProfileDisclosure,
  handleChange,
  handleEditImage,
  handleSubmit}
) => {
  return (
    <>
      <Modal
        isOpen={editProfileDisclosure.isOpen}
        onClose={editProfileDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiUser style={{ fontSize: "24px" }} />
              </InputLeftElement>
              <Input
                id="name"
                type="text"
                placeholder="Edit Name"
                onChange={handleChange} 
              />
            </InputGroup>

            <InputGroup mt={4}>
              <InputLeftElement pointerEvents="none">
                <FiCamera style={{ fontSize: "24px" }} />
              </InputLeftElement>
              <Input
                placeholder="Edit Image"
                onClick={() => document.getElementById("imageInput").click()}
                cursor="pointer"
                readOnly
              />
              <Input
                id="imageInput"
                type="file"
                accept=".jpeg,.png"
                hidden
                onChange={handleEditImage}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              onClick={editProfileDisclosure.onClose}
              _hover={{
                border: "2px solid",
                borderColor: "rgba(255, 75, 43, 0.6)",
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
