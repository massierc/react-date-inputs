import { CSSProperties, HTMLProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateInputs } from '../../components/date-inputs';
declare const meta: Meta<typeof DateInputs>;
export default meta;
type Story = StoryObj<typeof DateInputs>;
export declare const Simple: Story;
export declare const PrePopulated: Story;
export declare const CustomInputOrder: Story;
interface InputProps extends HTMLProps<HTMLInputElement> {
    style?: CSSProperties;
}
export declare const WithCustomComponents: {
    args: {
        inputComponent: import("react").ForwardRefExoticComponent<Omit<InputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
        labelComponent: (props: HTMLProps<HTMLLabelElement>) => import("react/jsx-runtime").JSX.Element;
        inputComponentProps: {
            style: {
                padding: string;
                marginRight: string;
                marginTop: string;
            };
        };
        value?: Date | undefined;
        onChange?: ((value?: Date | undefined) => void) | undefined;
        onBlur?: ((e: import("react").ChangeEvent<Element>) => undefined) | undefined;
        dayPlaceholder?: string | undefined;
        monthPlaceholder?: string | undefined;
        yearPlaceholder?: string | undefined;
        className?: string | undefined;
        label?: string | undefined;
        disabled?: boolean | undefined;
        labelComponentProps?: Record<string, unknown> | undefined;
        show?: ("day" | "month" | "year")[] | undefined;
        autoTab?: boolean | undefined;
    };
    argTypes: {
        inputComponent: {
            table: {
                disable: boolean;
            };
        };
        labelComponent: {
            table: {
                disable: boolean;
            };
        };
        value?: import("@storybook/types").InputType | undefined;
        onChange?: import("@storybook/types").InputType | undefined;
        onBlur?: import("@storybook/types").InputType | undefined;
        dayPlaceholder?: import("@storybook/types").InputType | undefined;
        monthPlaceholder?: import("@storybook/types").InputType | undefined;
        yearPlaceholder?: import("@storybook/types").InputType | undefined;
        className?: import("@storybook/types").InputType | undefined;
        label?: import("@storybook/types").InputType | undefined;
        disabled?: import("@storybook/types").InputType | undefined;
        inputComponentProps?: import("@storybook/types").InputType | undefined;
        labelComponentProps?: import("@storybook/types").InputType | undefined;
        show?: import("@storybook/types").InputType | undefined;
        autoTab?: import("@storybook/types").InputType | undefined;
    };
};
