export interface DateInputsProps {
  value?: Date;
  onChange?(value?: Date): undefined;
  onBlur?(e: React.ChangeEvent): undefined;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  inputComponent?: React.ReactType;
  labelComponent?: React.ReactType;
  inputComponentProps?: Record<string, unknown>;
  labelComponentProps?: Record<string, unknown>;
  show?: string[];
  autoTab?: boolean;
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
