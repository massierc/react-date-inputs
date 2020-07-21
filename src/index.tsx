import * as React from 'react';
import { isValid, getDate, getMonth, getYear } from 'date-fns';
import { DateInputsProps, Unit } from './types';

const DateInputs: React.FC<DateInputsProps> = ({
  value,
  onChange,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
}: DateInputsProps) => {
  const [parsedValue, setParsedValue] = React.useState({
    day: getDate(value) || undefined,
    month: getMonth(value) || undefined,
    year: getYear(value) || undefined,
  });

  React.useEffect(() => {
    if (
      parsedValue.day === undefined ||
      parsedValue.month === undefined ||
      parsedValue.year === undefined
    ) {
      onChange(undefined);
    } else {
      const newDate = new Date(parsedValue.year, parsedValue.month - 1, parsedValue.day);
      onChange(isValid(newDate) ? newDate : undefined);
    }
  }, [parsedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputId: Unit) => {
    setParsedValue({ ...parsedValue, [inputId]: parseInt(e.target.value, 10) || undefined });
  };

  return (
    <div>
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={dayPlaceholder || 'DD'}
        onChange={(e) => handleChange(e, Unit.day)}
        value={parsedValue.day}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={monthPlaceholder || 'MM'}
        onChange={(e) => handleChange(e, Unit.month)}
        value={parsedValue.month}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={yearPlaceholder || 'YYYY'}
        onChange={(e) => handleChange(e, Unit.year)}
        value={parsedValue.year}
      />
    </div>
  );
};

export default DateInputs;
