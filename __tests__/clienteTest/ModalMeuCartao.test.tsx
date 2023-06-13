import MeuCartao from '@/components/cliente/ModalMeuCartao';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';


describe('MeuCartao', () => {
    test('should render the component correctly', () => {
        render(<MeuCartao />);

        expect(screen.getByText('Meu Cartão')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nome do Titular')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('CPF do Titular')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Número do Cartão')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Validade')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument();
        expect(screen.getByText('Remover')).toBeInTheDocument();
        expect(screen.getByText('Salvar')).toBeInTheDocument();

    });
});

it('should update the cartao state when inputs change', () => {
    render(<MeuCartao />);

    const titularInput = screen.getByPlaceholderText('Nome do Titular') as HTMLInputElement;
    fireEvent.change(titularInput, { target: { value: 'John Doe' } });
    expect(titularInput.value).toBe('John Doe');

    const cpfInput = screen.getByPlaceholderText('CPF do Titular') as HTMLInputElement;
    fireEvent.change(cpfInput, { target: { value: '123456789' } });
    expect(cpfInput.value).toBe('123456789');

    const numeroInput = screen.getByPlaceholderText('Número do Cartão') as HTMLInputElement;
    fireEvent.change(numeroInput, { target: { value: '1234 5678 9012 3456' } });
    expect(numeroInput.value).toBe('1234 5678 9012 3456');

    const validadeInput = screen.getByPlaceholderText('Validade') as HTMLInputElement;
    fireEvent.change(validadeInput, { target: { value: '12/24' } });
    expect(validadeInput.value).toBe('12/24');

    const cvvInput = screen.getByPlaceholderText('CVV') as HTMLInputElement;
    fireEvent.change(cvvInput, { target: { value: '123' } });
    expect(cvvInput.value).toBe('123');
});