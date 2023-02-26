# form

## Структура
```
├── adapters (адаптеры элементов формы для компонента Field)
├── Field (компонент - поле формы)
├── Form (реэкспорт формы из rc-form-field)
└── validators (утилиты для валидации полей формы)
```

## Как использовать
```jsx
import React from 'react';
import { Form, Field, useForm, InputAdapter, fieldValidator, onlyCyrillic, minLength } from '@delivery/form';

const FormExample = () => {
    const [form] = useForm();
    const onSubmit = () => {
        // code..
    };

    return (
        <Form form={form} onFinish={onSubmit}>
            <Field
                component={InputAdapter({
                    label: 'Имя пользователя',
                    placeholder: 'Введите текст',
                })}
                name="userName"
                rules={fieldValidator(true, [onlyCyrillic(), minLength({ fieldName: 'Имя', limit: 2 })])}
            />
        </Form>
    );
};

export default FormExample;
```
## Rules
Для генереции правил валидации для полей формы смотри **JSDoc** к функции **fieldValidator**