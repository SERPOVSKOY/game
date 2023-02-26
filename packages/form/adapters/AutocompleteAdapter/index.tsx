import React, { ChangeEvent } from 'react';

import { TextField, Autocomplete } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { AdapterProps } from '../../types';
import { v4 as uuid } from 'uuid';

export interface AutocompleteAdapterProps<T>
  extends Omit<AutocompleteProps<T, any, any, false>, 'renderInput'> {
  options: T[];
  inputProps?: Omit<TextFieldProps, 'onChange'>;
  freeSoloWithText?: boolean;
  onChangeInputValue?: (control: Record<string, any>) => (e: ChangeEvent<HTMLInputElement>) => void;
}

const AutocompleteAdapter =
  <T extends { id?: string; label?: string }>({
    options,
    inputProps,
    placeholder,
    onChangeInputValue,
    freeSoloWithText,
    ...props
  }: AutocompleteAdapterProps<T>) =>
  ({ control, meta }: AdapterProps) => {
    const onChange = (control: Record<string, any>) => (e: ChangeEvent<HTMLInputElement>) => {
      control.onChange(e.target.value);
    };

    return (
      <Autocomplete
        {...props}
        options={options}
        value={control.value}
        onChange={(_, option) => control.onChange(option)}
        renderOption={(liProps, option) => (
          <li {...liProps} key={option.id || uuid()}>
            {(props && props.getOptionLabel && props.getOptionLabel(option)) || option.label}
          </li>
        )}
        renderInput={params => (
          <TextField
            {...params}
            {...{
              ...inputProps,
              ...(freeSoloWithText ? { onChange: onChange(control) } : {})
            }}
            fullWidth
            placeholder={placeholder}
            error={!!meta.errors.length}
            helperText={meta.errors[0]}
          />
        )}
      />
    );
  };

export default AutocompleteAdapter;
