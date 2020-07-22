import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DateInputs from '../index.tsx';
import './styles.css';

const CustomInputComponent = React.forwardRef((props, ref) => {
  return (
    <input
      style={{ padding: '6px', marginRight: '4px', marginTop: '0.2rem' }}
      {...props}
      ref={ref}
    />
  );
});

CustomInputComponent.displayName = 'CustomInputComponent';

const CustomLabelComponent = (props) => {
  return (
    <label
      style={{
        textTransform: 'uppercase',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: '0.8rem',
      }}
      {...props}
    />
  );
};

storiesOf('React Date Inputs', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true } })
  .add('Simple', () => {
    const [value, setValue] = useState();

    return <DateInputs value={value} onChange={setValue} label="Date" />;
  })
  .add('With Initial Value', () => {
    const [value, setValue] = useState(new Date(2020, 3, 20));

    return <DateInputs value={value} onChange={setValue} label="Date" />;
  })
  .add('Disabled', () => {
    return <DateInputs value={new Date()} label="Date" disabled />;
  })
  .add('With Custom Components', () => {
    const [value, setValue] = useState();

    return (
      <DateInputs
        value={value}
        onChange={setValue}
        label="Date"
        inputComponent={CustomInputComponent}
        labelComponent={CustomLabelComponent}
      />
    );
  });
