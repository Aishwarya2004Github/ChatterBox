import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    SaveOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme, TextField, IconButton } from "@mui/material";
  import UserImage from "../components/UserImage";
  import FlexBetween from "../components/FlexBetween";
  import WidgetWrapper from "../components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const User = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState({ location: false, occupation: false });
    const [tempLocation, setTempLocation] = useState("");
    const [tempOccupation, setTempOccupation] = useState("");
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      try {
        const response = await fetch(`https://chatterbox-g8d6.onrender.com/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null; // Loading state
    }
  
    const {
      UserName, // changed variable name for consistency
      location , // default value
      occupation,// default value
      friends , // default to empty array
    } = user;
  
    const handleEdit = (field) => {
      if (field === "location") {
        setTempLocation(location);
        setEditMode((prev) => ({ ...prev, location: true }));
      } else if (field === "occupation") {
        setTempOccupation(occupation);
        setEditMode((prev) => ({ ...prev, occupation: true }));
      }
    };
  
    const handleSave = async (field) => {
      const updatedData = field === "location" ? { location: tempLocation } : { occupation: tempOccupation };
      
      try {
        const response = await fetch(`https://chatterbox-g8d6.onrender.com/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
  
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditMode((prev) => ({ ...prev, [field]: false }));
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    };
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
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
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            {editMode.location ? (
              <TextField
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '80%' }}
              />
            ) : (
              <Typography color={medium}>{location}</Typography>
            )}
            <IconButton onClick={() => editMode.location ? handleSave("location") : handleEdit("location")}>
              {editMode.location ? <SaveOutlined /> : <EditOutlined />}
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            {editMode.occupation ? (
              <TextField
                value={tempOccupation}
                onChange={(e) => setTempOccupation(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '80%' }}
              />
            ) : (
              <Typography color={medium}>{occupation}</Typography>
            )}
            <IconButton onClick={() => editMode.occupation ? handleSave("occupation") : handleEdit("occupation")}>
              {editMode.occupation ? <SaveOutlined /> : <EditOutlined />}
            </IconButton>
          </Box>
        </Box>
  
        <Divider />
      </WidgetWrapper>
    );
  };
  
  export default User;
  