import {
  fireEvent,
  render,
  //  fireEvent, waitForElement
} from '@testing-library/react';

import { BASE_CLASS, DateInputs } from './index';
// import {DateInputsProps} from "../types";

describe('<DateInputs />', () => {
  test('should display three blank inputs', async () => {
    const { findByTestId } = render(<DateInputs value={undefined} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;
    const monthInput = (await findByTestId(`${BASE_CLASS}__month`)) as HTMLInputElement;
    const yearInput = (await findByTestId(`${BASE_CLASS}__year`)) as HTMLInputElement;

    expect(dayInput.value).toBe('');
    expect(monthInput.value).toBe('');
    expect(yearInput.value).toBe('');
  });

  test('should populate inputs with correct date', async () => {
    const date = new Date(2020, 3, 20);
    const { findByTestId } = render(<DateInputs value={date} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;
    const monthInput = (await findByTestId(`${BASE_CLASS}__month`)) as HTMLInputElement;
    const yearInput = (await findByTestId(`${BASE_CLASS}__year`)) as HTMLInputElement;

    expect(dayInput.value).toBe('20');
    expect(monthInput.value).toBe('4');
    expect(yearInput.value).toBe('2020');
  });

  test('should not allow entering invalid characters', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;

    expect(dayInput.value).toBe('');
    fireEvent.change(dayInput, { target: { value: 'no bueno!' } });
    expect(dayInput.value).toBe('');
  });

  test('should allow entering the day', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;

    fireEvent.change(dayInput, { target: { value: '20' } });
    expect(dayInput.value).toBe('20');
  });

  test('should allow entering the month', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const monthInput = (await findByTestId(`${BASE_CLASS}__month`)) as HTMLInputElement;

    fireEvent.change(monthInput, { target: { value: '4' } });
    expect(monthInput.value).toBe('4');
  });

  test('should allow entering the year', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const yearInput = (await findByTestId(`${BASE_CLASS}__year`)) as HTMLInputElement;

    fireEvent.change(yearInput, { target: { value: '2020' } });
    expect(yearInput.value).toBe('2020');
  });

  test('should return undefined if one of the three inputs is empty', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;

    fireEvent.change(dayInput, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('should return the date if all inputs are populated', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;
    const monthInput = (await findByTestId(`${BASE_CLASS}__month`)) as HTMLInputElement;
    const yearInput = (await findByTestId(`${BASE_CLASS}__year`)) as HTMLInputElement;

    fireEvent.change(dayInput, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
    fireEvent.change(monthInput, { target: { value: '4' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
    fireEvent.change(yearInput, { target: { value: '2020' } });
    expect(onChange).toHaveBeenCalledWith(new Date(2020, 3, 20));
  });

  test('should cap the days to 31 if no month and year are provided', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;

    fireEvent.change(dayInput, { target: { value: '50' } });

    expect(dayInput.value).toBe('31');
  });

  test('should cap the days to the correct max amount if month and year are provided', async () => {
    const date = new Date(2018, 1, 20);
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} value={date} />);

    const dayInput = (await findByTestId(`${BASE_CLASS}__day`)) as HTMLInputElement;

    fireEvent.change(dayInput, { target: { value: '50' } });

    expect(dayInput.value).toBe('28');
  });

  test('should cap the months to 12', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const monthInput = (await findByTestId(`${BASE_CLASS}__month`)) as HTMLInputElement;

    fireEvent.change(monthInput, { target: { value: '50' } });

    expect(monthInput.value).toBe('12');
  });

  test('should allow custom input ordering', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(
      <DateInputs onChange={onChange} show={['year', 'month', 'day']} />
    );

    const inputsWrapper = await findByTestId(`${BASE_CLASS}__inputs-wrapper`);

    expect((inputsWrapper.childNodes[0] as HTMLElement).className).toContain(`${BASE_CLASS}__year`);
    expect((inputsWrapper.childNodes[1] as HTMLElement).className).toContain(
      `${BASE_CLASS}__month`
    );
    expect((inputsWrapper.childNodes[2] as HTMLElement).className).toContain(`${BASE_CLASS}__day`);
  });
});
