import { CSSProperties, forwardRef, HTMLProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DateInputs } from 'src/components/date-inputs';

const meta: Meta<typeof DateInputs> = {
  component: DateInputs,
};

export default meta;
type Story = StoryObj<typeof DateInputs>;

export const Simple: Story = {
  args: {
    label: 'Date',
    disabled: false,
    show: ['day', 'month', 'year'],
    autoTab: false,
    dayPlaceholder: 'DD',
    monthPlaceholder: 'MM',
    yearPlaceholder: 'YYYY',
  },
  argTypes: {
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
  },
};

export const PrePopulated: Story = {
  args: {
    ...Simple.args,
    value: new Date(2022, 6, 20),
  },
  argTypes: Simple.argTypes,
};

export const CustomInputOrder: Story = {
  args: {
    ...Simple.args,
    show: ['year', 'month', 'day'],
  },
  argTypes: Simple.argTypes,
};

interface InputProps extends HTMLProps<HTMLInputElement> {
  style?: CSSProperties;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
  props,
  ref
) {
  return <input style={props.style} {...props} ref={ref} />;
});

const LabelComponent = (props: HTMLProps<HTMLLabelElement>) => {
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

export const WithCustomComponents = {
  args: {
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
  },
  argTypes: {
    ...Simple.argTypes,
    inputComponent: {
      table: { disable: true },
    },
    labelComponent: {
      table: { disable: true },
    },
  },
};
