import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, Form } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  FormControl,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  useTheme,
  DialogTitle,
  DialogContentText,
  Snackbar,
  Alert,
  Dialog,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
//component
import ButtonStyled from "../../buttonStyled";
import GoogleLogin from "./GoogleLogin";

interface IUserSignup {
  username: string;
  email: string;
  password: string;
}
const initialUser: IUserSignup = { username: "", email: "", password: "" };
const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openfailed, setOpenFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState(initialUser);
  const handleInVisibleForm = () => {
    navigate(-2);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailed(false);
  };
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const url = `https://nirni-store.onrender.com/api/auth/local/register`;
      if (signupData.username && signupData.email && signupData.password) {
        const res = await axios.post(url, signupData);
        if (res) {
          toast.success("Register successfully!", {
            position: toast.POSITION.TOP_LEFT,
            hideProgressBar: true,
          });
          navigate("/login");
        }
      }
    } catch (error: any) {
      setOpenFailed(true);
    }
  };
  return (
    <>
      <Snackbar open={openfailed} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Sign up failed!
        </Alert>
      </Snackbar>
      <Dialog
        open={true}
        onClose={handleInVisibleForm}
        fullScreen={fullScreen}
        component={Form}
        // method="post"
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
          <DialogTitle className="form_title">Create Account</DialogTitle>

          <FormControl
            margin="normal"
            sx={{ marginBottom: "8px" }}
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="username">Full name</InputLabel>
            <OutlinedInput
              className="button_border_radius"
              sx={{ borderRadius: "4px" }}
              name="username"
              id="username"
              type="string"
              label="full name"
              required
              value={signupData.username}
              autoComplete="username"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            sx={{ marginBottom: "8px" }}
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              className="button_border_radius"
              sx={{ borderRadius: "4px" }}
              name="email"
              id="email"
              value={signupData.email}
              label="Email"
              autoComplete="email"
              type="email"
              required
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            sx={{ marginBottom: "16px" }}
            variant="outlined"
            fullWidth
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              name="password"
              sx={{ borderRadius: "4px" }}
              label="Password"
              id="password"
              required
              autoComplete="current-password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              // type="password"
              value={signupData.password}
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

          <ButtonStyled
            // type="submit"
            className="btn_submit"
            fullWidth
            variant="contained"
            onClick={handleSignup}
          >
            Register
          </ButtonStyled>
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
            Already have an account?
            <Typography
              sx={{ ml: 1, textDecoration: "none" }}
              component={Link}
              // underline="hover"
              className="auth_link"
              to="/login"
              relative="path"
              color="blue"
            >
              Log in
            </Typography>
          </DialogContentText>
        </Box>
      </Dialog>
    </>
  );
};

export default Register;
