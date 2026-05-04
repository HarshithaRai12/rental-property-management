import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("UserToken");
  const username = localStorage.getItem("UserName");

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserName");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ background: "white", color: "black" }}>
      <Container maxWidth={false}>
        <Toolbar>

          <HomeIcon sx={{ color: "green", mr: 1 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "green",
              cursor: "pointer"
            }}
            onClick={() => navigate("/")}
          >
            RentalHome
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", ml: 5 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ color: "black", mx: 1 }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {!token ? (
            <Box>
              <Button onClick={() => navigate("/userlogin")}>
                Login
              </Button>

              <Button
                variant="contained"
                sx={{ mx: 1, background: "green" }}
                onClick={() => navigate("/userregister")}
              >
                Register
              </Button>

              <Button onClick={() => navigate("/admin/login")}>
                ADMIN
              </Button>
            </Box>
          ) : (
            <Box>
              <Tooltip title="Open Menu">
                <IconButton
                  onClick={(e) =>
                    setAnchorElUser(e.currentTarget)
                  }
                >
                  <Avatar sx={{ bgcolor: "green" }}>
                    {username?.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  My Profile
                </MenuItem>

                <MenuItem onClick={() => navigate("/myrequests")}>
                  My Requests
                </MenuItem>

                <MenuItem onClick={() => navigate("/myhouse")}>
                  My House
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}