import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const Friend = ({ friendId, UserName, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user) || {};
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user?.friends);
  
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends && friends.find((friend) => friend._id === friendId);
  const [loading, setLoading] = useState(false);

  const patchFriend = async () => {
    if (loading) return; // Prevent multiple clicks

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/users/${_id}/${friendId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update friend status');
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error updating friend status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box onClick={() => navigate(`/profile/${friendId}`)}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {UserName}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        disabled={loading}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
