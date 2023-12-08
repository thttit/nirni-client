import styled from "@emotion/styled";
import { Button } from "@mui/material";

const ButtonStyled = styled(Button)({
  backgroundColor: "rgb(39, 40, 41)",
  cursor: "pointer",
  color: "whitesmoke",
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: "black",
    // borderColor: "#d90f45",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "black",
    borderColor: "#ce0041",
  },
  "&:focus": {
    // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export const ButtonStyledTwo = styled(Button)({
  backgroundColor: "#f4f4f5",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#ce0041",
    borderColor: "#d90f45",
    boxShadow: "none",
  },
  // '&:active': {
  //     boxShadow: 'none',
  //     backgroundColor: '#c70e36',
  //     borderColor: '#ce0041',
  // },
  "&:focus": {
    // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export default ButtonStyled;
