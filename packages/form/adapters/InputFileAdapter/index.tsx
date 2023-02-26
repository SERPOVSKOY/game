import React, { InputHTMLAttributes } from 'react';

import { AdapterProps } from '../../types';

interface InputFileProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'accept' | 'multiple' | 'style'> {
  id: string;
}

const InputFileAdapter =
  (inputProps: InputFileProps) =>
  ({ control, meta }: AdapterProps) =>
    <input type="file" {...inputProps} value={control.value} onChange={control.onChange} />;

export default InputFileAdapter;
