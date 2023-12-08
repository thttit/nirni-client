import React from "react";
import Assets from "../../../assets";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

function GoogleLogin({ token }: any) {
  return (
    <>
      <Link to={`http://localhost:1337/api/connect/google`} className="link">
        <Box
          className="login_social"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Button className="btn_social" fullWidth variant="outlined">
            <img
              src={Assets.GoogleLogo48}
              alt="Google Logo"
              className="icon_social"
            />
            Google
          </Button>
        </Box>
      </Link>
    </>
  );
}

export default GoogleLogin;
