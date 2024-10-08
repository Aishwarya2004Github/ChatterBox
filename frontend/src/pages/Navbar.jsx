import { useState, useCallback } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import Logo from "../assets/chatterbox.png"; // Ensure this path is correct

const Navbar = () => { // Renamed to Navbar
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Ensure 'user' is correctly structured in your Redux store
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const UserName = `${user?.UserName ?? ''}`; // Adjust if needed

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const renderMenuItems = () => (
    <FlexBetween gap="2rem">
      <IconButton onClick={() => dispatch(setMode())} aria-label="Toggle dark mode">
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} aria-label="Messages" />
      <Notifications sx={{ fontSize: "25px" }} aria-label="Notifications" />
      <Help sx={{ fontSize: "25px" }} aria-label="Help" />
      <IconButton onClick={handleFullscreen} aria-label="Toggle fullscreen">
        {isFullscreen ? (
          <FullscreenExit sx={{ fontSize: "25px" }} />
        ) : (
          <Fullscreen sx={{ fontSize: "25px" }} />
        )}
      </IconButton>
      <FormControl variant="standard" value={UserName}>
        <Select
          value={UserName}
          sx={{
            backgroundColor: neutralLight,
            width: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={UserName}>
            <Typography>{UserName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
            display: "flex",
            alignItems: "center", // Aligning logo with text
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ height: "8rem", marginRight: "0.5rem" }} // Adjust the height here
          />
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? renderMenuItems() : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          aria-label="Toggle mobile menu"
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              aria-label="Close mobile menu"
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {renderMenuItems()}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar; // Updated export statement
