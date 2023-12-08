import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../navbar/Navbar.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Link,
  Typography,
  IconButton,
  useTheme,
  Dialog,
  DialogContentText,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Divider,
  ListItemIcon,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import "./Auth.scss";
//component
export const ShopPage = () => {
  return (
    <NavLink className="link" to="/shop">
      <Typography className="link_text">Shop</Typography>
    </NavLink>
  );
};
export const CollectionPage = () => {
  return (
    <NavLink className="link" to="/collection">
      <Typography className="link_text">Collection</Typography>
    </NavLink>
  );
};
export const ContactPage = () => {
  return (
    <NavLink className="link" to="/contact">
      <Typography className="link_text">Contact</Typography>
    </NavLink>
  );
};
export const Account = ({ isLoggedIn }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //useState
  const [isVisible, setIsVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  //Dropdown Menu Account
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {isLoggedIn ? (
        <>
          <NavLink
            to={"/login"}
            className="link"
            state={{ background: location }}
          >
            <Typography className="link_text">ACCOUNT</Typography>
          </NavLink>
        </>
      ) : (
        <NavLink
          to={"/login"}
          className="link"
          state={{ background: location }}
        >
          <Typography className="link_text">Login</Typography>
        </NavLink>
      )}
    </>
  );
};
