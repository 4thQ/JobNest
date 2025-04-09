import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import JobList from "./components/JobList";
import AddJob from "./components/AddJob";
import Summary from "./components/Summary";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2C3E50", // Professional dark blue
      light: "#34495E",
      dark: "#1A252F",
    },
    secondary: {
      main: "#3498DB", // Professional light blue
      light: "#5DADE2",
      dark: "#2980B9",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C3E50",
      secondary: "#7F8C8D",
    },
    success: {
      main: "#27AE60",
    },
    error: {
      main: "#E74C3C",
    },
    warning: {
      main: "#F1C40F",
    },
    info: {
      main: "#3498DB",
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "sans-serif"',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#2C3E50",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#2C3E50",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      color: "#2C3E50",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#2C3E50",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      color: "#2C3E50",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      color: "#2C3E50",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#2C3E50",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#7F8C8D",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "6px",
          fontWeight: 500,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#2C3E50",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
        >
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: { xs: 8, sm: 9 },
              pb: 6,
              width: "100%",
            }}
          >
            <Container maxWidth="lg" sx={{ height: "100%" }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/add-job" element={<AddJob />} />
                <Route path="/summary" element={<Summary />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
