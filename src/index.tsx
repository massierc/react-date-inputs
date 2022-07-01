import { default as React, useEffect, useRef, useState } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';
import { DateInputsProps, DateUnits, Unit } from './types';
import { daysInMonth, getCappedUnits, isValid } from './utils/date';

export const BASE_CLASS = 'react-date-inputs';

const DefaultInputComponent = React.forwardRef<HTMLInputElement>((props, ref) => (
  <input {...props} ref={ref} />
));
DefaultInputComponent.displayName = 'DefaultInputComponent';

const DefaultLabelComponent = (props: React.HTMLProps<HTMLLabelElement>) => <label {...props} />;

export const DateInputs: React.FC<DateInputsProps> = ({
  value,
  onChange,
  onBlur,
  dayPlaceholder = 'DD',
  monthPlaceholder = 'MM',
  yearPlaceholder = 'YYYY',
  className,
  label,
  disabled = false,
  inputComponent: InputComponent = DefaultInputComponent,
  labelComponent: LabelComponent = DefaultLabelComponent,
  inputComponentProps = {},
  labelComponentProps = {},
  show = [Unit.day, Unit.month, Unit.year],
  autoTab = false,
}) => {
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const [parsedValues, setParsedValues] = useState<DateUnits>({
    day: getDate(value as Date) || undefined,
    month: getMonth(value as Date) + 1 || undefined,
    year: getYear(value as Date) || undefined,
  });

  useEffect(() => {
    const {
      day = show.includes(Unit.day) ? undefined : 1,
      month = show.includes(Unit.month) ? undefined : 1,
      year = show.includes(Unit.year) ? undefined : 2020,
    } = parsedValues;
    const isInitial =
      day === getDate(value as Date) &&
      month === getMonth(value as Date) + 1 &&
      year === getYear(value as Date);

    if (onChange && !isInitial) {
      if (day === undefined || month === undefined || year === undefined) {
        onChange(undefined);
      } else if (isValid(day, month, year) && year.toString().length === 4) {
        onChange(new Date(year, month - 1, day));
      } else {
        onChange(undefined);
      }
    }
  }, [parsedValues]);

  const handleFocus = ({ day, month, year }: DateUnits, inputId: Unit) => {
    const maxDays = month ? daysInMonth(month, year) : 31;

    const goToNext =
      (inputId === Unit.day && parseInt(day + '1', 10) > maxDays) ||
      (inputId === Unit.month && parseInt(month + '1', 10) > 12);

    if (goToNext) {
      const currentIndex = show?.indexOf(inputId);
      const nextRef = show?.length > currentIndex + 1 ? refs[show[currentIndex + 1]] : undefined;
      if (nextRef) {
        nextRef.current.select();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputId: Unit) => {
    const val = parseInt(e.target.value, 10);
    const newUnitValue: number | undefined = val >= 0 ? val : undefined;
    const newParsedValues: DateUnits = { ...parsedValues, [inputId]: newUnitValue };
    const cappedValues: DateUnits = getCappedUnits(newParsedValues);

    if (autoTab) handleFocus(newParsedValues, inputId);
    setParsedValues(cappedValues);
  };

  const handleGroupBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) onBlur && onBlur(e);
    }, 0);
  };

  const refs = {
    [Unit.day]: dayInputRef,
    [Unit.month]: monthInputRef,
    [Unit.year]: yearInputRef,
  };

  const placeholders = {
    [Unit.day]: dayPlaceholder,
    [Unit.month]: monthPlaceholder,
    [Unit.year]: yearPlaceholder,
  };

  const getValue = (unit: Unit) => {
    switch (unit) {
      case Unit.day:
        return (parsedValues.day ?? '') as string;
      case Unit.month:
        return (parsedValues.month ?? '') as string;
      case Unit.year:
        return (parsedValues.year ?? '') as string;
    }
    return '';
  };

  return (
    <div className={`${BASE_CLASS}${className ? ` ${className}` : ''}`} data-testid={BASE_CLASS}>
      {label && (
        <LabelComponent
          className={`${BASE_CLASS}__label`}
          data-testid={`${BASE_CLASS}__label`}
          {...labelComponentProps}
        >
          {label}
        </LabelComponent>
      )}
      <div
        onBlur={handleGroupBlur}
        className={`${BASE_CLASS}__inputs-wrapper`}
        data-testid={`${BASE_CLASS}__inputs-wrapper`}
      >
        {(show as Unit[]).map((unit) => (
          <InputComponent
            type="text"
            pattern="[0-9]*"
            key={unit}
            placeholder={placeholders[unit]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, unit)}
            value={getValue(unit)}
            className={`${BASE_CLASS}__${unit}`}
            data-testid={`${BASE_CLASS}__${unit}`}
            ref={refs[unit]}
            disabled={disabled}
            maxLength={unit == Unit.year ? '4' : '2'}
            {...inputComponentProps}
          />
        ))}
      </div>
    </div>
  );
};

export default DateInputs;
