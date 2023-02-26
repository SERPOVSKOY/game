import React, { ChangeEvent, useState, useEffect } from 'react';

import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { AdapterProps } from '../../types';

export interface AsyncAutocompleteAdapterProps<T>
  extends Omit<AutocompleteProps<T, any, any, false>, 'renderInput' | 'options'> {
  getSuggestions: (input: string) => Promise<any>;
  inputProps?: Omit<TextFieldProps, 'onChange'>;
  freeSoloWithText?: boolean;
  onChangeInputValue?: (control: Record<string, any>) => (e: ChangeEvent<HTMLInputElement>) => void;
  beginInputText: string;
}

const AsyncAutocomplete = <T,>({
  control,
  meta,
  getSuggestions,
  beginInputText,
  inputProps,
  freeSoloWithText,
  placeholder,
  ...props
}: AdapterProps & AsyncAutocompleteAdapterProps<T>) => {
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputAutocompleteChange = (event: React.SyntheticEvent, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  const toggleSuggestions = (state: boolean) => () => {
    setOpen(state);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const res = await getSuggestions(inputValue); // For demo purposes.
      const data = res.data.suggestions || [];

      setLoading(false);
      if (active) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue, getSuggestions]);
  const onChange = (control: Record<string, any>) => (e: ChangeEvent<HTMLInputElement>) => {
    control.onChange(e.target.value);
  };

  return (
    <Autocomplete
      {...props}
      open={open}
      autoComplete
      filterOptions={x => x}
      onOpen={toggleSuggestions(true)}
      onClose={toggleSuggestions(false)}
      getOptionLabel={(option: any) => option.value ?? ''}
      inputValue={inputValue}
      includeInputInList
      filterSelectedOptions
      noOptionsText={!inputValue ? beginInputText : 'Ничего не найдено...'}
      onInputChange={handleInputAutocompleteChange}
      options={options}
      loading={loading}
      value={control.value ?? ''}
      onChange={(_, option) => control.onChange(option)}
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
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

const AsyncAutocompleteAdapter =
  <T,>({ ...props }: AsyncAutocompleteAdapterProps<T>) =>
  ({ control, meta }: AdapterProps) => {
    return <AsyncAutocomplete control={control} meta={meta} {...props} />;
  };

export default AsyncAutocompleteAdapter;
