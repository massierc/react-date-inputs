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
      } else if (isValid(day, month, year)) {
        onChange(new Date(year, month - 1, day));
      } else {
        onChange(undefined);
      }
    }
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

    if (autoTab) handleFocus(newParsedValues, inputId);
    setParsedValues(newParsedValues);
  };

  const handleGroupBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        const cappedValues: DateUnits = getCappedUnits(parsedValues);

        setParsedValues(cappedValues);
        onBlur && onBlur(e);
      }
    }, 0);
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
        {show.includes(Unit.day) && (
          <InputComponent
            type="text"
            pattern="[0-9]*"
            placeholder={dayPlaceholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, Unit.day)}
            value={parsedValues.day || ''}
            className={`${BASE_CLASS}__day`}
            data-testid={`${BASE_CLASS}__day`}
            ref={dayInputRef}
            disabled={disabled}
            maxLength="2"
            {...inputComponentProps}
          />
        )}
        {show.includes(Unit.month) && (
          <InputComponent
            type="text"
            pattern="[0-9]*"
            placeholder={monthPlaceholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, Unit.month)}
            value={parsedValues.month || ''}
            className={`${BASE_CLASS}__month`}
            data-testid={`${BASE_CLASS}__month`}
            ref={monthInputRef}
            disabled={disabled}
            maxLength="2"
            {...inputComponentProps}
          />
        )}
        {show.includes(Unit.year) && (
          <InputComponent
            type="text"
            pattern="[0-9]*"
            placeholder={yearPlaceholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, Unit.year)}
            value={parsedValues.year || ''}
            className={`${BASE_CLASS}__year`}
            data-testid={`${BASE_CLASS}__year`}
            ref={yearInputRef}
            disabled={disabled}
            maxLength="4"
            {...inputComponentProps}
          />
        )}
      </div>
    </div>
  );
};

export default DateInputs;
