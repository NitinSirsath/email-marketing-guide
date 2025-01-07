import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuthStore } from "../../../services/store/auth/authStore";
import { removeUserData } from "../../../services/localStorage/authUtils";
import { useNavigate } from "react-router-dom";
import { menuStyles } from "../../../styles/menu/menuObject";

// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import useThemeStore from '../../../services/store/theme/themeStore';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';

export default function AccountMenu() {
  const { setLoggedOut } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    navigate("/Settings");
    handleClose();
  };

  const handleLogout = () => {
    removeUserData();
    setLoggedOut();
    navigate("/login");
  };

  function getInitials(email: string) {
    if (!email || typeof email !== "string") {
      return "N/A";
    }

    const initials = email.split("@")[0].toUpperCase().slice(0, 1);
    return initials;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {getInitials("Nitin")}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        sx={menuStyles}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* {!darkMode ? (
          <MenuItem onClick={toggleDarkMode}>
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            Dark Mode
          </MenuItem>
        ) : (
          <MenuItem onClick={toggleDarkMode}>
            <ListItemIcon>
              <WbSunnyIcon fontSize="small" />
            </ListItemIcon>
            Light Mode
          </MenuItem>
        )} */}
        {/* {userProfileInfo?.userLevel === 1 && ( */}
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        {/* )} */}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
