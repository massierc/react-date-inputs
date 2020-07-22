export interface DateInputsProps {
  value: Date;
  onChange?(value?: Date): undefined;
  onBlur?(): undefined;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export enum Unit {
  day = 'day',
  month = 'month',
  year = 'year',
}

export interface DateUnits {
  day?: number;
  month?: number;
  year?: number;
}
