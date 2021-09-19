import React from "react"
import {
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    FormHelperText,
    FormControl,
  } from "@mui/material";
  
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IPasswordProps {
    password: string, handleChange: (e: React.ChangeEvent<any>) => void, error?: string
    handleBlur:  (e: React.FocusEvent<any>) => void
}

const Password: React.VFC<IPasswordProps> = ({handleChange,password, error, handleBlur
    
}) => {
    const [isShowingPassword, setIsShowingPassword] = React.useState(false);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        event.preventDefault();
      };
      
  const handleClickShowPassword = () => {
    setIsShowingPassword((state) => !state);
  };

    return (<FormControl fullWidth variant="standard">
    <InputLabel htmlFor="standard-adornment-password">
      Password
    </InputLabel>
    <Input
      id="standard-adornment-password"
      type={isShowingPassword ? "text" : "password"}
      value={password}
      onChange={handleChange}
      name="password"
      onBlur={handleBlur}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {isShowingPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )}
          </IconButton>
        </InputAdornment>
      }
    />
    {error && (
      <FormHelperText id="component-error-text">
        {error}
      </FormHelperText>
    )}
  </FormControl>)
}

export default Password;