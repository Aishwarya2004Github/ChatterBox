import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import FriendList from "../components/FriendList";
import MyPost from "../components/MyPost";
import Posts from "../components/Posts";
import User from "../components/User";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
  try {
    const response = await fetch(`https://chatterbox-g8d6.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setUser(data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};


  useEffect(() => {
    getUser();
  }, [userId]); // Fetch data when userId changes

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <User userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPost picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <Posts userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage; // Correctly exported
