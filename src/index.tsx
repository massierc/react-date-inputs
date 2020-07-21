import * as React from 'react';
import { getDate, getMonth, getYear } from 'date-fns';
import { DateInputsProps, Unit, DateUnits } from './types';
import { isValid, getCappedUnits } from './utils/date';

const BASE_CLASS = 'react-date-inputs';

const DateInputs: React.FC<DateInputsProps> = ({
  value,
  onChange,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  className,
  label,
}: DateInputsProps) => {
  const [parsedValues, setParsedValues] = React.useState<DateUnits>({
    day: getDate(value) || undefined,
    month: getMonth(value) || undefined,
    year: getYear(value) || undefined,
  });

  React.useEffect(() => {
    const { day, month, year } = parsedValues;
    if (day === undefined || month === undefined || year === undefined) return onChange(undefined);
    if (isValid(day, month, year)) return onChange(new Date(year, month - 1, day));
    return onChange(undefined);
  }, [parsedValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputId: Unit) => {
    const val = parseInt(e.target.value, 10);
    const newUnitValue: number | undefined = val >= 0 ? val : undefined;
    const newParsedValues = { ...parsedValues, [inputId]: newUnitValue };
    const cappedValues = getCappedUnits(newParsedValues);

    setParsedValues(cappedValues);
  };

  return (
    <div className={`${BASE_CLASS}${className ? ` ${className}` : ''}`}>
      {label && <label className={`${BASE_CLASS}__label`}>{label}</label>}
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={dayPlaceholder || 'DD'}
        onChange={(e) => handleChange(e, Unit.day)}
        value={parsedValues.day}
        className={`${BASE_CLASS}__day`}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={monthPlaceholder || 'MM'}
        onChange={(e) => handleChange(e, Unit.month)}
        value={parsedValues.month}
        className={`${BASE_CLASS}__month`}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={yearPlaceholder || 'YYYY'}
        onChange={(e) => handleChange(e, Unit.year)}
        value={parsedValues.year}
        className={`${BASE_CLASS}__year`}
      />
    </div>
  );
};

export default DateInputs;
