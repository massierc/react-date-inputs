import * as React from 'react';
import {
  render,
  fireEvent,
  //  fireEvent, waitForElement
} from '@testing-library/react';
import DateInputs, { BASE_CLASS } from '../index';
// import {DateInputsProps} from "../types";

describe('<DateInputs />', () => {
  test('should display three blank inputs', async () => {
    const { findByTestId } = render(<DateInputs value={undefined} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);
    const monthInput = await findByTestId(`${BASE_CLASS}__month`);
    const yearInput = await findByTestId(`${BASE_CLASS}__year`);

    expect(dayInput).toHaveValue('');
    expect(monthInput).toHaveValue('');
    expect(yearInput).toHaveValue('');
  });

  test('should populate inputs with correct date', async () => {
    const date = new Date(2020, 3, 20);
    const { findByTestId } = render(<DateInputs value={date} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);
    const monthInput = await findByTestId(`${BASE_CLASS}__month`);
    const yearInput = await findByTestId(`${BASE_CLASS}__year`);

    expect(dayInput).toHaveValue('20');
    expect(monthInput).toHaveValue('4');
    expect(yearInput).toHaveValue('2020');
  });

  test('should not allow entering invalid characters', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);

    expect(dayInput).toHaveValue('');
    fireEvent.change(dayInput, { target: { value: 'no bueno!' } });
    expect(dayInput).toHaveValue('');
  });

  test('should allow entering the day', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);

    fireEvent.change(dayInput, { target: { value: '20' } });
    expect(dayInput).toHaveValue('20');
  });

  test('should allow entering the month', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const monthInput = await findByTestId(`${BASE_CLASS}__month`);

    fireEvent.change(monthInput, { target: { value: '4' } });
    expect(monthInput).toHaveValue('4');
  });

  test('should allow entering the year', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const yearInput = await findByTestId(`${BASE_CLASS}__year`);

    fireEvent.change(yearInput, { target: { value: '2020' } });
    expect(yearInput).toHaveValue('2020');
  });

  test('should return undefined if one of the three inputs is empty', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);

    fireEvent.change(dayInput, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  test('should return the date if all inputs are populated', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);
    const monthInput = await findByTestId(`${BASE_CLASS}__month`);
    const yearInput = await findByTestId(`${BASE_CLASS}__year`);

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

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);

    fireEvent.change(dayInput, { target: { value: '50' } });

    expect(dayInput).toHaveValue('31');
  });

  test('should cap the days to the correct max amount if month and year are provided', async () => {
    const date = new Date(2018, 1, 20);
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} value={date} />);

    const dayInput = await findByTestId(`${BASE_CLASS}__day`);

    fireEvent.change(dayInput, { target: { value: '50' } });

    expect(dayInput).toHaveValue('28');
  });

  test('should cap the months to 12', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<DateInputs onChange={onChange} />);

    const monthInput = await findByTestId(`${BASE_CLASS}__month`);

    fireEvent.change(monthInput, { target: { value: '50' } });

    expect(monthInput).toHaveValue('12');
  });
});
