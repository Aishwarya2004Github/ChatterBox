import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../assets/chatterbox.png";
import "./Login.css";
import Form from "./Form";

const LoginPage = () => {
 
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
     
      <Box
        width="100%"

        p="1rem 6%"
        textAlign="center"
      >
         <Typography
          fontWeight="bold"
          fontSize="32px"
          
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ height: "12em" ,position:"relative", right:"20rem", top:"6rem"}} // Adjust the height here
          />
    
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
       position="relative"
       left="17em"
       bottom="20em"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to chatterbox
        </Typography>

        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;