import React from 'react';

import { AdapterProps } from '../../types';
import CheckboxComponentAdapter from './CheckboxAdapter';
import { CheckboxOption } from './types';

const CheckboxAdapter =
  ({ options }: { options: CheckboxOption[] }) =>
  ({ control, meta }: AdapterProps) =>
    (
      <CheckboxComponentAdapter
        control={control}
        options={options}
        error={!!meta.errors.length}
        helperText={meta.errors[0]}
      />
    );
export default CheckboxAdapter;
