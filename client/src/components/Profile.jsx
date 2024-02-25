import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Avatar,
  Box,
  Text,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiLogOut, FiTrash2, FiCamera } from "react-icons/fi";

import { appFirebase } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/slices/userSlice";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarDisclosure = useDisclosure();
  const logoutConfirmationDisclosure = useDisclosure();
  const deleteConfirmationDisclosure = useDisclosure();

  const toast = useToast();

  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleEditImage = async (e) => {
    setImage(e.target.files[0]);
    const storage = getStorage(appFirebase);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, pic: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData,
        { ...config, withCredentials: true }
      );

      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.get("/api/auth/signout", { config, withCredentials: true });
      dispatch(signOut());
      logoutConfirmationDisclosure.onClose();
      avatarDisclosure.onClose();
      toast({
        title: "Logout Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.delete(
        `/api/user/delete/${currentUser._id}`,
        { config, withCredentials: true }
      );

      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast({
        title: "Account Deleted Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      deleteConfirmationDisclosure.onClose();
      avatarDisclosure.onClose();
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const openProfileModal = () => {
    if (!currentUser) {
      toast({
        title: "Please login or signup to view your profile.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      avatarDisclosure.onOpen();
    }
  };

  return (
    <>
      <Avatar
        size="md"
        name={currentUser?.name || "Guest"}
        src={currentUser?.profilePic || ""}
        _hover={{
          border: "2px solid",
          borderColor: "rgba(255, 75, 43, 0.6)",
        }}
        tabIndex={0}
        onClick={openProfileModal}
        cursor="pointer"
      />
      <Modal
        isOpen={avatarDisclosure.isOpen}
        onClose={avatarDisclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{currentUser?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Box position="relative" display="inline-block">
              <Avatar
                size="2xl"
                name={currentUser?.name}
                src={currentUser?.profilePic}
                _hover={{
                  border: "2px solid",
                  borderColor: "rgba(255, 75, 43, 0.6)",
                }}
              />
              <IconButton
                aria-label="Edit image"
                icon={<FiCamera />}
                size="sm"
                position="absolute"
                bottom="0"
                right="0"
                borderRadius="full"
                _hover={{
                  border: "2px solid",
                  borderColor: "rgba(255, 75, 43, 0.6)",
                }}
                onClick={() => document.getElementById("imageInput").click()}
              />
              <Input
                id="imageInput"
                type="file"
                accept=".jpeg,.png"
                hidden
                onChange={handleEditImage}
              />
            </Box>
            <Text fontSize="lg" mt="4">
              {currentUser?.email}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button
              leftIcon={<FiLogOut />}
              colorScheme="red"
              onClick={logoutConfirmationDisclosure.onOpen}
            >
              Logout
            </Button>
            <Button
              leftIcon={<FiTrash2 />}
              colorScheme="red"
              variant="ghost"
              onClick={deleteConfirmationDisclosure.onOpen}
              _hover={{
                border: "2px solid",
                borderColor: "rgba(255, 75, 43, 0.6)",
              }}
            >
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Logout Confirmation Modal */}
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

      {/* Delete Account Confirmation Modal */}
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

export default Profile;
