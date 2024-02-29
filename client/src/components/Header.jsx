import React from "react";
import axios from "axios";
import {
  useColorModeValue,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Spacer,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FiHome, FiInfo, FiSettings } from "react-icons/fi";
import Profile from "./Profile";
import NotificationButton from "./NotificationButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");
  const navigate = useNavigate();

  return (
    <Flex
      paddingX="4"
      paddingY="1"
      background={bgColor}
      color={color}
      alignItems="center"
      boxShadow="sm"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          variant="outline"
          aria-label="Options"
          icon={<HamburgerIcon />}
          margin="3"
          _hover={{
            border: "2px solid",
            borderColor: "#4481eb",
          }}
        />
        <MenuList>
          <MenuItem
            icon={<FiHome style={{ fontSize: "18px" }} />}
            onClick={() => navigate("/")}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<FiInfo style={{ fontSize: "18px" }} />}
            onClick={() => navigate("/about")}
          >
            About
          </MenuItem>
          <MenuItem icon={<FiSettings style={{ fontSize: "18px" }} />}>
            Settings
          </MenuItem>
        </MenuList>
      </Menu>

      <InputGroup width="md">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          _hover={{
            border: "2px solid",
            borderColor: "#4481eb",
          }}
          _focus={{
            boxShadow: "none",
            border: "2px solid",
            borderColor: "#4481eb",
          }}
        />
      </InputGroup>

      <Spacer />

      <NotificationButton />
      <Profile />
    </Flex>
  );
};

export default Header;
