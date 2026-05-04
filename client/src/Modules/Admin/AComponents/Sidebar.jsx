import * as React from "react";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/Admin/" },
    { label: "Add Property", path: "/Admin/addproperty" },
    { label: "View Properties", path: "/Admin/viewproperty" },
    { label: "View Requests", path: "/Admin/viewrequests" }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* TOP BAR */}
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "green" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#1f2937",
            color: "white"
          }
        }}
      >
        <Toolbar />
        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* LOGOUT */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
              localStorage.removeItem("AdminToken");
              navigate("/");
            }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* CONTENT */}
      <Main>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  );
}