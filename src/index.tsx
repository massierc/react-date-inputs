import { default as React, useRef, useEffect, useState } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';
import { DateInputsProps, Unit, DateUnits } from './types';
import { daysInMonth, isValid, getCappedUnits } from './utils/date';

export const BASE_CLASS = 'react-date-inputs';

const DefaultInputComponent = React.forwardRef((props: any, ref: React.Ref<HTMLInputElement>) => (
  <input {...props} ref={ref} />
));

DefaultInputComponent.displayName = 'DefaultInputComponent';

const DefaultLabelComponent = (props: any) => <label {...props} />;

export const DateInputs: React.FC<DateInputsProps> = ({
  value,
  onChange,
  onBlur,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  className,
  label,
  disabled,
  inputComponent: InputComponent = DefaultInputComponent,
  labelComponent: LabelComponent = DefaultLabelComponent,
}: DateInputsProps) => {
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const [parsedValues, setParsedValues] = useState<DateUnits>({
    day: getDate(value as Date) || undefined,
    month: getMonth(value as Date) + 1 || undefined,
    year: getYear(value as Date) || undefined,
  });

  useEffect(() => {
    if (!onChange) return;
    const { day, month, year } = parsedValues;
    if (
      day === getDate(value as Date) &&
      month === getMonth(value as Date) + 1 &&
      year === getYear(value as Date)
    ) {
      return;
    }
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

  const handleGroupBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        onBlur && onBlur();
      }
    }, 0);
  };

  return (
    <div className={`${BASE_CLASS}${className ? ` ${className}` : ''}`} data-testid={BASE_CLASS}>
      {label && (
        <LabelComponent className={`${BASE_CLASS}__label`} data-testid={`${BASE_CLASS}__label`}>
          {label}
        </LabelComponent>
      )}
      <div
        onBlur={handleGroupBlur}
        className={`${BASE_CLASS}__inputs-wrapper`}
        data-testid={`${BASE_CLASS}__inputs-wrapper`}
      >
        <InputComponent
          type="text"
          pattern="[0-9]*"
          placeholder={dayPlaceholder || 'DD'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, Unit.day)}
          value={parsedValues.day || ''}
          className={`${BASE_CLASS}__day`}
          data-testid={`${BASE_CLASS}__day`}
          ref={dayInputRef}
          disabled={disabled}
        />
        <InputComponent
          type="text"
          pattern="[0-9]*"
          placeholder={monthPlaceholder || 'MM'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, Unit.month)}
          value={parsedValues.month || ''}
          className={`${BASE_CLASS}__month`}
          data-testid={`${BASE_CLASS}__month`}
          ref={monthInputRef}
          disabled={disabled}
        />
        <InputComponent
          type="text"
          pattern="[0-9]*"
          placeholder={yearPlaceholder || 'YYYY'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, Unit.year)}
          value={parsedValues.year || ''}
          className={`${BASE_CLASS}__year`}
          data-testid={`${BASE_CLASS}__year`}
          ref={yearInputRef}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DateInputs;
