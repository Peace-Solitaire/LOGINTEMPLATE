import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const NotificationsButton = () => {
  const [notifications, setNotifications] = useState([""]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "/path/to/your/notifications/endpoint"
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Box margin="4">
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<BellIcon />}
          variant="outline"
          _hover={{
            border: "2px solid",
            borderColor: "#4481eb",
          }}
          aria-label="Notifications"
        />
        <MenuList>
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <MenuItem key={index}>{notification.message} </MenuItem>
            ))
          ) : (
            <MenuItem>
              <Text>No notifications 😊</Text>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NotificationsButton;
