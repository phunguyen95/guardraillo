import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { colors } from "../Theme/ColorPalette";
interface InputContainerProps {
  error: boolean,
  inputLabel: string,
  placeholder: string,
  inputValue: string,
  errorMessage: React.ComponentType<{errorMessage: string}>;
  textType: string,
}
const useStyle = makeStyles({
  container: {
    // width: "65%",
    borderRadius: "10px",
    marginTop: "15px",
  },
  input: {
    "&::placeholder": {
      fontFamily: "Nunito_SemiBold",
      color: colors.placeholder,
    },
    fontFamily: "Nunito_SemiBold",
    color: colors.darkBlue,
    fontSize: "16px",
  },
  inputWrapper: {
    "& .MuiOutlinedInput-input": {
      color: colors.darkBlue,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.darkWhite,
      borderRadius: "8px",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.lightBlue,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.lightBlue,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.lightBlue,
    },
  },
  errorWrapper: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.error,
      borderRadius: "8px",
    },
  },
});
const styles = {
  fontStyle: {
    fontFamily: "Nunito_SemiBold",
    color: colors.error,
  },
  inputLabel: {
    fontFamily: "Nunito_SemiBold",
    color: colors.lightGrey,
  },
};
function InputContainer({ error, inputLabel, placeholder, inputValue, errorMessage, textType, ...rest }:InputContainerProps ) {
  const classes = useStyle();
  return (
    <TextField
      error={error ? error : null}
      className={classes.container}
      InputLabelProps={{
        shrink: true,
        style: {
          color: error ? colors.error : colors.lightGrey,
          fontFamily: "Nunito_SemiBold",
        },
      }}
      classes={!error ? { root: classes.inputWrapper } : { root: classes.errorWrapper }}
      id={error ? "outlined-error-helper-text" : "outlined-helperText"}
      label={inputLabel}
      type={textType}
      defaultValue={inputValue}
      placeholder={placeholder}
      helperText={error ? errorMessage : null}
      FormHelperTextProps={{ style: styles.fontStyle }}
      variant="outlined"
      InputProps={{
        classes: { input: classes.input },
      }}
      {...rest}
    />
  );
}

export default InputContainer;
