import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import companyLogo from "../../assets/FutureBlink.webp";
import useThemeStore from "../../services/store/theme/themeStore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import AccountMenu from "./components/AccountMenu";
import { headerColors } from "../../vendors/color";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home"];

export default function Header(props: Props) {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={companyLogo} height={80} alt="" />
      <Typography variant="h6" sx={{ my: 2 }}>
        QWeld
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", background: "red" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: darkMode
            ? headerColors.darkThemed
            : headerColors.lightThemed,
        }}
      >
        <Toolbar sx={{ m: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
            {darkMode ? (
              <img src={companyLogo} height={44} alt="Future Blink" />
            ) : (
              <img src={companyLogo} height={44} alt="Future Blink" />
            )}
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {!darkMode ? (
            <IconButton onClick={toggleDarkMode}>
              <DarkModeIcon />
            </IconButton>
          ) : (
            <IconButton onClick={toggleDarkMode}>
              <WbSunnyIcon />
            </IconButton>
          )}
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
