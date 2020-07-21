import React, { useState } from 'react';
import DateInputs from './index.tsx';

export default {
  title: 'DateInputs',
  component: DateInputs,
};

export const Simple = () => {
  const [value, setValue] = useState();

  return <DateInputs value={value} onChange={setValue} />;
};

Simple.story = {
  name: 'Simple',
  decorators: [(storyFn) => <div style={{ background: 'red' }}>{storyFn()}</div>],
};
