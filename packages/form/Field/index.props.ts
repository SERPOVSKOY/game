import { FieldProps as RcFieldProps } from 'rc-field-form/es/Field';
import { Meta } from 'rc-field-form/es/interface';

import { Control } from '../types';

export interface FieldProps extends RcFieldProps {
  className?: string;
  component: ({ control, meta }: { meta: Meta; control: Control }) => JSX.Element;
}
