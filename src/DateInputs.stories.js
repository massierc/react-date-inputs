import React, { useState } from 'react';
import DateInputs from './index.tsx';

export default {
  title: 'DateInputs',
  component: DateInputs,
};

export const Simple = () => {
  const [value, setValue] = useState();

  return (
    <>
      <DateInputs value={value} onChange={setValue} label="Date" />
      <p>{`value: ${value}`}</p>
    </>
  );
};

// Simple.story = {
//   name: 'Simple',
//   decorators: [(storyFn) => <div>{storyFn()}</div>],
// };

export const WithInitialValue = () => {
  const [value, setValue] = useState(new Date());

  return (
    <>
      <DateInputs value={value} onChange={setValue} label="Date" />
      <p>{`value: ${value}`}</p>
    </>
  );
};

export const Disabled = () => {
  return <DateInputs label="Date" value={null} disabled />;
};

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

export const WithCustomComponents = () => {
  const [value, setValue] = useState();

  return (
    <>
      <DateInputs
        value={value}
        onChange={setValue}
        label="Date"
        inputComponent={CustomInputComponent}
        labelComponent={CustomLabelComponent}
      />
      <p>{`value: ${value}`}</p>
    </>
  );
};
