/// <reference types="react" />
import { Unit } from '../../utils/date';
export declare const BASE_CLASS = "react-date-inputs";
export interface DateInputsProps {
    value?: Date;
    onChange?(value?: Date): void;
    onBlur?(e: React.ChangeEvent): undefined;
    dayPlaceholder?: string;
    monthPlaceholder?: string;
    yearPlaceholder?: string;
    className?: string;
    label?: string;
    disabled?: boolean;
    inputComponent?: React.ElementType;
    labelComponent?: React.ElementType;
    inputComponentProps?: Record<string, unknown>;
    labelComponentProps?: Record<string, unknown>;
    show?: (keyof typeof Unit)[];
    autoTab?: boolean;
}
export declare const DateInputs: ({ value, onChange, onBlur, dayPlaceholder, monthPlaceholder, yearPlaceholder, className, label, disabled, inputComponent: InputComponent, labelComponent: LabelComponent, inputComponentProps, labelComponentProps, show, autoTab, }: DateInputsProps) => import("react/jsx-runtime").JSX.Element;
