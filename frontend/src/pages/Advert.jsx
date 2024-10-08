import { Typography, useTheme } from "@mui/material"; // Removed redundant useTheme import
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";

const Advert = () => { // Renamed to Advert
  const { palette } = useTheme(); // Using the imported useTheme
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://chatterbox-g8d6.onrender.com/assets/info42.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Software developer</Typography>
        <Typography color={medium}>softwaredeveloper.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and unbelievable developments. Make sure your skills
        is exfoliated and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default Advert; // Updated export statement
