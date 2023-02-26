import React from 'react';

import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  FormHelperText,
  FormControl,
  InputLabel
} from '@mui/material';

import { AdapterProps } from '../../types';

export interface Props<T extends string = string>
  extends Omit<SelectProps<T>, 'onChange' | 'renderValue' | 'displayEmpty' | 'name'> {
  helperText?: string;
  options: {
    value?: T;
    label?: string | null;
    hidden?: boolean;
    disabled?: boolean;
  }[];
  displayEmpty?: boolean;
}

const SelectAdapter =
  <T extends string = string>({
    options,
    displayEmpty = false,
    placeholder,
    helperText,
    multiple,
    error,
    fullWidth,
    sx = { width: '190px' }, // TODO: Убрать эту фиксированную ширину и поправить места использования
    ...props
  }: Props<T>) =>
  ({ control, meta }: AdapterProps) => {
    // Кастомный placeholder так как по-умолчанию select не умеет
    const placeholderStyle = {
      '& .MuiSelect-select .notranslate::after': placeholder
        ? {
            content: `"${placeholder}"`,
            opacity: 0.42
          }
        : {}
    };

    const helpText = helperText ?? meta.errors[0];
    const value = control?.value ?? (multiple ? [] : '');

    return (
      <FormControl sx={{ width: '100%' }} fullWidth={fullWidth}>
        {!!props.label && <InputLabel>{props.label}</InputLabel>}

        <Select
          sx={{
            ...placeholderStyle,
            ...sx
          }}
          value={value}
          displayEmpty={displayEmpty}
          multiple={multiple}
          fullWidth
          onChange={(e: SelectChangeEvent<T>) => control.onChange(e.target.value)}
          {...props}
        >
          {options.map((option, index) => (
            <MenuItem
              disabled={option?.disabled}
              style={option.hidden ? { display: 'none' } : {}}
              key={index}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helpText && (
          <FormHelperText error={error || !!meta.errors.length}>{helpText}</FormHelperText>
        )}
      </FormControl>
    );
  };

export default SelectAdapter;
