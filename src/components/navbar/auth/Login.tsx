import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, NavLink, useLocation, Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  FormControl,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  DialogTitle,
  useTheme,
  Dialog,
  Box,
  DialogContentText,
} from "@mui/material";
//Icon
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ButtonStyled from "../../buttonStyled";
import { storeUser } from "./User";
import GoogleLogin from "./GoogleLogin";

export const loader = async () => {
  const res = await axios.get(`http://localhost:1337/api/auth/local`);
  return res;
};
export interface IsVisible {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IUserLogin {
  identifier: string;
  password: string;
}
const initialUser: IUserLogin = { identifier: "", password: "" };
const Login = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [signinData, setSigninData] = useState(initialUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInVisibleForm = () => {
    navigate("/shop");
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (signinData.identifier && signinData.password) {
        const { data } = await axios.post(url, signinData);
        if (data.jwt) {
          console.log(signinData.identifier);

          storeUser(data);

          setSigninData(initialUser);
          navigate("/shop");
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error("Login failed!", {
        position: toast.POSITION.TOP_LEFT,
        hideProgressBar: true,
      });
    }
  };
  return (
    <>
      <Dialog
        open={true}
        onClose={handleInVisibleForm}
        fullScreen={fullScreen}
        sx={{ backdropFilter: "blur(15px)" }}
        PaperProps={{
          sx: {
            borderRadius: "4px",
          },
        }}
      >
        <Box className="login">
          <IconButton
            className="btn_close"
            edge="start"
            color="inherit"
            onClick={handleInVisibleForm}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleLogin}>
            <DialogTitle className="form_title">Welcome to NIRNI</DialogTitle>

            <FormControl
              sx={{ marginBottom: "8px" }}
              margin="normal"
              required
              fullWidth
              variant="outlined"
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                className="button_border_radius"
                sx={{ borderRadius: "4px" }}
                name="identifier"
                id="email"
                value={signinData.identifier}
                label="Email"
                autoComplete="email"
                type="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              sx={{ marginBottom: "16px" }}
              variant="outlined"
              required
              fullWidth
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                name="password"
                sx={{ borderRadius: "4px" }}
                label="Password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                value={signinData.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={
                    <Typography className="checkbox_email">
                      Remember me
                    </Typography>
                  }
                />
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ ml: 1, textDecoration: "none" }}
                  component={NavLink}
                  className="auth_link"
                  to="/register"
                  relative="path"
                  state={{ background: location }}
                  color="blue"
                >
                  Forgot password
                </Typography>
              </Grid>
            </Grid>
            <ButtonStyled
              type="submit"
              className="btn_submit"
              fullWidth
              variant="contained"
            >
              Log in
            </ButtonStyled>
          </form>
          <DialogContentText className="login_google_text">
            Log in with google
          </DialogContentText>

          <GoogleLogin />

          <DialogContentText
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "200",
            }}
          >
            If you dont't have account
            <Typography
              sx={{ ml: 1, textDecoration: "none" }}
              component={NavLink}
              // underline="hover"
              className="auth_link"
              to="/register"
              relative="path"
              state={{ background: location }}
              color="blue"
            >
              Register now
            </Typography>
          </DialogContentText>
        </Box>
      </Dialog>
    </>
  );
};

export default Login;
