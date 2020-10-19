import { createMuiTheme } from "@material-ui/core/styles";

export const theme = {
  black: "#111111",
  grey: "#f7f7f7",
  blue: "#ebf8fc",
};

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "rgb(187,246,255)", //button text white instead of black
    },
    secondary: {
      main: "#242526",
    },
  },
  overrides: {
    MuiDialogContent: {
      root: {
        background: "black",
      },
    },
    MuiDialogActions: {
      root: {
        background: "black",
      },
    },
    MuiInputLabel: {
      root: {
        color: "rgb(73,117,208)",
        fontWeight: "bold",
      },
    },
    MuiContainer: {
      root: {
        "& .form-update-primary-infos": {
          transform: "translate(40px, 40px)",
        },
      },
    },
    MuiSwitch: {
      switchBase: {
        color: "#f48fb1",

        "&&.Mui-checked": {
          color: "rgb(73,117,208)",
        },
        "&&.MuiSwitch-colorSecondary": {
          background: "transparent",
        },
      },
      track: {
        backgroundColor: "#f48fb1",
        "$checked$checked + &": {
          backgroundColor: "rgb(73,117,208)", // Light green, aka #74d77f
        },
      },
    },
    MuiGrid: {
      root: {
        "& .error": {
          height: "56px",
          zIndex: "1",
          transform: "translate(0px, -1px)",
          width: "10px",
          backgroundColor: "#f48fb1",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          position: "absolute",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        "& input": {
          padding: "18px 21px",
        },
        borderRadius: "14px",
        color: "rgb(187,246,255)",
        "& $notchedOutline": {
          borderColor: "rgb(73,117,208)",
        },
        "&:hover $notchedOutline": {
          borderColor: "rgb(187,246,255)",
        },
        "&$focused $notchedOutline": {
          borderColor: "rgb(187,246,255)",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "rgb(73,117,208)",
      },
    },
    MuiInput: {
      root: {
        color: "rgb(187,246,255)",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "rgb(73,117,208)",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "black",
        color: "black",
      },
      dayLabel: {
        color: "rgb(73,117,208)",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#000000",
      },
    },
    MuiPickersDay: {
      day: {
        color: "rgb(187,246,255)",
      },
      daySelected: {
        backgroundColor: "rgb(73,117,208)",
        "&&:hover": {
          backgroundColor: "rgba(73,117,208, 0.7)",
        },
      },
      dayDisabled: {
        color: "black",
      },
      current: {
        color: "rgb(187,246,255)",
      },
    },
    MuiButtonBase: {
      root: {
        backgroundColor: "black",
        "&&.MuiPickersCalendarHeader-iconButton": {
          backgroundColor: "black",
        },
      },
    },
    MuiTypography: {
      h4: {
        fontWeight: "600",
        fontSize: "34px",
        color: "#fff",
      },
      h5: {
        fontSize: "16px",
        color: "rgb(187,246,255)",
      },
      subtitle1: {
        fontWeight: "600",
        fontSize: "20px",
        color: "rgb(73,117,208)",
      },
      subtitle2: {
        fontWeight: "600",
        fontSize: "20px",
        color: "rgb(187,246,255)",
      },
      body1: {
        fontSize: "18px",
        color: "#fff",
        lineHeight: "1.3",
      },
      body2: {
        color: "rgb(187,246,255)",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    MuiButtonGroup: {
      root: {},
    },
    MuiChip: {
      root: {
        backgroundColor: "rgb(73,117,208)",
        color: "#fff",
        "&&:hover": {
          backgroundColor: "rgba(73,117,208, 0.4)",
        },
      },
    },
    MuiButton: {
      root: {
        // Name of the rule
        transition: "all 0.3s",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "10px",
        textTransform: "uppercase",
        appearance: "none",
        background: "rgb(73,117,208)",
        color: "white",
        "&&:hover": {
          background: "rgba(73,117,208, 0.7)",
        },
      },
      label: {
        display: "flex",
        flexDirection: "column",
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
      },
    },
    MuiFormGroup: {
      root: {
        color: "rgb(187,246,255)",
        display: "flex",
        flexDirection: "row",
      },
    },
    MuiRadio: {
      root: {
        color: "rgb(73,117,208)",
        "&&:hover": {
          color: "rgb(187,246,255)",
        },
        "&&.Mui-checked": {
          color: "rgb(187,246,255)",
        },
      },
    },
  },
});
