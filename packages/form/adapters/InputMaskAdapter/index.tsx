import React from 'react';
import { TextField } from '@mui/material';
import MaskedInput from 'react-text-mask';

import { TextFieldProps } from '@mui/material/TextField/TextField';

import { AdapterProps } from '../../types';

type Props = Omit<TextFieldProps, 'onChange' | 'value'> & {
  mask: (string | RegExp)[];
};

const MaskedInputAdapter =
  ({ mask, ...textFieldProps }: Props) =>
  ({ control, meta }: AdapterProps) => {
    return (
      <MaskedInput
        value={control.value}
        onChange={control.onChange}
        mask={mask}
        render={(ref, props) => (
          <TextField
            {...textFieldProps}
            {...props}
            inputRef={ref}
            error={!!meta.errors.length}
            helperText={meta.errors[0]}
          />
        )}
      />
    );
  };

export default MaskedInputAdapter;
