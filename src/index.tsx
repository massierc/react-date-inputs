import * as React from 'react';
import { format } from 'date-fns';
import { DateInputsProps, Unit } from './types';
import { getDate } from './utils/date';

function defaultFormatter(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}

const DateInputs: React.FC<DateInputsProps> = ({
  value,
  onChange,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  formatter,
}: DateInputsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputId: Unit) => {
    const newUnitVal = parseInt(e.target.value, 10) || undefined;
    const newValue = { ...value, [inputId]: newUnitVal };
    const newDate = getDate(newValue);

    if (newDate) {
      newValue.date = newDate;
      newValue.formatted = formatter
        ? formatter({ ...newValue, date: newDate })
        : defaultFormatter(newDate);
    }

    onChange(newValue);
  };

  return (
    <div>
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={dayPlaceholder || 'DD'}
        onChange={(e) => handleChange(e, Unit.day)}
        value={value.day}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={monthPlaceholder || 'MM'}
        onChange={(e) => handleChange(e, Unit.month)}
        value={value.month}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={yearPlaceholder || 'YYYY'}
        onChange={(e) => handleChange(e, Unit.year)}
        value={value.year}
      />
    </div>
  );
};

export default DateInputs;
