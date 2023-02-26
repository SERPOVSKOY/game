import { Meta } from 'rc-field-form/es/interface';

export type Control = Record<string, any>;
export interface AdapterProps {
  meta: Meta;
  control: Control;
}
