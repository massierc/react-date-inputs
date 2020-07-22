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

Simple.story = {
  name: 'Simple',
};
