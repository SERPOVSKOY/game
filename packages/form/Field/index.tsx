import React, { FC } from 'react';
import { Field as RcField } from 'rc-field-form';

import { FieldProps } from './index.props';

const Field: FC<FieldProps> = ({ className, component, ...fieldProps }) => (
  <RcField {...fieldProps}>
    {(control, meta) => <div className={className}>{component({ control, meta })}</div>}
  </RcField>
);

export default Field;
