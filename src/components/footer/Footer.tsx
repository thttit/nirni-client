import {
  Box,
  Container,
  TextField,
  Link,
  Typography,
  Button,
} from "@mui/material";
import "./Footer.scss";
import ButtonStyled from "../buttonStyled";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"©  "}
      {new Date().getFullYear()}
      {"  "}
      <Link className="link_copyright" color="inherit" href="/">
        NIRNI
      </Link>{" "}
    </Typography>
  );
}
function EmailAddress() {
  return (
    <form>
      <Box className="email_address">
        <TextField
          type="email"
          className="email_input"
          label="Email Address"
          variant="outlined"
          InputLabelProps={{
            style: { top: "-8px" },
          }}
          InputProps={{
            sx: {
              borderRadius: "2px",
              height: "32px",
              "&:hover": {
                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  border: "1px solid black",
                },
              },
            },

            inputProps: {
              sx: {
                minWidth: "56px",
                width: "160px",
              },
            },
          }}
        />
        <ButtonStyled
          sx={{ maxWidth: "30px", fontSize: "9px" }}
          type="submit"
          className="email_btn"
          variant="contained"
        >
          JOIN
        </ButtonStyled>
      </Box>
    </form>
  );
}
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box className="footer_link">
          <Typography variant="body2" color="text.secondary">
            <Link
              underline="hover"
              variant="body2"
              color="inherit"
              href="/shop"
            >
              Instagram
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              underline="hover"
              variant="body2"
              color="inherit"
              href="/shop"
            >
              Shipping & Return policy
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              underline="hover"
              variant="body2"
              color="inherit"
              href="/contact"
            >
              Contact
            </Link>
          </Typography>
        </Box>
        <EmailAddress />
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
