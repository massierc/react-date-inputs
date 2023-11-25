import { forwardRef, HTMLProps, useEffect, useRef, useState } from 'react';
import { getDate, getMonth, getYear } from 'date-fns';

import { type DateUnits, daysInMonth, getCappedUnits, isValid, Unit } from 'src/utils/date';

export const BASE_CLASS = 'react-date-inputs';

const DefaultInputComponent = forwardRef<HTMLInputElement>((props, ref) => (
  <input {...props} ref={ref} />
));
DefaultInputComponent.displayName = 'DefaultInputComponent';

const DefaultLabelComponent = (props: HTMLProps<HTMLLabelElement>) => <label {...props} />;

export interface DateInputsProps {
  value?: Date;
  onChange?(value?: Date): void;
  onBlur?(e: React.FocusEvent): void;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  inputComponent?: React.ElementType;
  labelComponent?: React.ElementType;
  inputComponentProps?: Record<string, unknown>;
  labelComponentProps?: Record<string, unknown>;
  show?: (keyof typeof Unit)[];
  autoTab?: boolean;
}

export const DateInputs = ({
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
  show = ['day', 'month', 'year'],
  autoTab = false,
}: DateInputsProps) => {
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const firstRenderRef = useRef(true);

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

  const [parsedValues, setParsedValues] = useState<DateUnits>({
    [Unit.day]: getDate(value!) || undefined,
    [Unit.month]: getMonth(value!) + 1 || undefined,
    [Unit.year]: getYear(value!) || undefined,
  });

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (!onChange) return;

    const {
      day = show.includes(Unit.day) ? undefined : 1,
      month = show.includes(Unit.month) ? undefined : 1,
      year = show.includes(Unit.year) ? undefined : 2020,
    } = parsedValues;

    const isInitial =
      day === getDate(value!) && month === getMonth(value!) + 1 && year === getYear(value!);

    if (!isInitial) {
      if (day === undefined || month === undefined || year === undefined) {
        onChange(undefined);
      } else if (isValid(day, month, year) && year.toString().length === 4) {
        onChange(new Date(year, month - 1, day));
      } else {
        onChange(undefined);
      }
    }
  }, [parsedValues, onChange, show, value]);

  const handleAutoFocus = ({ day, month, year }: DateUnits, unit: keyof typeof Unit) => {
    const maxDays = month ? daysInMonth(month, year) : 31;

    const currentIndex = show.indexOf(unit);
    const nextUnit = show[currentIndex + 1];

    // if (!nextUnit) return;

    const goToNext =
      (unit === Unit.day && parseInt(day + '1', 10) > maxDays) ||
      (unit === Unit.month && parseInt(month + '1', 10) > 12) ||
      (unit === Unit.year && year?.toString().length === 4);

    if (goToNext) refs[nextUnit].current?.select();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, unit: keyof typeof Unit) => {
    const val = parseInt(e.target.value, 10);
    const newUnitValue: number | undefined = val >= 0 ? val : undefined;
    const newParsedValues: DateUnits = { ...parsedValues, [unit]: newUnitValue };
    const cappedValues: DateUnits = getCappedUnits(newParsedValues);

    if (autoTab) handleAutoFocus(newParsedValues, unit);
    setParsedValues(cappedValues);
  };

  const handleGroupBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) onBlur?.(e);
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
        {show.map((unit) => {
          return (
            <InputComponent
              type="text"
              pattern="[0-9]*"
              key={unit}
              placeholder={placeholders[unit]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e, unit);
              }}
              value={parsedValues[unit] ?? ''}
              className={`${BASE_CLASS}__${unit}`}
              data-testid={`${BASE_CLASS}__${unit}`}
              ref={refs[unit]}
              disabled={disabled}
              maxLength={unit == Unit.year ? '4' : '2'}
              {...inputComponentProps}
            />
          );
        })}
      </div>
    </div>
  );
};
