import React from "react";
import "./Contact.scss";
import { Box, Typography, Container, Link } from "@mui/material";
const Contact = () => {
  return (
    <Box className="contact_wrapper">
      <Container component="main" sx={{ mt: "168px", mb: 2 }} maxWidth="sm">
        <Box sx={{ mt: 2 }}>
          <Typography
            className="contact_info"
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            General/ Press/ Other Inquiries:
          </Typography>
          <Typography className="contact_info" variant="subtitle1">
            Nirni.offical@gmail.com
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }} className="contact_info">
          <Typography
            className="contact_info"
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
          >
            Instagram
          </Typography>
          <Link
            className="contact_info"
            underline="hover"
            variant="subtitle1"
            color="inherit"
            href="https://www.instagram.com/nirni_official/"
          >
            @nirni_official
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
