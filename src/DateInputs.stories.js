import React from 'react';
import DateInputs from './index.tsx';

export default {
  title: 'DateInputs',
  component: DateInputs,
};

export const Simple = () => (
  <DateInputs dayPlaceholder="DD" monthPlaceholder="MM" yearPlaceholder="AAAA" />
);

Simple.story = {
  name: 'Simple',
  decorators: [(storyFn) => <div style={{ background: 'red' }}>{storyFn()}</div>],
};
