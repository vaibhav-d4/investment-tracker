// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';

// MUI ICONS IMPORTS
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InputFieldComponent = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  required,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        required={required}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default InputFieldComponent;
