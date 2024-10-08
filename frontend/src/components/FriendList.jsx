import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [loading, setLoading] = useState(true);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch friends');
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId, token]); // Add dependencies

  if (loading) {
    return (
      <WidgetWrapper>
        <CircularProgress />
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              UserName={friend.UserName} // Corrected prop name
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Typography>No friends found.</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendList;
