import { default as React, useRef, useEffect } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';
import { DateInputsProps, Unit, DateUnits } from './types';
import { daysInMonth, isValid, getCappedUnits } from './utils/date';

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
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const [parsedValues, setParsedValues] = React.useState<DateUnits>({
    day: getDate(value) || undefined,
    month: getMonth(value) || undefined,
    year: getYear(value) || undefined,
  });

  useEffect(() => {
    const { day, month, year } = parsedValues;
    if (day === undefined || month === undefined || year === undefined) return onChange(undefined);
    if (isValid(day, month, year)) return onChange(new Date(year, month - 1, day));
    return onChange(undefined);
  }, [parsedValues]);

  const handleFocus = ({ day, month, year }: DateUnits, inputId: Unit) => {
    const maxDays = month ? daysInMonth(month, year) : 31;

    if (inputId === Unit.day && parseInt(day + '1', 10) > maxDays) monthInputRef.current?.select();
    if (inputId === Unit.month && parseInt(month + '1', 10) > 12) yearInputRef.current?.select();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputId: Unit) => {
    const val = parseInt(e.target.value, 10);
    const newUnitValue: number | undefined = val >= 0 ? val : undefined;
    const newParsedValues: DateUnits = { ...parsedValues, [inputId]: newUnitValue };
    const cappedValues: DateUnits = getCappedUnits(newParsedValues);

    handleFocus(cappedValues, inputId);
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
        // onFocus={() => console.log('focus day')}
        // onBlur={() => console.log('blur day')}
        value={parsedValues.day || ''}
        className={`${BASE_CLASS}__day`}
        ref={dayInputRef}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={monthPlaceholder || 'MM'}
        onChange={(e) => handleChange(e, Unit.month)}
        // onFocus={() => console.log('focus month')}
        // onBlur={() => console.log('blur month')}
        value={parsedValues.month || ''}
        className={`${BASE_CLASS}__month`}
        ref={monthInputRef}
      />
      <input
        type="text"
        pattern="[0-9]*"
        placeholder={yearPlaceholder || 'YYYY'}
        onChange={(e) => handleChange(e, Unit.year)}
        // onFocus={() => console.log('focus year')}
        // onBlur={() => console.log('blur year')}
        value={parsedValues.year || ''}
        className={`${BASE_CLASS}__year`}
        ref={yearInputRef}
      />
    </div>
  );
};

export default DateInputs;
