import CountInput from '@/components/cliente/CountInput';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

test('should render CountInput component', () => {
  const onChangeMock = jest.fn();
  render(<CountInput valorInicial={1} onChange={onChangeMock} />);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement; // Assert as HTMLInputElement
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe('1');

  const addButton = screen.getByRole('button', { name: 'Adicionar' });
  const reduceButton = screen.getByRole('button', { name: 'Reduzir' });

  fireEvent.click(addButton);
  expect(onChangeMock).toHaveBeenCalledWith(2);
  expect(inputElement.value).toBe('2');

  fireEvent.click(reduceButton);
  expect(onChangeMock).toHaveBeenCalledWith(1);
  expect(inputElement.value).toBe('1');
});

test('should not reduce quantity below 1', () => {
  const onChangeMock = jest.fn();
  render(<CountInput valorInicial={1} onChange={onChangeMock} />);

  const reduceButton = screen.getByRole('button', { name: 'Reduzir' });

  fireEvent.click(reduceButton);
  expect(onChangeMock).not.toHaveBeenCalled();
});

test('should update quantity on input change', () => {
  const onChangeMock = jest.fn();
  render(<CountInput valorInicial={1} onChange={onChangeMock} />);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  fireEvent.change(inputElement, { target: { value: '3' } });
  expect(onChangeMock).toHaveBeenCalledWith(3);
  expect(inputElement.value).toBe('3');
});

test('should not update quantity on invalid input change', () => {
  const onChangeMock = jest.fn();
  render(<CountInput valorInicial={1} onChange={onChangeMock} />);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  fireEvent.change(inputElement, { target: { value: 'abc' } });
  expect(onChangeMock).not.toHaveBeenCalled();
  expect(inputElement.value).toBe('1');
});