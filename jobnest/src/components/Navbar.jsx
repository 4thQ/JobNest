import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Jobs", icon: <WorkIcon />, path: "/jobs" },
  { text: "Add Job", icon: <AddIcon />, path: "/add-job" },
  { text: "Summary", icon: <AssessmentIcon />, path: "/summary" },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              fontSize: "1.5rem",
              mr: 4,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            JobNest
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    selected={location.pathname === item.path}
                    sx={{
                      color:
                        location.pathname === item.path
                          ? "primary.main"
                          : "text.primary",
                      "&:hover": {
                        bgcolor: "primary.light",
                        color: "white",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {item.icon}
                      {item.text}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "text.secondary",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: location.pathname === item.path ? "100%" : "0%",
                      height: "2px",
                      bgcolor: "primary.main",
                      transition: "width 0.2s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
