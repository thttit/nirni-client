import { NavLink, useLocation } from "react-router-dom";
import "../navbar/Navbar.scss";
import { Typography } from "@mui/material";
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
