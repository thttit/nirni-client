import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Assets from "../../../assets";
import CloseIcon from "@mui/icons-material/Close";
import Auth from "../auth/Auth";
import { StyledBadge } from "../Navbar";

const Menu = ({ cartItem, isLoggedIn }: any) => {
  const [state, setState] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let page = [
    {
      name: (
        <NavLink className="link" to="/shop">
          <Typography className="link_text">Shop</Typography>
        </NavLink>
      ),
    },
    {
      name: (
        <NavLink className="link" to="/collection">
          <Typography className="link_text">Collection</Typography>
        </NavLink>
      ),
    },
    {
      name: (
        <NavLink className="link" to="/contact">
          <Typography className="link_text">Contact</Typography>
        </NavLink>
      ),
    },
    {
      name: <Auth isLoggedIn={isLoggedIn} />,
    },
  ];

  const list = () => (
    <Box
      className="menu-content"
      sx={{ width: 240 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <IconButton className="btn-close-desk" sx={{ left: "80%" }}>
        <CloseIcon sx={{ color: "whitesmoke" }} />
      </IconButton>

      <List>
        {page.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
          <img src={Assets.IconMenu} alt="" className="icon" />
        </IconButton>
        <SwipeableDrawer
          className="drawer"
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          anchor="left"
          sx={
            fullScreen
              ? {
                  "& .MuiDrawer-paper": {
                    width: "100%",
                    boxSizing: "border-box",
                  },
                }
              : undefined
          }
          PaperProps={{
            sx: {
              background: "rgb(0,0,0,0.1) !important ",
              overflow: "hidden",
              backdropFilter: "blur(15px)",
            },
          }}
        >
          {fullScreen ? (
            <>
              <Box className="navbar_wrapper" p={2}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseIcon sx={{ color: "black" }} />
                </IconButton>
                <Box className="logo">
                  <Link to="/" className="link" onClick={toggleDrawer(false)}>
                    <img
                      src={Assets.LogoNav}
                      alt=""
                      className="logo_media_mob"
                    />
                  </Link>
                </Box>
                <Box pr={2} className="navbar_right">
                  <NavLink to={"/cart"} onClick={toggleDrawer(false)}>
                    <IconButton color="inherit">
                      <StyledBadge badgeContent={cartItem}>
                        <img className="icon" src={Assets.IconCart} alt="" />
                      </StyledBadge>
                    </IconButton>
                  </NavLink>
                </Box>
              </Box>
            </>
          ) : undefined}
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default Menu;
