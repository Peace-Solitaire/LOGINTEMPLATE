import React from "react";
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
import { SearchIcon, BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import Profile from "./Profile";

/* useColorModeValue from chakra ui is used to create diff color for diff setting eg darkmode and lightmode */

const Header = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("black", "white");

  const openAvatar = async () =>{

  }

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
            borderColor: "rgba(255, 75, 43, 0.6)",
          }}
        />
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Home</MenuItem>
          <MenuItem>About</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
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
            borderColor: "rgba(255, 75, 43, 0.6)",
          }}
          _focus={{
            boxShadow: "none",
            border: "2px solid",
            borderColor: "rgba(255, 75, 43, 0.6)",
          }}
        />
      </InputGroup>

      <Spacer />

      <IconButton
        variant="outline"
        aria-label="Notifications"
        icon={<BellIcon />}
        margin="4"
        _hover={{
          border: "2px solid",
          borderColor: "rgba(255, 75, 43, 0.6)",
        }}
      />
      <Profile />
    
    </Flex>
  );
};

export default Header;

