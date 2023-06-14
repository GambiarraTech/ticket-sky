import CountInput from '@/components/cliente/CountInput';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

test('renders CountInput component', () => {
    const onChangeMock = jest.fn();
  
    render(<CountInput valorInicial={3} onChange={onChangeMock} max={10} />);
  
    // Assert that the initial value is rendered
    const inputElement = screen.getByDisplayValue('3');
    expect(inputElement).toBeInTheDocument();
  
    // Assert that the add button increases the value and triggers onChange
    const addButton = screen.getByLabelText('adicionar');
    fireEvent.click(addButton);
    expect(onChangeMock).toHaveBeenCalledWith(4);
  
    // Assert that the subtract button decreases the value and triggers onChange
    const subtractButton = screen.getByLabelText('reduzir');
    fireEvent.click(subtractButton);
    expect(onChangeMock).toHaveBeenCalledWith(3);
  });