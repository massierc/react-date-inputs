import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DateInputs from '../index';
import { Unit } from '../types';
import './styles.css';

export default {
  title: 'React Date Inputs',
  component: DateInputs,
} as ComponentMeta<typeof DateInputs>;

const Template: ComponentStory<typeof DateInputs> = (args) => {
  const [value, setValue] = useState<Date | undefined>(args.value);

  return <DateInputs {...args} value={value} onChange={setValue} />;
};

export const Simple = Template.bind({});
Simple.argTypes = {
  show: {
    options: ['day', 'month', 'year'],
    control: { type: 'check' },
  },
  dayPlaceholder: {
    control: { type: 'text' },
  },
  monthPlaceholder: {
    control: { type: 'text' },
  },
  yearPlaceholder: {
    control: { type: 'text' },
  },
};
Simple.args = {
  label: 'Date',
  disabled: false,
  show: ['day', 'month', 'year'],
  autoTab: false,
  dayPlaceholder: 'DD',
  monthPlaceholder: 'MM',
  yearPlaceholder: 'YYYY',
};

export const PrePopulated = Template.bind({});
PrePopulated.argTypes = { ...Simple.argTypes };
PrePopulated.args = {
  ...Simple.args,
  value: new Date(2022, 6, 20),
};

export const CustomInputOrder = Template.bind({});
CustomInputOrder.argTypes = {
  ...Simple.argTypes,
  show: ['year', 'month', 'day'],
};
CustomInputOrder.args = {
  ...Simple.args,
  show: [Unit.year, Unit.month, Unit.day],
};

export const WithCustomComponents = Template.bind({});

const InputComponent = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return <input style={props.style} {...props} ref={ref} />;
  }
);

InputComponent.displayName = 'InputComponent';
const LabelComponent: React.FC<React.HTMLProps<HTMLLabelElement>> = (props) => {
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

WithCustomComponents.argTypes = {
  ...Simple.argTypes,
  inputComponent: {
    table: { disable: true },
  },
  labelComponent: {
    table: { disable: true },
  },
};
WithCustomComponents.args = {
  ...Simple.args,
  inputComponent: InputComponent,
  labelComponent: LabelComponent,
  inputComponentProps: {
    style: {
      padding: '6px',
      marginRight: '4px',
      marginTop: '0.2rem',
    },
  },
};
