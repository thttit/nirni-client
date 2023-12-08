import React from "react";
import "./Navbar.scss";
import { Outlet, Link } from "react-router-dom";
import Assets from "../../assets";
import { Box, IconButton } from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Menu from "./menu/Menu";

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    color: "black",
    padding: "0 4px",
  },
}));

const NavBar = ({ cartItem, isLoggedIn }: any) => {
  return (
    <>
      <nav className="navbar">
        <Box className="navbar_wrapper">
          <Box pl={2} className="navbar_left">
            <Menu cartItem={cartItem} isLoggedIn={isLoggedIn} />
            <IconButton color="inherit">
              <img src={Assets.IconSearch} alt="" className="icon" />
            </IconButton>
          </Box>
          <Box className="logo">
            <Link to="/">
              <img src={Assets.LogoNav} alt="" className="logo_media" />
            </Link>
          </Box>
          <Box pr={2} className="navbar_right">
            <IconButton color="inherit" onClick={() => window.open(`/cart`)}>
              <StyledBadge badgeContent={cartItem}>
                <img className="icon" src={Assets.IconCart} alt="" />
              </StyledBadge>
            </IconButton>
          </Box>
        </Box>
      </nav>

      <Outlet />
    </>
  );
};
export default NavBar;
