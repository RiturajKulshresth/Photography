import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ProfileImage from "../images/Profile.jpg";

const pages = ["Photography"];

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

  return (
    <AppBar
      position="absolute"
      style={{ background: "transparent", boxShadow: "none", zIndex: "9999" }}
    >
      <Toolbar disableGutters>
        <PhotoCameraIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1, pl: 5 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white", // Contrasting color
            textDecoration: "none",
          }}
        >
          Rituraj Kulshresth
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            PaperProps={{
              style: {
                backgroundColor: "transparent", // Set menu background to transparent
                color: "white", // Set text color to white
              },
            }}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ color: "white" }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <PhotoCameraIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white", // Contrasting color
            textDecoration: "none",
          }}
        >
          Rituraj
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 2, pr: 5 }}>
            <Avatar alt="Rituraj" src={ProfileImage} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
