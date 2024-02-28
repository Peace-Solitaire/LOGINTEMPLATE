import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useToast,
  Circle,
} from "@chakra-ui/react";
import { FiLogOut, FiTrash2, FiUser, FiMail, FiEdit } from "react-icons/fi";

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
import {
  DeletePopUpModal,
  EditPopUpModal,
  LogoutPopUpModal,
} from "./PopUpModal";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editProfileDisclosure = useDisclosure();
  const logoutConfirmationDisclosure = useDisclosure();
  const deleteConfirmationDisclosure = useDisclosure();

  const toast = useToast();

  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleEditImage = async (e) => {
    const image = e.target.files[0];
    if (!image) {
      toast({
        title: "No file selected",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, pic: downloadURL });
        });
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
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      editProfileDisclosure.onClose();
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
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={Circle}
          cursor="pointer"
          display="inline-flex"
          _hover={{
            border: "2px solid",
            borderColor: "rgba(255, 75, 43, 0.6)",
          }}
        >
          <Avatar
            size="md"
            name={currentUser?.name || "Guest"}
            src={
              currentUser?.pic ||
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
          />
        </MenuButton>

        <MenuList>
          <MenuItem icon={<FiUser style={{ fontSize: "18px" }} />}>
            {currentUser?.name || "Guest Name"}
          </MenuItem>
          <MenuItem icon={<FiMail style={{ fontSize: "18px" }} />}>
            {currentUser?.email || "guest@example.com"}
          </MenuItem>
          {currentUser && (
            <>
              <MenuItem
                icon={<FiEdit style={{ fontSize: "18px" }} />}
                onClick={editProfileDisclosure.onOpen}
              >
                Edit Profile
              </MenuItem>

              <MenuItem
                icon={<FiLogOut style={{ fontSize: "18px" }} />}
                onClick={logoutConfirmationDisclosure.onOpen}
              >
                Logout
              </MenuItem>
              <MenuItem
                icon={<FiTrash2 style={{ fontSize: "18px" }} />}
                onClick={deleteConfirmationDisclosure.onOpen}
              >
                Delete Account
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>

      <LogoutPopUpModal
        logoutConfirmationDisclosure={logoutConfirmationDisclosure}
        handleLogout={handleLogout}
      />
      <EditPopUpModal
        editProfileDisclosure={editProfileDisclosure}
        handleChange={handleChange}
        handleEditImage={handleEditImage}
        handleSubmit={handleSubmit}
      />
      <DeletePopUpModal
        deleteConfirmationDisclosure={deleteConfirmationDisclosure}
        handleDeleteAccount={handleDeleteAccount}
      />
    </>
  );
};

export default Profile;
