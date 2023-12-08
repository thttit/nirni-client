import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Auth.scss";
import {
  Box,
  Typography,
  Backdrop,
  Fade,
  Modal,
  Divider,
  useTheme,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
//Icon
import CloseIcon from "@mui/icons-material/Close";
//component
import { userData } from "./User";

const Auth = ({ isLoggedIn }: any) => {
  const { username, email } = userData();

  const location = useLocation();
  //useState
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClick = () => setOpenProfile(!openProfile);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    width: fullScreen ? 320 : 520,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Box className="link" onClick={handleOpen}>
            <Typography className="link_text">ACCOUNT</Typography>
          </Box>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <List
            sx={style}
            component="nav"
            subheader={
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h3"
                pb={2}
              >
                Welcome back, {username}
              </Typography>
            }
          >
            <Divider />
            <ListItemButton
              sx={{ cursor: "pointer", flexDirection: "column" }}
              onClick={handleClick}
            >
              <Box className={"link"}>
                <Typography
                  id="transition-modal-description"
                  variant="subtitle1"
                  sx={{ mt: 2, mb: 2, color: "black" }}
                >
                  Your Profile
                </Typography>
              </Box>
            </ListItemButton>
            <Collapse in={openProfile} timeout="auto" unmountOnExit>
              <Divider />
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" sx={{ color: "black" }}>
                      Name: {username}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: "black" }}>
                      Email: {email}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
            <ListItemButton
              sx={{ cursor: "pointer", flexDirection: "column" }}
              onClick={handleClose}
            >
              <NavLink to={"/orders"} className={"link"}>
                <Typography
                  id="transition-modal-description"
                  variant="subtitle1"
                  sx={{ mt: 2, mb: 2, color: "black" }}
                >
                  Your Orders
                </Typography>
              </NavLink>
            </ListItemButton>
            <Divider />
            <ListItemButton sx={{ cursor: "pointer", flexDirection: "column" }}>
              <NavLink to={"/logout"} className={"link"}>
                <Typography
                  id="transition-modal-description"
                  variant="subtitle1"
                  sx={{ mt: 2, mb: 2, color: "black" }}
                >
                  Logout
                </Typography>
              </NavLink>
            </ListItemButton>
          </List>
        </Fade>
      </Modal>
    </>
  );
};

export default Auth;
