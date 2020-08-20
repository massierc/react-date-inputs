# React Date Inputs

Simple and lightweight date inputs for your React app.

[View demo](https://massierc.github.io/react-date-inputs/)

## Installation

Install with npm

```bash
npm i --save react-date-inputs
```

or with yarn

```bash
yarn add react-date-inputs
```

## Usage

```javascript
import React, { useState } from 'react';
import ReactDateInputs from 'react-date-inputs';

const MyComponent = () => {
  const [value, setValue] = useState(new Date());

  return <ReactDateInputs value={value} onChange={setValue} />;
};
```

## Props

| prop                | type                       | required | default                    | description                                                                                                     |
| ------------------- | -------------------------- | -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| value               | `Date`                     | -        | -                          |
| onChange            | `(value: Date): undefined` | -        | -                          |
| onBlur              | `(): undefined`            | -        | -                          |
| dayPlaceholder      | `string`                   | -        | `'DD'`                     |
| monthPlaceholder    | `string`                   | -        | `'MM'`                     |
| yearPlaceholder     | `string`                   | -        | `'YYYY'`                   |
| className           | `string`                   | -        | -                          |
| label               | `string`                   | -        | -                          |
| disabled            | `boolean`                  | -        | `false`                    |
| inputComponent      | `React.ReactType`          | -        | -                          | Component used for inputs. Must use `React.forwardRef` for functional components                                |
| labelComponent      | `React.ReactType`          | -        | -                          | Component used for label                                                                                        |
| inputComponentProps | `Record<string, unknown>`  | -        | `{}`                       | Any additional prop to be passed down to custom input component                                                 |
| labelComponentProps | `Record<string, unknown>`  | -        | `{}`                       | Any additional prop to be passed down to custom label component                                                 |
| show                | `string[]`                 | -        | `['day', 'month', 'year']` | Determines which inputs to show                                                                                 |
| autoTab             | `boolean`                  | -        | `false`                    | Enable automatic tab between inputs. If set to `true`, `inputComponent` must be wrapped in `React.forwardRef()` |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
