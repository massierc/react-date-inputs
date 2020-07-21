export interface DateUnits {
  day?: number;
  month?: number;
  year?: number;
}

export interface DateObj extends DateUnits {
  formatted?: string;
  date?: Date;
}

export type FormatterFunction = (inputObj: DateObj) => string;

export interface DateInputsProps {
  value: DateObj;
  onChange(value: DateObj): DateObj;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  formatter?: FormatterFunction;
}

export enum Unit {
  day = 'day',
  month = 'month',
  year = 'year',
}
