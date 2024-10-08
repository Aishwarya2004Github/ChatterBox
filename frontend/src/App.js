import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import ProfilePage from './components/ProfilePage';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import ButterflyBackground from './components/ButterflyBackground';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ButterflyBackground />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            {/* Optional: Add a fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
