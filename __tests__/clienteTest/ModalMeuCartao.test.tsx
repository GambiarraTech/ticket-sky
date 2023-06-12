import MeuCartao from '@/components/cliente/ModalMeuCartao';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

describe('MeuCartao', () => {
  test('atualiza o estado do cartão corretamente', () => {
    const TestComponent = () => {
      const [cartao, setCartao] = useState({
        titular: '',
        cpf: '',
        numero: '',
        validade: '',
        cvv: '',
      });

      return (
        <MeuCartao />
      );
    };

    render(<TestComponent />);

    fireEvent.change(screen.getByPlaceholderText('Nome do Titular'), { target: { value: 'João' } });
    fireEvent.change(screen.getByPlaceholderText('CPF do Titular'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Número do Cartão'), { target: { value: '1234 5678 9012 3456' } });
    fireEvent.change(screen.getByPlaceholderText('Validade'), { target: { value: '12/24' } });
    fireEvent.change(screen.getByPlaceholderText('CVV'), { target: { value: '123' } });

    expect((screen.getByPlaceholderText('Nome do Titular') as HTMLInputElement).value).toBe('João');
    expect((screen.getByPlaceholderText('CPF do Titular') as HTMLInputElement).value).toBe('1234567890');
    expect((screen.getByPlaceholderText('Número do Cartão') as HTMLInputElement).value).toBe('1234 5678 9012 3456');
    expect((screen.getByPlaceholderText('Validade') as HTMLInputElement).value).toBe('12/24');
    expect((screen.getByPlaceholderText('CVV') as HTMLInputElement).value).toBe('123');
  });
});
