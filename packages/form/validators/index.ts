import { Rule, RuleObject, StoreValue } from 'rc-field-form/es/interface';
import { wordWithDeclination } from './utils';

type Validator = (value: any) => string | undefined;
type ValidatorMaker = (message?: string) => Validator;
type ValidatorMakerWithParams<T> = (params: T) => Validator;

const SYMBOL_DECLENSION = ['символа', 'символов', 'символов'];

interface IValidatorByLimit {
  limit: number;
  fieldName: string;
}

const ERRORS = {
  required: 'Введите значение',
  onlyCyrillic: 'Используйте только символы кириллицы',
  onlyLatin: 'Используйте только символы латиницы',
  onlyNumbers: 'Используйте только цифры',
  invalidChars: 'Поле содержит недопустимые символы',
  email: 'Пожалуйста, введите корректный Email',
  periodTime: 'Пожалуйста, введите корректный период времени',
  time: 'Пожалуйста, введите корректное время',
  date: 'Пожалуйста, введите корректную дату',
  url: 'Пожалуйста, введите корректную ссылку',
  phone: 'Пожалуйста, введите корректный номер',
  price: 'Пожалуйста, введите корректную цену',
  minLength: ({ fieldName, limit }: IValidatorByLimit) =>
    `${fieldName} не может быть короче ${limit} ${wordWithDeclination(limit, SYMBOL_DECLENSION)}`,
  maxLength: ({ fieldName, limit }: IValidatorByLimit) =>
    `${fieldName} не может быть длиннее ${limit} ${wordWithDeclination(limit, SYMBOL_DECLENSION)}`
};

/* eslint-disable */
const onlyNumbersRegex = /\D+/g;
const emailTrimCharacterRegex = /[^a-zA-Z0-9-_@.]/g;
const emailValidationRegex =
  /^[A-Z0-9!#$%&'*+\/=?^_`{|}~-]{1,64}(?:\.[A-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([A-Z0-9-]+(?:\.[A-Z0-9-])*\.[A-Z0-9]*[A-Z-]+[A-Z0-9]*)$/i;
const timeValidationRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g;
const periodTimeValidationRegex =
  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/g;
const dateValidationRegex = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/g;
const fileExtensionRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
const urlValidationRegex =
  /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;
const PHONE_MASK = [
  '+',
  /[1-9]/,
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/
];

export const DRIVING_LICENSE_SERIAL_NUMBER = [
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

const priceValidationRegex = /^\d+((.|,)\d\d?)?$/;
/* eslint-disable */

const invalidChars: ValidatorMaker =
  (message = ERRORS.invalidChars) =>
  (value: string | undefined) =>
    value && /[^\sа-яА-ЯёЁ]/.test(value) ? message : undefined;

const onlyNumbers: ValidatorMaker =
  (message = ERRORS.onlyNumbers) =>
  (value: string | undefined) =>
    value && /\D/.test(value) ? message : undefined;

const onlyCyrillic: ValidatorMaker =
  (message = ERRORS.onlyCyrillic) =>
  (value: string | undefined) =>
    value && /[A-Za-z]/.test(value) ? message : undefined;

const onlyLatin: ValidatorMaker =
  (message = ERRORS.onlyLatin) =>
  (value: string | undefined) =>
    value && /[А-Яа-я]/.test(value) ? message : undefined;

const minLength: ValidatorMakerWithParams<IValidatorByLimit> =
  ({ fieldName, limit }) =>
  (value: string | undefined) =>
    value && value.length < limit ? ERRORS.minLength({ fieldName, limit }) : undefined;

const maxLength: ValidatorMakerWithParams<IValidatorByLimit> =
  ({ fieldName, limit }) =>
  (value: string | undefined) =>
    value && value.length > limit ? ERRORS.maxLength({ fieldName, limit }) : undefined;

const validRequired: ValidatorMaker =
  (message = ERRORS.required) =>
  value =>
    typeof value === 'undefined' || value === null || value.length === 0 ? message : undefined;

const composeValidators =
  <T>(validators: Validator[]) =>
  (value: T) =>
    validators.reduce(
      (error: string | undefined, validator) => error || validator(value),
      undefined
    );

const validEmail =
  (message = ERRORS.email) =>
  (value: string | undefined) => {
    const match = value && value.match(emailValidationRegex);
    return match && match[1].length <= 255 ? undefined : message;
  };

const validTime =
  (message = ERRORS.time) =>
  (value: string | undefined) => {
    const match = value && value.match(timeValidationRegex);
    return match ? undefined : message;
  };

const validPeriodTime =
  (message = ERRORS.periodTime) =>
  (value: string | undefined) => {
    const match = value && value.match(periodTimeValidationRegex);

    if (!match) return message;

    const times = value.split('-');
    const validPeriod =
      new Date(`${new Date().toISOString().split('T')[0]} ${times[1]}`) >
      new Date(`${new Date().toISOString().split('T')[0]} ${times[0]}`);

    return validPeriod ? undefined : message;
  };

const validDate =
  (message = ERRORS.date) =>
  (value: string | undefined) => {
    const match = value && value.match(dateValidationRegex);

    return match ? undefined : message;
  };

const validUrl =
  (message = ERRORS.url) =>
  (value: string | undefined) => {
    const match = value && value.match(urlValidationRegex);

    return match ? undefined : message;
  };

const validPhone =
  (message = ERRORS.phone) =>
  (value?: string) => {
    return !value?.includes('_') ? undefined : message;
  };

const validPrice =
  (message = ERRORS.price) =>
  (value?: number | string) => {
    const match = value && value.toString().match(priceValidationRegex);

    return match ? undefined : message;
  };

/**
 * Генератор правил валидации для полей формы
 * @param {boolean} required - обязательное / не обязательное поле
 * @param {Array<Validator>} validators - массив валидаторов
 * @returns {Array<Rule>}
 */
const fieldValidator = (required: boolean, validators?: Validator[]): Rule[] => {
  const allValidators = validators ?? [];

  if (required) {
    allValidators.unshift(validRequired());
  }

  const validate = composeValidators(allValidators);

  return [
    {
      required,
      validator: (rule: any, value: any) => {
        if (!value && !required) return Promise.resolve();
        const result = validate(value);

        return !result ? Promise.resolve() : Promise.reject(result);
      }
    }
  ];
};

export {
  onlyCyrillic,
  onlyLatin,
  onlyNumbers,
  invalidChars,
  fieldValidator,
  validEmail,
  minLength,
  maxLength,
  validTime,
  validPeriodTime,
  validDate,
  validUrl,
  validPhone,
  validPrice,
  PHONE_MASK,
  emailValidationRegex,
  emailTrimCharacterRegex,
  onlyNumbersRegex,
  fileExtensionRegex
};
