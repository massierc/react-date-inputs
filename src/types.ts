export interface DateInputsProps {
  value: Date;
  onChange(value?: Date): undefined;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
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
