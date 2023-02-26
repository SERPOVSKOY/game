import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { AdapterProps } from '../../types';

const InputAdapter =
  ({ pattern, ...textFieldProps }: TextFieldProps & { pattern?: RegExp }) =>
  ({ control, meta }: AdapterProps) =>
    (
      <TextField
        {...textFieldProps}
        value={control.value}
        onChange={e => {
          if (pattern) {
            control.onChange(
              pattern.test(e.target.value)
                ? e.target.value
                : e.target.value.substring(0, e.target.value.length - 1)
            );
          } else {
            control.onChange(e.target.value);
          }
        }}
        error={!!meta.errors.length}
        helperText={meta.errors[0] || textFieldProps.helperText}
      />
    );

export default InputAdapter;
