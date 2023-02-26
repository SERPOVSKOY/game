import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Checkbox, FormControl, FormHelperText } from '@mui/material';

import { AdapterProps } from '../../types';

import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { CheckboxOption } from './types';

// TODO: Перенести в тему
const HALF_HEIGHT_HELPER_TEXT = '20px';

const CheckboxComponentAdapter: FC<
  AdapterProps['control'] & {
    options: CheckboxOption[];
    error?: boolean;
    helperText?: string;
  }
> = ({ options, control, error, helperText }) => {
  const [activeOptions, setActiveOptions] = useState<string[]>([]);

  useEffect(() => {
    const initialActiveOptions = options.filter(option => option.checked);
    setActiveOptions(initialActiveOptions.map(option => option.name));

    if (initialActiveOptions.length) {
      control.onChange(initialActiveOptions);
    }
  }, [options]);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const currentOption: CheckboxOption | undefined = options.find(
        option => option.name === event.target.name
      );

      if (currentOption) {
        const isChecked = activeOptions.includes(currentOption.name);
        currentOption.checked = !isChecked;

        if (Array.isArray(control.value) && control.value?.length) {
          const newValue = isChecked
            ? control.value.filter((option: CheckboxOption) => option.name !== currentOption.name)
            : [...control.value, currentOption];

          setActiveOptions(newValue.map((option: CheckboxOption) => option.name));

          control.onChange(newValue.length ? newValue : undefined);
        } else {
          setActiveOptions(currentOption.checked ? [currentOption.name] : []);
          control.onChange(currentOption.checked ? [currentOption] : []);
        }
      }
    },
    [control, options]
  );

  return (
    <FormControl error={error}>
      <FormGroup sx={{ mb: HALF_HEIGHT_HELPER_TEXT }}>
        {options.map(option => (
          <FormControlLabel
            sx={{ ml: '-5px' }} // по дефолту MUI добавляет -11px
            key={option.name}
            checked={activeOptions.includes(option.name)}
            control={<Checkbox onChange={onChange} {...option} />}
            label={
              <Typography sx={{ ml: '4px' }} variant="body1">
                {option.label}
              </Typography>
            }
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default CheckboxComponentAdapter;
