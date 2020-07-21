import * as React from 'react';

export interface DateInputsProps {
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
}

const DateInputs: React.FC<DateInputsProps> = ({
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
}: DateInputsProps) => {
  return (
    <div>
      <input type="number" placeholder={dayPlaceholder || 'DD'} />
      <input type="number" placeholder={monthPlaceholder || 'MM'} />
      <input type="number" placeholder={yearPlaceholder || 'YYYY'} />
    </div>
  );
};

export default DateInputs;
