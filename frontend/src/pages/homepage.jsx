import React, { useState } from "react"; // Import useState here
import Navbar from "../components/navbar";
import { Box, useMediaQuery, Button, Dialog, DialogContent } from "@mui/material";
import Advert from "../components/advert";
import FriendList from "../components/FriendList";
import User from "../components/User"; 
import Post from "../components/Post";
import Posts from "../components/Posts";
import MyPost from "../components/MyPost"; // Ensure MyPost is correctly imported
import { useSelector } from "react-redux";

const Homepage = () => { // Capitalized the component name
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const postData = useSelector((state) => state.posts); // Adjust based on your state structure
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <User userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
         <Button
  variant="contained"
  color="primary"
  onClick={handleOpen}
  sx={{
    mb: "1rem", // Margin bottom for spacing
    display: "flex",
    alignItems: "center",
    justifyContent: "center",// Center the content horizontally
  }}
>
  Create Post
</Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <MyPost picturePath={picturePath} onClose={handleClose} />
            </DialogContent>
          </Dialog>
          <Post picturePath={picturePath} postData={postData} />
          <Posts userId={_id} />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Advert />
            <Box m="2rem 0" />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Homepage;
