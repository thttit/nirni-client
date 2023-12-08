import { createTheme, ThemeProvider } from "@mui/material";
import "./theme.scss";
declare module "@mui/material/styles" {
  interface CustomTheme {
    custom?: {
      coloredBulletList: Object;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
export interface IThemeChild {
  children?: React.ReactNode;
}

const theme = createTheme({
  custom: {
    coloredBulletList: {
      listStyle: "none",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "8px 0", // Adjust as needed
      "& li": {
        // position: 'relative',
        paddingLeft: "24px", // Adjust as needed
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "8px", // Bullet width
          height: "8px", // Bullet height
          backgroundColor: "#C02739", // Change this to your desired color
          borderRadius: "50%",
        },
      },
    },
  },
  typography: {
    h3: {
      fontSize: 36,
      color: "rgb(39, 40, 41)",
    },
    h4: {
      fontSize: 24,
    },
    h6: {
      fontSize: 16,
    },
    subtitle1: {
      fontSize: "14px",
      color: "rgb(39, 40, 41)",
    },
    subtitle2: {
      fontSize: "12px",
      color: "rgb(39, 40, 41)",
    },
    body1: {
      fontSize: "10px",
      // color: "rgb(39, 40, 41)",
    },
    body2: {
      fontSize: "11px",
      // color: "rgb(39, 40, 41)",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 12,
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          fontSize: 18,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 18,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          // fontSize: 25,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hoverVisible": {
            background: "none",
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const Theme: React.FC<IThemeChild> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
